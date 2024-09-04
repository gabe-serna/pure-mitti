function getAllNewOrders(){
  //getShippoNewOrders();
  getShopifyNewOrders();
  //getEtsyNewOrders();
  getPodNewOrders();
}


//--------
// Shippo
//--------

// const shippoOrders = [];

// function getShippoNewOrders(){
//   for (let i = 2; !shippoNewOrders.getRange(i,2).isBlank(); i++) {formatShippoNewOrder(i)};
//   placeShippoNewOrders();
//   if (shippoNewOrders.getRange(2,1).isBlank()){Logger.log("{getShippoNewOrders} No Shippo Orders Have Been Located")}
//   else {Logger.log("{getShippoNewOrders} All Shippo New Orders Successfully Exported")};
// }

// function formatShippoNewOrder(row){
//   let date = shippoNewOrders.getRange(row,1).getValue();
//   let name = shippoNewOrders.getRange(row,2).getValue();
//   let orderValue = shippoNewOrders.getRange(row,6).getValue();
//   let prepaidShipping = shippoNewOrders.getRange(row,7).getValue();
//     if (prepaidShipping == 0){prepaidShipping = ""};
//   let app = shippoNewOrders.getRange(row,3).getValue();
//   let status = shippoNewOrders.getRange(row,4).getValue();
//   let notes = shippoNewOrders.getRange(row,5).getValue();
//     if (notes.includes("convictional")){app = "Convictional"};
//   let objectId = shippoNewOrders.getRange(row,8).getValue();
//   let items = shippoNewOrders.getRange(row,9).getValue();

//   shippoOrders.push([date,name,orderValue,prepaidShipping,app,status,notes,objectId,items]);
// }

// function placeShippoNewOrders(){
//   for(let i = 0; i < shippoOrders.length ; i++){
//     if (isNewOrderDuplicate(shippoOrders[i][7]) != true){
//       shipments.insertRowBefore(2);

//       let date = shipments.getRange(2,1);
//       date.setValue(shippoOrders[i][0]);

//       let name = shipments.getRange(2,2);
//       name.setValue(shippoOrders[i][1]);

//       let orderValue = shipments.getRange(2,3);
//       orderValue.setValue(shippoOrders[i][2]);

//       let prepaidShipping = shipments.getRange(2,4);
//       prepaidShipping.setValue(shippoOrders[i][3]);

//       let app = shipments.getRange(2,5);
//       app.setValue(shippoOrders[i][4]);

//       let status = shipments.getRange(2,6);
//       status.setValue(shippoOrders[i][5]);

//       let notes = shipments.getRange(2,8);
//       notes.setValue(shippoOrders[i][6]);

//       let objectId = shipments.getRange(2,9);
//       objectId.setValue(shippoOrders[i][7]);

//       let items = shipments.getRange(2,10)
//       items.setValue(shippoOrders[i][8])
//     }
//   }
// }

//---------
// Shopify
//---------

const shopifyOrders = [];

function getShopifyNewOrders(){
  for (let i = 2; !shopifyNewOrders.getRange(i,2).isBlank(); i++) {formatShopifyNewOrder(i)};
  placeShopifyNewOrders();
  if (shopifyNewOrders.getRange(2,1).isBlank()){Logger.log("{getShopifyNewOrders} No Shopify Orders Have Been Located")}
  else {Logger.log("{getShopifyNewOrders} All Shopify New Orders Successfully Exported")};
}

function formatShopifyNewOrder(row){
  let date = shopifyNewOrders.getRange(row,1).getValue();
  let name = shopifyNewOrders.getRange(row,2).getValue();
  let orderValue = shopifyNewOrders.getRange(row,6).getValue();
  let prepaidShipping = shopifyNewOrders.getRange(row,7).getValue();
  let app = shopifyNewOrders.getRange(row,3).getValue();
  let status = shopifyNewOrders.getRange(row,4).getValue();
  let notes = shopifyNewOrders.getRange(row,5).getValue();
    if (notes.includes("convictional")){app = "Convictional"};
    if (notes.includes("Faire")){app = "Faire"};
  let objectId = shopifyNewOrders.getRange(row,8).getValue();
  let items = shopifyNewOrders.getRange(row,9).getValue();

  shopifyOrders.push([date,name,orderValue,prepaidShipping,app,status,notes,objectId,items]);
}

function placeShopifyNewOrders(){
  for(let i = 0; i < shopifyOrders.length ; i++){
    if (isNewOrderDuplicate(shopifyOrders[i][7]) != true){
      shipments.insertRowBefore(2);

      let date = shipments.getRange(2,1);
      date.setValue(shopifyOrders[i][0]);

      let name = shipments.getRange(2,2);
      name.setValue(shopifyOrders[i][1]);

      let orderValue = shipments.getRange(2,3);
      orderValue.setValue(shopifyOrders[i][2]);

      let prepaidShipping = shipments.getRange(2,4);
      prepaidShipping.setValue(shopifyOrders[i][3]);

      let app = shipments.getRange(2,5);
      app.setValue(shopifyOrders[i][4]);

      let status = shipments.getRange(2,6);
      status.setValue(shopifyOrders[i][5]);

      let notes = shipments.getRange(2,8);
      notes.setValue(shopifyOrders[i][6]);

      let objectId = shipments.getRange(2,9);
      objectId.setValue(shopifyOrders[i][7]);

      let items = shipments.getRange(2,10)
      items.setValue(shopifyOrders[i][8])
    }
  }
}

//-----------
// Pod Foods
//-----------


const podOrders = [];

function getPodNewOrders() {
for (let i = 2; !podNewOrders.getRange(i,2).isBlank(); i++) {formatPodNewOrder(i)};
  placePodNewOrders();
  if (podNewOrders.getRange(2,1).isBlank()){Logger.log("{getPodNewOrders} No Pod Orders Have Been Located")}
  else {Logger.log("{getPodNewOrders} All Pod New Orders Successfully Exported")};
}

function formatPodNewOrder(row){
  let date = podNewOrders.getRange(row,1).getValue();
  let name = podNewOrders.getRange(row,2).getValue();
  let orderValue = podNewOrders.getRange(row,7).getValue();
  let prepaidShipping = "";
  let app = podNewOrders.getRange(row,3).getValue();
  let statusRaw = podNewOrders.getRange(row,4).getValue();
    let statusString = statusRaw.toString();
    let status = statusString.toUpperCase();
  let notes = podNewOrders.getRange(row,6).getValue();
  let objectId = podNewOrders.getRange(row,8).getValue();
  let items = podNewOrders.getRange(row,9).getValue();

  podOrders.push([date,name,orderValue,prepaidShipping,app,status,notes,objectId,items])
}

function placePodNewOrders(){
  for(let i = 0; i < podOrders.length ; i++){
    if (isNewOrderDuplicate(podOrders[i][7]) != true){
      shipments.insertRowBefore(2);

      let date = shipments.getRange(2,1);
      date.setValue(podOrders[i][0]);

      let name = shipments.getRange(2,2);
      name.setValue(podOrders[i][1]);

      let orderValue = shipments.getRange(2,3);
      orderValue.setValue(podOrders[i][2]);

      let prepaidShipping = shipments.getRange(2,4);
      prepaidShipping.setValue(podOrders[i][3]);

      let app = shipments.getRange(2,5);
      app.setValue(podOrders[i][4]);

      let status = shipments.getRange(2,6);
      status.setValue(podOrders[i][5]);

      let notes = shipments.getRange(2,8);
      notes.setValue(podOrders[i][6]);

      let objectId = shipments.getRange(2,9);
      objectId.setValue(podOrders[i][7])

      let items = shipments.getRange(2,10);
      items.setValue(podOrders[i][8])
    }
  }
}

//----------------------
// Supporting Functions
//----------------------


function isNewOrderDuplicate(objectId){
  //Checking to see if ID of object to be placed is already there (a duplicate)
  for (let z = 2; !shipments.getRange(z,9).isBlank(); z++){
    let reference = shipments.getRange(z,9).getValue();
    if(objectId == reference){return true};
  }
  return false;
}


