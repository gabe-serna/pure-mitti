function checkIfTransit() {
  for (let i = getHeaderRow(); !shipments.getRange(i+1,6).isBlank(); i++) {
    let status = shipments.getRange(i+1,6).getValue();
    if(status == "TRANSIT" || status == "UNKNOWN" || status == "PRE_TRANSIT"){checkAppTransit(i+1)};
  };

  Logger.log("{checkIfTransit} All Orders Successfully Updated")
}

function checkAppTransit(row){
  let reference = shipments.getRange(row,5).getValue();
  switch (reference) {
    case "Faire":
    case "Convictional":
    case "Shopify":
    case "Shippo":
      checkShippoTransit(row);
      break;
    case "Etsy":
      //---------------------------------------------------------------------
      // Does Etsy even have ETA? If not, then this would be kinda pointless
      //---------------------------------------------------------------------
      //add check etsy transit function (row)
      break;
    case "Pod Foods":
      checkPodTransit(row);
      break;
    case "Manual":
    case "manual":
      Logger.log('manual order detected');
      let tracking_number = shipments.getRange(row,3).getValue();
      let carrier = shipments.getRange(row,4).getValue();
      checkManualOrder(tracking_number, carrier, row);
      break;
    default:
      Logger.log("{checkAppTransit} Unknown input detected: " + reference);
  }
}

function checkShippoTransit(row){
  let trackingNumber = shipments.getRange(row,3).getValue();

  //Locate the row in shippo_transactions that contains the tracking number for this order
  for (let i = 2; !shippoTransactions.getRange(i,1).isBlank(); i++){
    let reference = shippoTransactions.getRange(i,2).getValue();
    if (reference == trackingNumber){
      pullShippoEta(i, row);
      return;
    }
  }
  
  //Make API Call to get ETA if not found in shippo_transactions
  let carrier = shipments.getRange(row,4).getValue();
  let data = fetchData(trackingNumber, carrier);
  if (data !== null ) var eta = data["eta"];
  if (eta == null || data == null){eta = "ETA: DELAYED"}
  else {eta = ("ETA: " + new Date(eta).toLocaleDateString().slice(0,-5))};
  placeShippoEta(row, eta);
}

function pullShippoEta(row, shipmentRow){
  let etaRaw = shippoTransactions.getRange(row,4).getValue();
  let eta = (`ETA: ${new Date(etaRaw).toLocaleDateString().slice(0,-5)}`);

  //Replace Object ID if Manual Order
  let id = shipments.getRange(shipmentRow,9);
  if (id.getValue() == "manual"){
    let newId = getNewId(shippoTransactions.getRange(row,2).getValue());
    id.setValue(newId);
  }

  placeShippoEta(shipmentRow, eta);
}

function placeShippoEta(shipmentRow, eta){
  let notes = shipments.getRange(shipmentRow,8);
  let notesValue = notes.getValue();
  
  //Replace Current ETA
  if (notesValue.includes("ETA")){
    let newNotes = notesValue.substring(0,notesValue.lastIndexOf("\n"))
    printNewETA(notes, newNotes, eta)
    return;
  }

  if (eta != ""){addEtaIfNotThere(notes,eta)};
}

function checkPodTransit(row){
  let trackingNumber = shipments.getRange(row,3).getValue();

  //Locate the row in pod_confirmed_orders that contains the tracking number for this order
  let i;
  for (i = 2; !podConfirmedOrders.getRange(i,1).isBlank(); i++){
    let reference = podConfirmedOrders.getRange(i,3).getValue();
    if (reference == trackingNumber){break};
  }

  //Replace Current ETA
  let notes = shipments.getRange(row,8);
  let notesValue = notes.getValue();
  let etaRaw = podConfirmedOrders.getRange(i,8).getValue();
  let eta = ("ETA: " + new Date(etaRaw).toLocaleDateString().slice(0,-5));
  
  if (notesValue.includes("ETA")){
    let newNotes = notesValue.substring(0,notesValue.lastIndexOf("\n"))
    printNewETA(notes, newNotes, eta)
    return;
  }

  if (!podConfirmedOrders.getRange(i,8).isBlank()){
    addEtaIfNotThere(notes,eta);
  }; 
}

function checkManualOrder(trackingNumber,carrier,row){
  //Update Manual Order Status
  let data = fetchData(trackingNumber, carrier);
  Logger.log(data);
  if (data == null) {return};
  let status = data["tracking_status"]["status"];
  shipments.getRange(row,6).setValue(status);

  let eta = data["eta"];
  eta = ("ETA: " + new Date(eta).toLocaleDateString().slice(0,-5));
  let notes = shipments.getRange(row,8);
  let notesValue = notes.getValue();

  //Replace Current ETA
  if (notesValue.includes("ETA")){
    let newNotes = notesValue.substring(0,notesValue.lastIndexOf("\n"))
    printNewETA(notes, newNotes, eta)
    return;
  }

  addEtaIfNotThere(notes,eta)
}


//----------------------
// Supporting Functions
//----------------------

function fetchData(trackingNumber, carrier){
  const params = {
    headers: {Authorization: shippoApiKey},
    contentType: 'application/json'
  };

  try {
    const response = UrlFetchApp.fetch(`https://api.goshippo.com/tracks/${carrier}/${trackingNumber}`, params);
    return JSON.parse(response.getContentText());
  } catch (error) {
    console.error(error);
    return null
  }
}

function getNewId(trackingNumber){
for (let i = 2; !shippoShipped.getRange(i,1).isBlank(); i++){
  let reference = shippoShipped.getRange(i,2).getValue();
    if (reference == trackingNumber){
      // Logger.log("{getNewId} Tracking match found at Row: " + i)
      return shippoShipped.getRange(i,9).getValue();
    }
  }
  // Logger.log("{getNewId} No Tracking match found for tracking number: " + trackingNumber)
  return null;
}

function printNewETA(notes, newNotes, eta){
  if(newNotes.length == 0){notes.setValue(eta)}
  else {notes.setValue(newNotes + "\n" + eta)};
}

function addEtaIfNotThere(notes, eta){
  if(notes.isBlank()){notes.setValue(eta)}
  else {notes.setValue(notes.getValue() + "\n\n" + eta)};
}


