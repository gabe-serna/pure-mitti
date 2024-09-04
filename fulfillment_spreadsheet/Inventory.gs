const unitRange = inventory.getRange("R3");
const soapRules = inventory.getRange("X2").getDataValidations();
const bagRules = inventory.getRange("X3").getDataValidations();
const barRules = inventory.getRange("X4").getDataValidations();
const monthRange = inventory.getRange("U3");
const monthRules = inventory.getRange("W5").getDataValidations();
const selected = inventory.getRange("W2").getValue();
const previous = inventory.getRange("W4");

const soapUnit = inventory.getRange("Z2").getDataValidations();
const soapCase = inventory.getRange("Z3").getDataValidations();
const bagUnit = inventory.getRange("Z6").getDataValidations();
const bagCase = inventory.getRange("Z7").getDataValidations();
const dishbarUnit = inventory.getRange("Z9").getDataValidations();
const dishbarCase = inventory.getRange("Z10").getDataValidations();
const jarUnit = inventory.getRange("Z12").getDataValidations();
const jarCase = inventory.getRange("Z13").getDataValidations();

function placeItemEntries(req){
  //Clear previous entries
  const entryRange = inventory.getRange("Q3:U14");
  entryRange.clear({contentsOnly: true}).clear({validationsOnly: true});
  if (!req) return; 

  //make sure that the item selector menu has a max add limit of 11 items
  const items = req.split(/\r\n|\n|\r/);
  for (let i = 0; i < items.length; i++){
    const quantityRange = inventory.getRange(i + 3, 17);
    const unitRange = inventory.getRange(i + 3, 18);
    const itemRange = inventory.getRange(i + 3, 19, 1, 2);
    const monthRange = inventory.getRange(i + 3, 21);
    const item = items[i];

    let quantity = item.match(/^\S*/);
    quantity = quantity[0];
    quantityRange.setValue(quantity);

    const isCase = item.includes('case');
    let month = ' ';

    if (item.includes('Soap')){
      if (isCase) unitRange.setDataValidations(soapCase).setValue("case(s)");
      else unitRange.setDataValidations(soapUnit).setValue("soap(s)");
      
      inventory.getRange("W9:X9")
        .copyTo(itemRange,SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION,false);
      
      month = item.match(/\(([^)]+)\)/g);
      month = month[0].replace('(', '').replace(')', '');
      Logger.log('month: ', month);
      monthRange.setDataValidations(monthRules).setValue(`${month}:`);
    } 
    else if (item.includes('Bag')){
      if (isCase) unitRange.setDataValidations(bagCase).setValue("case(s)");
      else unitRange.setDataValidations(bagUnit).setValue("bag(s)");

      inventory.getRange("W10:X10")
        .copyTo(itemRange,SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION,false);
    }
    else if (item.includes('Dishbar')){
      if (isCase) unitRange.setDataValidations(dishbarCase).setValue("case(s)");
      else unitRange.setDataValidations(dishbarUnit).setValue("bar(s)");

      inventory.getRange("W11:X11")
        .copyTo(itemRange,SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION,false)
    }
    else {
      if (isCase) unitRange.setDataValidations(jarCase).setValue("case(s)");
      else unitRange.setDataValidations(jarUnit).setValue("jar(s)");

      inventory.getRange("W12:X12")
        .copyTo(itemRange,SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION,false)
    }

    if (!item.includes('Soap')) monthRange.clearDataValidations().setValue("");

    let itemName = item.replace(`${quantity} `, "");
    itemName = itemName.replace(` (${month})`, "");
    if (isCase) { 
      itemName = itemName.replace('case ', ''); 
      itemName = itemName.replace('cases ', ''); 
    }
    itemRange.setValue(itemName);
  }
}

function getEntries(){
  //use this function to populate the UI with the previous values on load
  const entries = [];
  for (let i = 3; !inventory.getRange(i,17).isBlank(); i++){
    const quantity = inventory.getRange(i,17).getValue();
    const unit = inventory.getRange(i,18).getValue();
    const item = inventory.getRange(i,19).getValue();
    let month = inventory.getRange(i,21).getValue();

    const isPlural = quantity > 1 || quantity < -1 ? true : false;

    let itemName = quantity;
    if (unit.includes('case')) {
      itemName += ` ${unit.replace('(s)', '')}`;
      if (isPlural) itemName += 's';
    }
    itemName += ` ${item}`
    if (month) {
      month = month.replace(':', '');
      itemName += ` (${month})`;
    }
    entries.push(itemName);
  }
  return entries;
}

//--------------------------------------------------

function onEdit(e){
  // Only run when new item is edited and is changed to a different item type
  if (e.range.getA1Notation() != "S3"){return}
  if (selected == previous.getValue()){return} 

  switch (selected){
    case "Soap":
      unitRange.setDataValidations(soapRules).setValue("select");
      monthRange.setDataValidations(monthRules).setValue("select");
      break;
    case "Bag":
      unitRange.setDataValidations(bagRules).setValue("select");
      monthRange.clearDataValidations().setValue("");
      break;
    case "bar":
      unitRange.setDataValidations(barRules).setValue("select");
      monthRange.clearDataValidations().setValue("");
      break;
    case "Item":
      unitRange.clearDataValidations().setValue("");
      monthRange.clearDataValidations().setValue("");
  }
  previous.setValue(selected);
}

function addItem(){
  // Error Handling
  if (inventory.getRange("R3").getValue().includes("select") || inventory.getRange("U3").getValue().includes("select")){
    Browser.msgBox("Please Fill in All Information");
    return;
  } else if (inventory.getRange("S3").getValue().includes("Item")){
    Browser.msgBox("Please Select an Item Before Continuing");
    return;
  }

  //Determine how many items there are
  i = countItems();
  if (i === 11) {
    Browser.msgBox("Maximum Amount of Items Reached. Please Export.");
    return;
  }

  //Move items down and repopulate top spot
  if (i > 0){inventory.getRange(3,17,i,5).copyTo(inventory.getRange(4,17))}
  inventory.getRange("Q3:U3").clearContent();
  inventory.getRange("Q3:U3").clearDataValidations();
  inventory.getRange("S3:T3").merge();
  inventory.getRange("W8:X8").copyTo(inventory.getRange("S3"));
  inventory.getRange("Q4:U4").setBorder(true,null,null,null,null,null,"white",null);
  previous.setValue("New");

  //Update dropdown menu
  let lastEntry = inventory.getRange("S4:T4");
  if (lastEntry.getValue().includes("Soap")){
    inventory.getRange("W9:X9").copyTo(lastEntry,SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION,false)}
  else if (lastEntry.getValue().includes("Bag")){
    inventory.getRange("W10:X10").copyTo(lastEntry,SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION,false)}
  else if (lastEntry.getValue().includes("bar")){
    inventory.getRange("W11:X11").copyTo(lastEntry,SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION,false)}

}

function exportInventory(){
  //Storing the Range of Items that will be Exported
  i = countItems();
  if (i == 0){
    Browser.msgBox("Please Add Items Before Exporting");
    return;
  }

  //Update Totals
  updateTotals();

  //Adding New Log Entry
  let itemsToExport = inventory.getRange(3,17,i,5);
  inventoryLog.insertRowBefore(3);
  inventoryLog.getRange(3,1,1,6).merge();
  inventoryLog.getRange(3,1,1,6).setBorder(null,null,null,false,null,null);
  inventoryLog.insertRowBefore(3);
  inventoryLog.getRange("H2:M2").copyTo(inventoryLog.getRange(3,1));
  inventoryLog.getRange(3,1).setValue(new Date().toLocaleDateString().slice(0,-5));

  //Exporting Items to Log
  if (i > 1){inventoryLog.insertRowsAfter(3,i-1)};
  itemsToExport.copyTo(inventoryLog.getRange(3,2),SpreadsheetApp.CopyPasteType.PASTE_FORMAT,false);
  itemsToExport.copyTo(inventoryLog.getRange(3,2),SpreadsheetApp.CopyPasteType.PASTE_VALUES,false);

  //Border Formatting
  if (i > 1){inventoryLog.getRange(4,1,i-1,1).merge()}; //Merging cells below the date
  inventoryLog.getRange(3,1,i,1).setBorder(null,null,null,true,null,true,"white",null);
  inventoryLog.getRange(3,1,i,6).setBorder(true,null,null,true,null,null,"black",null);
  inventoryLog.getRange(3,7,inventoryLog.getMaxRows() - 2,1).merge();
  
  //Text Formatting
  formatText();


  //Clearing the old entry
  itemsToExport.clearContent();
  itemsToExport.clearDataValidations();
  previous.setValue("New");
}

function addNewMonth(input){
  //Formatting Month and Day
  let month = input.substring(5,7);
  month = getMonthName(month);

  let day = input.substring(8);
  day = day.replace('0','');
  
  let name = `${month} ${day}:`

  //Locate month row
  let row = 2;
  while (!inventory.getRange(row,1).isBlank()){row++};

  for (let i = 1; i <= 7; i += 2){
    inventory.getRange(row,i).setValue(name);
    inventory.getRange(row,i + 1).setValue('');
  }
}

//-----------------
// Updating Totals
//-----------------

function updateTotals(){
  //Adapted Version of getInventoryItems()
  let items = [];
  for (let i = 3; i <= inventory.getMaxRows(); i++){
    if (inventory.getRange(i, 17).isBlank()){break}

    let quantity = inventory.getRange(i, 17).getValue();
    let unit = inventory.getRange(i, 18).getValue();
    let name = inventory.getRange(i, 19).getValue();
    let month = inventory.getRange(i, 21).getValue();

    items.push([quantity, unit, name, month])
  }

  //Identify what type of item each are
  for (x in items){
    if (items[x][2].includes("Soap")) updateSoap(items, x);
    else if (items[x][2].includes("Bag")) updateBag(items, x);
    else if (items[x][2].includes("bar")) updateBar(items, x);
    else continue;
  }
}

function updateSoap(items, x){
  //Adjust amount if case pack
  if (items[x][1] == "case(s)"){items[x][0] *= 10};
  let col;
  let row;

  //Locate month col
  switch (items[x][2]){
    case "Neem Soap":
      col = 2;
      break;
    case "Tulsi Soap":
      col = 4;
      break;
    case "Turmeric Soap":
      col = 6;
      break;
    case "Vetiver Soap":
      col = 8;
  };

  //Locate month row
  for (row = 2; !inventory.getRange(row,col-1).isBlank(); row++){
    if (inventory.getRange(row,col-1).getValue() == items[x][3]) break;
  };

  //Update soap total
  let total = inventory.getRange(row,col).getValue();
  total += items[x][0];

  if (total > 0) inventory.getRange(row,col).setValue(total)
  else inventory.getRange(row,col).setValue("");
}

function updateBag(items, x){
  //Adjust amount if case pack
  if (items[x][1] == "case(s)"){items[x][0] *= 12};
  let cell;

  //Update bag total
  switch (items[x][2]){
    case "Natural 6 Pouch Bag":
      items[x][0] > 0 ? cell = "K2" : cell = "K3";
      break;
    case "Natural 4 Pouch Bag":
      items[x][0] > 0 ? cell = "K7" : cell = "K8";
      break;
    case "Green 6 Pouch Bag":
      items[x][0] > 0 ? cell = "M2" : cell = "M3";
      break;
    case "Green 4 Pouch Bag":
      items[x][0] > 0 ? cell = "M7" : cell = "M8";
      break;
    case "Indigo 6 Pouch Bag":
      items[x][0] > 0 ? cell = "O2" : cell = "O3";
      break;
    case "Indigo 4 Pouch Bag":
      items[x][0] > 0 ? cell = "O7" : cell = "O8";
  };

  let total = inventory.getRange(cell).getValue();
  total += items[x][0];
  inventory.getRange(cell).setValue(total);
}

function updateBar(items, x){
  //Adjust amount if case pack
  if (items[x][1] == "case(s)"){items[x][0] *= 10};
  let cell;
  
  //Update dishbar total
  switch (items[x][2]){
    case "Unscented Dishbar":
      cell = "K13";
      break;
    case "Basil Dishbar":
      cell = "M13";
      break;
    case "Lemon Dishbar":
      cell = "O13";
  };

  let total = inventory.getRange(cell).getValue();
  total += items[x][0];
  inventory.getRange(cell).setValue(total);
}

function moveBagsFromStorage(amount, pouches, color){
  let target = `${color} ${pouches} Pouch Bag`
  let x;
  let y;

  //Identify which cell to adjust
  switch (target){
    case "Natural 6 Pouch Bag":
      x = 2;
      y = 11;
      break;
    case "Natural 4 Pouch Bag":
      x = 7;
      y = 11;
      break;
    case "Green 6 Pouch Bag":
      x = 2;
      y = 13;
      break;
    case "Green 4 Pouch Bag":
      x = 7;
      y = 13;
      break;
    case "Indigo 6 Pouch Bag":
      x = 2;
      y = 15;
      break;
    case "Indigo 4 Pouch Bag":
      x = 7;
      y = 15;
  };

  //Updating Values
  amount = Number(amount);
  let storage = inventory.getRange(x,y).getValue();
  storage -= amount;
  inventory.getRange(x,y).setValue(storage);

  let floor = inventory.getRange(x+1,y).getValue();
  floor += amount;
  inventory.getRange(x+1,y).setValue(floor);
}

//---------------------
// Supporting Functions
//---------------------

function removeEmptyMonths(){
  let x = 0;
  let i;
  for (i = 2; !inventory.getRange(i,1).isBlank(); i++){
    if (!inventory.getRange(i,2).isBlank()){continue};
    if (!inventory.getRange(i,4).isBlank()){continue};
    if (!inventory.getRange(i,6).isBlank()){continue};
    if (!inventory.getRange(i,8).isBlank()){continue};
    x = i;
  };

  //Moving the remaining months up if need be
  if(x+1 < i && x != 0){inventory.getRange(x+1,1,i-(x+1),8).copyTo(inventory.getRange(x,1))};

  //Removing the last month
  if (x != 0){inventory.getRange(i-1,1,1,8).clearContent()};

  if (x == 0){Logger.log("No Empty Month Detected")}
  else {Logger.log("Removed an Empty Month")};
}

function countItems(){
  let i;
  for (i = 3; i <= inventory.getMaxRows(); i++){
    if (inventory.getRange(i, 17).isBlank()){break};
  };
  return i - 3;
}

function formatText(){
  let unit;
  let quantity;

  for (let j = 3; !inventoryLog.getRange(j,3).isBlank(); j++){
    unit = inventoryLog.getRange(j,3).getValue();
    quantity = inventoryLog.getRange(j,2).getValue();

    //Break immediately if (s) is not present (should be never)
    if (!unit.includes("(s)")){
      continue;
    };

    //Change formatting depending on count
    if (Math.abs(quantity) == 1){ unit = unit.slice(0,-3)} 
    else {
      unit = unit.replace('(','');
      unit = unit.replace(')','');
    };
    inventoryLog.getRange(j,3).setValue(unit);
  }
}

function getInventoryItems(){
  let items = [];
  for (let i = 3; i <= inventory.getMaxRows(); i++){
    if (inventory.getRange(i, 17).isBlank()){break};

    let quantity = inventory.getRange(i, 17).getValue();
    let unit = inventory.getRange(i, 18).getValue();
    let name = inventory.getRange(i, 19).getValue();

    let item = [quantity.toFixed(0), unit, name];
    item = item.join(" ");

    items.push([item]);
  }
  return items;
}

function removeInventoryItem(text){
  //Find which row needs to be removed
  let items = getInventoryItems();
  for(i = 0; i < items.length; i++){
    if (items[i] == text){break};
  };

  //Moving the remaining orders up if need be
  if (i+1 < items.length){
    inventory.getRange(i+4,17,items.length-i,5).copyTo(inventory.getRange(i+3,17));
  };
  
  //Clear last order
  inventory.getRange(items.length+2,17,1,5).clearContent();
  inventory.getRange(items.length+2,17,1,5).clearDataValidations();

  //Format if removing the topmost order
  if (i == 0){inventory.getRange("S2:T2").setBorder(null,null,true,null,null,null,"black",null)};
}

function getMonthName(month){
  switch (month){
    case "01":
      month = "Jan";
      break;
    case "02":
      month = "Feb";
      break;
    case "03":
      month = "Mar";
      break;
    case "04":
      month = "Apr";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "Jun";
      break;
    case "07":
      month = "Jul";
      break;
    case "08":
      month = "Aug";
      break;
    case "09":
      month = "Sep";
      break;
    case "10":
      month = "Oct";
      break;
    case "11":
      month = "Nov";
      break;
    case "12":
      month = "Dec"; 
  };
  return month;
}
