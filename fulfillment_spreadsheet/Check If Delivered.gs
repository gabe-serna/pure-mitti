const shippoDeliveredOrders = [];
const shopifyDeliveredOrders = [];
const podDeliveredOrders = [];
const manualDeliveredOrders = [];
let count = 0;

function checkIfDelivered(){
  for (let i = getHeaderRow(); !shipments.getRange(i+1,6).isBlank(); i++) {
    if(shipments.getRange(i+1,6).getValue() == "DELIVERED"){
      checkAppOutgoing(i+1);
      i -= count;
      count = 0;
    }
  };
  placeDeliveredOrders(shippoDeliveredOrders);
  placeDeliveredOrders(shopifyDeliveredOrders);
  placeDeliveredOrders(podDeliveredOrders);
  placeDeliveredOrders(manualDeliveredOrders);
  mergeMiddleColumnLog();

  Logger.log("{checkIfDelivered} All Orders Successfully Updated To Shipment Log");
}

function checkAppOutgoing(row){
  let reference = shipments.getRange(row,5).getValue();
  switch (reference) {
    case "Shippo":
      checkShippoDeliveredOrders(row);
      break;
    case "Faire":
    case "Convictional":
    case "Shopify":
      checkShopifyDeliveredOrders(row);
      break;
    case "Etsy":
      //add checkEtsyDeliveredOrders(row);
      break;
    case "Pod Foods":
      checkPodDeliveredOrders(row);
      break;
    case "Manual":
      pullManualDeliveredOrders(row);
      break;
    default:
      Logger.log("{checkAppOutgoing} Unknown input detected: " + reference);
  }
}

function checkShippoDeliveredOrders(row){
  let objectId = shipments.getRange(row,9).getValue();

  //Find ID match between order in Shipments tab and order in Shippo Shipped tab
  for (let i = 2; !shippoShipped.getRange(i,9).isBlank(); i++){
    let reference = shippoShipped.getRange(i,9).getValue();
    if (reference == objectId){
      pullShippoDeliveredOrder(i, row);
      break;
    }
  }
}

function checkShopifyDeliveredOrders(row){
  let objectId = shipments.getRange(row,9).getValue();

  //Find ID match between order in Shipments tab and order in shopify_shipped tab
  for (let i = 2; !shopifyShipped.getRange(i,2).isBlank(); i++){
    let reference = shopifyShipped.getRange(i,2).getValue();
    if (reference == objectId){
      pullShopifyDeliveredOrder(i, row);
      break;
    }
  }
}

function checkPodDeliveredOrders(row){
  let objectId = shipments.getRange(row,9).getValue();

  //Find ID match between order in Shipments tab and order in pod_confirmed_orders tab
  for (let i = 2; !podConfirmedOrders.getRange(i,12).isBlank(); i++){
    let reference = podConfirmedOrders.getRange(i,12).getValue();
    if (reference == objectId){
      //Logger.log("{checkPod} ID match found at Row: " + i)
      pullPodDeliveredOrder(i, row);
      break;
    }
  }
}

function pullShippoDeliveredOrder(row, shipmentRow){
  let date = shipments.getRange(shipmentRow,1).getValue();
  let name = shippoShipped.getRange(row,3).getValue();
  let trackingNumber = shippoShipped.getRange(row,2).getValue();
  let carrier = shipments.getRange(shipmentRow,4).getValue();
  let app = shipments.getRange(shipmentRow,5).getValue();
  let notes = notesRemoveEta(shipmentRow);

  let orderNumber = shippoShipped.getRange(row,10).getValue();
  let orderValue = shippoShipped.getRange(row,7).getValue();
  let customerShippingPaid = shippoShipped.getRange(row,8).getValue();
  let shippingCost = getRate(trackingNumber);
  let city = shippoShipped.getRange(row,11).getValue();
  let state = shippoShipped.getRange(row,12).getValue();
  let zip = shippoShipped.getRange(row,13).getValue();
  let items = shipments.getRange(shipmentRow,10).getValue();

  shippoDeliveredOrders.push([date,name,trackingNumber,carrier,app,notes,orderNumber,orderValue,customerShippingPaid,shippingCost,city,state,zip,items]);
  shipments.deleteRow(shipmentRow);
  count = 1;
}

function pullShopifyDeliveredOrder(row, shipmentRow){
  let date = shipments.getRange(shipmentRow,1).getValue();
  let name = shopifyShipped.getRange(row,7).getValue();
  let trackingNumber = shopifyShipped.getRange(row,4).getValue();
  let carrier = shipments.getRange(shipmentRow,4).getValue();
  let app = shipments.getRange(shipmentRow,5).getValue();
  let notes = notesRemoveEta(shipmentRow);

  let orderNumber = shopifyShipped.getRange(row,3).getValue();
  let orderValue = shopifyShipped.getRange(row,9).getValue();
  let customerShippingPaid = shopifyShipped.getRange(row,10).getValue();
  let shippingCost = getRate(trackingNumber);
  let city = shopifyShipped.getRange(row,11).getValue();
  let state = shopifyShipped.getRange(row,12).getValue();
  let zip = shopifyShipped.getRange(row,13).getValue();
  let items = shipments.getRange(shipmentRow,10).getValue();

  shopifyDeliveredOrders.push([date,name,trackingNumber,carrier,app,notes,orderNumber,orderValue,customerShippingPaid,shippingCost,city,state,zip,items]);
  shipments.deleteRow(shipmentRow);
  count = 1;
}

function pullPodDeliveredOrder(row, shipmentRow){
  let date = shipments.getRange(shipmentRow,1).getValue();
  let name = podConfirmedOrders.getRange(row,2).getValue();
  let trackingNumber = podConfirmedOrders.getRange(row,3).getValue();
  let carrier = podConfirmedOrders.getRange(row,4).getValue();
  let app = podConfirmedOrders.getRange(row,5).getValue();
  let notes = notesRemoveEta(shipmentRow);

  let orderNumber = podConfirmedOrders.getRange(row,13).getValue();
  orderNumber = "#" + orderNumber;
  let orderValue = podConfirmedOrders.getRange(row,10).getValue();
  let customerShippingPaid = "";
  let shippingCost = podConfirmedOrders.getRange(row,11).getValue(); 
    if (shippingCost == ""){shippingCost = getRate(trackingNumber)};
  let city = podConfirmedOrders.getRange(row,14).getValue();
  let state = podConfirmedOrders.getRange(row,15).getValue();
  let zip = podConfirmedOrders.getRange(row,16).getValue();
  let items = shipments.getRange(shipmentRow,10).getValue();

  podDeliveredOrders.push([date,name,trackingNumber,carrier,app,notes,orderNumber,orderValue,customerShippingPaid,shippingCost,city,state,zip,items]);
  shipments.deleteRow(shipmentRow);
  count = 1;
}

function pullManualDeliveredOrders(shipmentRow){
  let trackingNumber = shipments.getRange(shipmentRow,3).getValue();
  let carrier = shipments.getRange(shipmentRow,4).getValue();
  
  const params = {
    headers: {Authorization: shippoApiKey},
    contentType: 'application/json'
  };

  const response = UrlFetchApp.fetch(`https://api.goshippo.com/tracks/${carrier}/${trackingNumber}`, params);
  const data = JSON.parse(response.getContentText());

  let date = shipments.getRange(shipmentRow,1).getValue();
  let name = shipments.getRange(shipmentRow,2).getValue();
  // Tracking Number already set
  // Carrier already set
  let app = shipments.getRange(shipmentRow,5).getValue();
  let notes = notesRemoveEta(shipmentRow);

  let orderNumber = ""
  let orderValue = ""
  let customerShippingPaid = ""
  let shippingCost = ""
  let city =  data["address_to"]["city"];
  let state =  data["address_to"]["state"];
  let zip =  data["address_to"]["zip"];
  let items = shipments.getRange(shipmentRow,10).getValue();

  manualDeliveredOrders.push([date,name,trackingNumber,carrier,app,notes,orderNumber,orderValue,customerShippingPaid,shippingCost,city,state,zip,items]);
  shipments.deleteRow(shipmentRow);
  count = 1;
}

function placeDeliveredOrders(webApp){
  for (let i = 0; i < webApp.length; i++){
    shipmentLog.insertRowBefore(2);
    
    let date = shipmentLog.getRange(2,1);
    date.setValue(webApp[i][0]);

    let name = shipmentLog.getRange(2,2);
    name.setValue(webApp[i][1]);

    let trackingNumber = shipmentLog.getRange(2,3);
    trackingNumber.setValue(webApp[i][2]);

    let carrier = shipmentLog.getRange(2,4);
    carrier.setValue(webApp[i][3]);

    let app = shipmentLog.getRange(2,5);
    app.setValue(webApp[i][4]);
    
    let notes = shipmentLog.getRange(2,7);
    notes.setValue(webApp[i][5]);

    let orderNumber = shipmentLog.getRange(2,8);
    orderNumber.setValue(webApp[i][6]);

    let orderValue = shipmentLog.getRange(2,9);
    orderValue.setValue(webApp[i][7]);

    let customerShippingPaid = shipmentLog.getRange(2,10);
    customerShippingPaid.setValue(webApp[i][8]);

    let shippingCost = shipmentLog.getRange(2,11);
    shippingCost.setValue(webApp[i][9]);

    let city = shipmentLog.getRange(2,12);
    city.setValue(webApp[i][10]);

    let state = shipmentLog.getRange(2,13);
    state.setValue(webApp[i][11]);

    let zip = shipmentLog.getRange(2,14);
    zip.setValue(webApp[i][12]);

    if(customerShippingPaid.isBlank() && !orderValue.isBlank()){shipmentLog.getRange(2,15).setValue('=DIVIDE(K2,I2)')}
    
    let items = shipmentLog.getRange(2,16);
    items.setValue(webApp[i][13]);

    // If order is a sample, copy it to the Samples sheet
    if (webApp[i][5].includes("SAMPLE")){
      samples.insertRowBefore(2);
      shipmentLog.getRange(2,1,1,16).copyTo(samplesLog.getRange(2,1))
      }
  }
}

//----------------------
// Supporting Functions
//----------------------

function notesRemoveEta(shipmentRow){
  let notes = shipments.getRange(shipmentRow,8).getValue();
  if (notes.includes("ETA")){
    let notesSplit = notes.split("\n");
    notesSplit.splice(-2,2);
    return notesSplit.toString();
  }
  return notes;
}

function getRate(trackingNumber){ 
  let row = getRateRow(trackingNumber);
  if (row == "not found"){
    //If fulfilled outside of Shippo
    let amount = getShopifyRate(trackingNumber);
    return amount;
  };
  
  //Make Shippo Rate API Call
  let rateId = shippoTransactions.getRange(row,6).getValue();
  const params = {
    headers: {Authorization: shippoApiKey},
    contentType: 'application/json'
  };

  const response = UrlFetchApp.fetch('https://api.goshippo.com/rates/' + rateId, params);
  const data = JSON.parse(response.getContentText());

  return data["amount"];
}

function getRateRow(trackingNumber){
  for (let i = 2; !shippoTransactions.getRange(i,1).isBlank(); i++){
    let reference = shippoTransactions.getRange(i,2).getValue();
    if (reference == trackingNumber){
        Logger.log("{getRateRow} Found Tracking match at row: " + i)
        return i;
    }
  }
  return "not found";
}

function getShopifyRate(trackingNumber){
  //Locate row of item in shopify_shipped tab
  let i;
  let reference;
  for (i = 2; !shopifyShipped.getRange(i,1).isBlank(); i++){
    reference = shopifyShipped.getRange(i,4).getValue();
    if (reference == trackingNumber){break};
  }
  
  //Make API Call with Object ID
  let objectId = shopifyShipped.getRange(i,2).getValue();
  if (!objectId){return ""};
  const params = {
    headers: {"X-Shopify-Access-Token": shopifyApiKey},
    contentType: 'application/json'
  };

  const response = UrlFetchApp.fetch(`https://pure-mitti.myshopify.com/admin/api/2024-04/orders/${objectId}/events.json`, params);
  const data = JSON.parse(response.getContentText());

  for (i = 0; i < data["events"].length; i++){
    if (!data["events"][i]["message"].includes("purchased a shipping label")){continue};

    //Formatting the Rate
    let string = data["events"][i]["message"];
    let rate = string.slice(string.lastIndexOf("$") + 1,-1);
    return rate;
  }

  //Error handling if no rate was found  
  return "shipping label was not purchased";
}

function mergeMiddleColumnLog(){
  let lastRow = shipmentLog.getMaxRows();
  shipmentLog.getRange(2,6,lastRow-1,1).merge(); 
}

function testing(){
  let rate = getRate("1ZB8F618YW13035629");
  Logger.log(rate)
}

