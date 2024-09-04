const shopifyShippedOrders = [];
const podShippedOrders = [];

function checkIfShipped() {
  for (let i = 2; !shipments.getRange(i,9).isBlank(); i++) {checkApp(i)};

  let x = getHeaderRow();
  placeShopifyShippedOrders(x);
  placePodShippedOrders(x);
  
  //Check and Delete duplicates that have been pasted
  deleteDuplicates(x);
  mergeMiddleColumn();
  
  if (shopifyShippedOrders == "" && podShippedOrders == ""){Logger.log("{checkIfShipped} No Shipped Orders To Be Updated");}
  else {Logger.log("{checkIfShipped} All Orders Successfully Updated To Outgoing Shipments");}
}

function checkApp(row){
  let reference = shipments.getRange(row,5).getValue();
  switch (reference) {
    case "Shippo":
      Logger.log("{checkApp} Shippo order detected (Must be updated Manually)");
      break;
    case "Convictional":
    case "Faire":
    case "Shopify":
      checkShopifyShippedOrders(row);
      break;
    case "Etsy":
      //add check etsy shipped orders function (row)
      break;
    case "Pod Foods":
      checkPodShippedOrders(row);
      break;
    default:
      Logger.log("{checkApp} Unknown input detected: " + reference);
  }
}

function checkShopifyShippedOrders(row){
  let objectId = shipments.getRange(row,9).getValue();

  //Find ID match between order in Shipments tab and order in shopify_shipped tab
  for (let i = 2; !shopifyShipped.getRange(i,2).isBlank(); i++){
    let reference = shopifyShipped.getRange(i,2).getValue();
    if (reference == objectId){
      pullShopifyShippedOrder(i, row);
      break;
    }
  }
  //Logger.log("{checkShopify} No match found")
}

function checkPodShippedOrders(row){
  let objectId = shipments.getRange(row,9).getValue();

  //Find ID match between order in Shipments tab and order in pod_confirmed_orders tab
  for (let i = 2; !podConfirmedOrders.getRange(i,12).isBlank(); i++){
    let reference = podConfirmedOrders.getRange(i,12).getValue();
    if (reference == objectId){
      Logger.log("{checkPod} ID match found at Row: " + i)
      pullPodShippedOrder(i, row);
      break;
    }
  }
  Logger.log("{checkPod} No match found"); 
}

function pullShopifyShippedOrder(row, shipmentRow){
  let date = new Date().toLocaleDateString().slice(0,-5);
  let name = shopifyShipped.getRange(row,7).getValue();
  let trackingNumber = shopifyShipped.getRange(row,4).getValue();
  let carrier = shopifyShipped.getRange(row,6).getValue();
  let app = shipments.getRange(shipmentRow,5).getValue();
  let notes = shipments.getRange(shipmentRow,8).getValue();
  let objectId = shopifyShipped.getRange(row,2).getValue();
  let items = shipments.getRange(shipmentRow,10).getValue();

  shopifyShippedOrders.push([date,name,trackingNumber,carrier,app,notes,objectId,items]);
}

function pullPodShippedOrder(row, shipmentRow){
  let date = new Date().toLocaleDateString().slice(0,-5);
  let name = podConfirmedOrders.getRange(row,2).getValue();
  let trackingNumber = podConfirmedOrders.getRange(row,3).getValue();
  let carrier = podConfirmedOrders.getRange(row,4).getValue();
  let app = podConfirmedOrders.getRange(row,5).getValue();
  let notes = shipments.getRange(shipmentRow,8).getValue();
  let objectId = podConfirmedOrders.getRange(row,12).getValue();
  let items = shipments.getRange(shipmentRow,10).getValue();

  podShippedOrders.push([date,name,trackingNumber,carrier,app,notes,objectId,items]);
}

function placeShopifyShippedOrders(x){
  for (let i = 0; i < shopifyShippedOrders.length; i++){
    shipments.insertRowBefore(x+1);

    let date = shipments.getRange(x+1,1);
    date.setValue(shopifyShippedOrders[i][0]);

    let name = shipments.getRange(x+1,2);
    name.setValue(shopifyShippedOrders[i][1]);

    let trackingNumber = shipments.getRange(x+1,3);
    trackingNumber.setValue(shopifyShippedOrders[i][2]);

    let carrier = shipments.getRange(x+1,4);
    carrier.setValue(shopifyShippedOrders[i][3]);

    let app = shipments.getRange(x+1,5);
    app.setValue(shopifyShippedOrders[i][4]);
    
    let notes = shipments.getRange(x+1,8);
    notes.setValue(shopifyShippedOrders[i][5]);

    let objectId = shipments.getRange(x+1,9);
    objectId.setValue(shopifyShippedOrders[i][6]);

    let items = shipments.getRange(x+1,10);
    items.setValue(shopifyShippedOrders[i][7]);

    shipments.getRange(x+1,6).setValue('=iferror(VLOOKUP(C' + (x+1) + ',shopify_shipped!D:E,2,FALSE),"not found")');
  };
}

function placePodShippedOrders(x){
  for (let i = 0; i < podShippedOrders.length; i++){
    shipments.insertRowBefore(x+1);

    let date = shipments.getRange(x+1,1);
    date.setValue(podShippedOrders[i][0]);

    let name = shipments.getRange(x+1,2);
    name.setValue(podShippedOrders[i][1]);

    let trackingNumber = shipments.getRange(x+1,3);
    trackingNumber.setValue(podShippedOrders[i][2]);

    let carrier = shipments.getRange(x+1,4);
    carrier.setValue(podShippedOrders[i][3]);

    let app = shipments.getRange(x+1,5);
    app.setValue(podShippedOrders[i][4]);
    
    let notes = shipments.getRange(x+1,8);
    notes.setValue(podShippedOrders[i][5]);

    let objectId = shipments.getRange(x+1,9);
    objectId.setValue(podShippedOrders[i][6]);

    let items = shipments.getRange(x+1,10);
    items.setValue(podShippedOrders[i][7]);

    shipments.getRange(x+1,6).setValue('=iferror(VLOOKUP(C' + (x+1) + ',pod_confirmed_orders!C:H,5,FALSE),"not found")');
  };
}


//-------------------------------
// Supplementary Functions Below
//-------------------------------


function getShippoCarrier(trackingNumber){
  let i = 2;
  for (; ;i++){
    let reference = shippoTransactions.getRange(i,2).getValue();

    if (reference == trackingNumber && reference != ""){
        //Logger.log("{getCarrier} Found Tracking match at row: " + i)
        break;
    } else if (reference == ""){
        //Logger.log("{getCarrier} No Tracking match found")
        return "not found";
    }
  }

  let carrierUrl = shippoTransactions.getRange(i,5).getValue();
  
  if (carrierUrl.includes("usps")){
    return "USPS";
  } else if (carrierUrl.includes("ups")){
    return "UPS";
  } else if (carrierUrl.includes("fedex")){
    return "FedEx"
  } else {return "carrier not found"}
}

function getShippoEta(trackingNumber){
  for (let i = 2; !shippoTransactions.getRange(i,2).isBlank(); i++){
    let reference = shippoTransactions.getRange(i,2).getValue();

    if (reference == trackingNumber){
      let eta = shippoTransactions.getRange(i,4).getValue();
      return ("ETA: " + new Date(eta).toLocaleDateString().slice(0,-5));
    }
  }
  //Logger.log("{getShippoEta} No Tracking match found")
  return "";
}

function getPodEta(row){
  if (!podConfirmedOrders.getRange(row,8).isBlank()){
    let eta = podConfirmedOrders.getRange(row,8).getValue();
    return ("ETA: " + new Date(eta).toLocaleDateString().slice(0,-5));
  }
  return "";
}

function deleteDuplicates(headerRow){
  for (let z = 1; !shipments.getRange(headerRow + z,9).isBlank(); z++){
    let objectId = shipments.getRange(headerRow + z,9).getValue();
    z = checkForDuplicates(objectId,z);
  }
}

function checkForDuplicates(objectId,z){
  for (let i = 2; !shipments.getRange(i,9).isBlank(); i++){
    let reference = shipments.getRange(i,9).getValue();
    if (objectId == reference){
      Logger.log("{checkForDuplicates} Found duplicate order at Row " + i + " for " + shipments.getRange(i, 2).getValue());
      shipments.deleteRow(i);
      return z -= 1;
    }
  }
  return z;
}

function mergeMiddleColumn(){
  let headerRow = getHeaderRow();
  let lastRow = shipments.getMaxRows();
  shipments.getRange(headerRow+1,7,lastRow-headerRow,1).merge(); 
}


