const ss = SpreadsheetApp.getActiveSpreadsheet();
const shipments = ss.getSheetByName("Shipments");
const shipmentLog = ss.getSheetByName("Shipment Log");
const samples = ss.getSheetByName("Samples");
const samplesLog = ss.getSheetByName("Samples Log");
const inventory = ss.getSheetByName("Inventory");
const inventoryLog = ss.getSheetByName("Inventory Log");

const shopifyNewOrders = ss.getSheetByName("Shopify New Orders");
const shopifyShipped = ss.getSheetByName("shopify_shipped");

const shippoNewOrders = ss.getSheetByName("Shippo New Orders");
const shippoShipped = ss.getSheetByName("Shippo Shipped Orders");
const shippoTransactions = ss.getSheetByName("shippo_transactions")

const podNewOrders = ss.getSheetByName("Pod New Orders");
const podConfirmedOrders = ss.getSheetByName("pod_confirmed_orders");

//Returns the Header Row for Outgoing Shipments
function getHeaderRow(){
  let lastRow = shipments.getMaxRows();
  for (let i = 2; i <=lastRow ; i++){
    let reference = shipments.getRange(i,1).getValue();
    if (reference == "Date Shipped"){return i;}
  }

  Logger.log("ERROR: Outgoing Shipments Tab unable to be located.")
  return null;
}

function onOpen(){
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Shipments')
    .addSubMenu(ui.createMenu('🟠 Etsy')
      .addItem('Refresh Etsy Backend (not working)', 'test'))
    .addSubMenu(ui.createMenu('⚫ Shippo')
      .addItem('Refresh Shippo Backend', 'masterShippoCall'))
    .addSubMenu(ui.createMenu('🟢 Shopify')
      .addItem('Refresh Shopify Backend', 'masterShopifyCall')
      .addItem('Update Shopify Incoming Orders', 'getShopifyNewOrders'))
    .addSubMenu(ui.createMenu('🟣 Pod Foods')
      .addItem('Refresh Pod Foods Backend', 'podLoginCall')
      .addItem('Update Pod Foods Incoming Orders', 'getPodNewOrders'))
    .addItem('⟳ Refresh Backend for All Apps','masterApiCall')
    .addSeparator()
    .addItem('🚚 Update All Outgoing Shipments', 'checkIfShipped')
    .addItem('⏰ Update ETA', 'checkIfTransit')
    .addItem('📦 Update All Delivered Shipments', 'checkIfDelivered')
    .addSeparator()
    .addItem('➕ Manually Add New Order', 'manuallyAddOrder')
    .addItem('↪️ Move Manual Order to Shipment', 'moveManualOrder')
    .addItem('➕ Manually Add Shipment to Log', 'manuallyAddShipment')
    .addSeparator()
    .addItem('🛍️ Move Bags from Storage to Floor', 'moveBags')
    .addItem('🫧 Add New Soap Month', 'openMonthPicker')
    .addToUi();

  ui.createMenu('Add New Orders')
    .addItem('➕ New Sample Request', 'openSampleDialog')
    .addToUi();
}


function manuallyAddOrder(){
  let htmlOutput = HtmlService
    .createHtmlOutputFromFile("New Order")
    .setWidth(500)
    .setHeight(375)
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Manually Add New Order")
}

function moveManualOrder(){
  let orders = getManualOrders();
  if (orders.length == 0){
    Browser.msgBox("No Manual Orders Found");
    return;
  };

  let htmlOutput = HtmlService
    .createHtmlOutputFromFile("Order to Shipment")
    .setWidth(500)
    .setHeight(375)
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Move Manual Order to Shipment")
}

function manuallyAddShipment(){
  let htmlOutput = HtmlService
    .createHtmlOutputFromFile("Shipment")
    .setWidth(500)
    .setHeight(375)
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Manually Add Shipment")
}

function moveBags(){
  let htmlOutput = HtmlService
    .createHtmlOutputFromFile("Move Bags")
    .setWidth(500)
    .setHeight(375)
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Move Bags")
}

function openMonthPicker(){
  let htmlOutput = HtmlService
    .createHtmlOutputFromFile("New Month")
    .setWidth(500)
    .setHeight(375)
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Add New Soap Month")
}

function openSampleDialog(){
  let htmlOutput = HtmlService
    .createHtmlOutputFromFile("New Sample")
    .setWidth(535)
    .setHeight(400)
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Add New Sample Request")
}

function openEntryDialog(){
  let htmlOutput = HtmlService
    .createHtmlOutputFromFile("Entries")
    .setWidth(615)
    .setHeight(415)
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Add Entries")
}

function placeManualOrder(array){
  let x = getHeaderRow();
  shipments.insertRowBefore(x+1);
  let isConvertedOrder = array[7] != null;
  let i;

  if (isConvertedOrder){
    let infoArray = array[7].split(",");
    array[1] = infoArray[0].substring(10); //name
    array[6] = infoArray[1].substring(8); //items
    array[5] = infoArray[2].substring(8); //notes

    //Locate Row of Order
    for (i = 2; !shipments.getRange(i,2).isBlank(); i++){
      let name = shipments.getRange(i,2).getValue();
      if (name == array[1]){break};
    };

    array[5] = manualNotesFormat(array[5], i);
  };

  shipments.getRange(x+1,1).setValue(array[0]); //date
  shipments.getRange(x+1,2).setValue(array[1]); //name
  shipments.getRange(x+1,3).setValue(array[2]); //tracking number
  shipments.getRange(x+1,4).setValue(array[3]); //carrier
  shipments.getRange(x+1,5).setValue(array[4]); //app
  if (array[4] == "Shippo"){shipments.getRange(x+1,6).setValue('=iferror(VLOOKUP(C' + (x+1) + ',shippo_transactions!B:C,2,FALSE),"not found")')}
  else{shipments.getRange(x+1,6).setValue('UNKNOWN')};

  shipments.getRange(x+1,8).setValue(array[5]); //notes
  shipments.getRange(x+1,9).setValue("manual"); //id
  shipments.getRange(x+1,10).setValue(array[6]); //items
  
  //Cleaning things up
  let lastRow = shipments.getMaxRows();
  shipments.getRange(x+1,7,lastRow-x,1).merge();
  if (isConvertedOrder){shipments.deleteRow(i)};
}

function manualNotesFormat(notes, i){
  if (shipments.getRange(i,3).isBlank()){return notes};

  newNotes = `${notes}\nOrder Value: $${shipments.getRange(i,3).getValue()}`
  return newNotes;
}

function placeManualNewOrder(array){
  shipments.insertRowBefore(2);

  shipments.getRange(2,1).setValue(new Date().toLocaleDateString().slice(0,-5));
  shipments.getRange(2,2).setValue(array[0]);
  shipments.getRange(2,3).setValue(array[1]);
  shipments.getRange(2,4).setValue(array[2]);
  shipments.getRange(2,5).setValue("Shippo");
  shipments.getRange(2,6).setValue("UNCONFIRMED");
  shipments.getRange(2,8).setValue(array[3]);
  shipments.getRange(2,9).setValue("manual");
  shipments.getRange(2,10).setValue(array[4]);
}

function getManualOrders(){
  let orders = [];
  for (let i = 2; !shipments.getRange(i,9).isBlank(); i++){
    if(shipments.getRange(i,9).getValue() != "manual"){continue};
    let name = shipments.getRange(i, 2).getValue();
    let items = shipments.getRange(i, 10).getValue();
    let notes = shipments.getRange(i, 8).getValue();
    let order = `Order for ${name}, Items: ${items}, Notes: ${notes}`

    orders.push([order]);
  }
  Logger.log(orders);
  return orders;
}

function placeSampleRequest(req){
  samples.insertRowBefore(2);

  samples.getRange(2,1).setValue(req.date);
  samples.getRange(2,2).setValue(req.name);
  samples.getRange(2,3).setValue(req.company);
  samples.getRange(2,4).setValue(req.source);
  samples.getRange(2,6).setValue(req.items);
  samples.getRange(2,7).setValue(req.address);
}

function getInventoryItemQuantities(){
  const inventoryItemQuantities = {};

  //Soaps
  let y = 1; // column number for each soap
  while (y <= 7){
    const soapMonths = ['','Neem Soap','','Tulsi Soap','','Turmeric Soap','','Vetiver Soap'];
    const inStock = [];
    for (let x = 2; !inventory.getRange(x,y).isBlank(); x++) {
      if (inventory.getRange(x,y + 1).isBlank()) continue;
      const month = inventory.getRange(x,y).getValue();
      const quantity = inventory.getRange(x,y + 1).getValue();
      inStock.push(`${month} ${quantity}`);
    }
    if (!inStock[0]) inStock.push('Out of Stock');
    inventoryItemQuantities[soapMonths[y]] = inStock;
    y += 2;
  }

  inventoryItemQuantities['Natural 6 Pouch Bag'] = inventory.getRange(4,10).getValue();
  inventoryItemQuantities['Green 6 Pouch Bag'] = inventory.getRange(4,12).getValue();
  inventoryItemQuantities['Indigo 6 Pouch Bag'] = inventory.getRange(4,14).getValue();
  inventoryItemQuantities['Natural 4 Pouch Bag'] = inventory.getRange(9,10).getValue();
  inventoryItemQuantities['Green 4 Pouch Bag'] = inventory.getRange(9,12).getValue();
  inventoryItemQuantities['Indigo 4 Pouch Bag'] = inventory.getRange(9,14).getValue();
  inventoryItemQuantities['Unscented Dishbar'] = inventory.getRange(13,11).getValue();
  inventoryItemQuantities['Basil Dishbar'] = inventory.getRange(13,13).getValue();
  inventoryItemQuantities['Lemon Dishbar'] = inventory.getRange(13,15).getValue();

  Logger.log(inventoryItemQuantities);
  return inventoryItemQuantities;
}
