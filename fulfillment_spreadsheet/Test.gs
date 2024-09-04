const testSheet = ss.getSheetByName("Sheet5");
const list = ss.getSheetByName("Sheet14");

function test(){
  Logger.log("test function called");
}

// ^^^ THIS IS HOW YOU APPEND ETA TO CELL ^^^

function test2(){
  //let eta = shippoTransactions.getRange(2,4).getValue();  
  //Logger.log("ETA: " + new Date(eta).toLocaleDateString().slice(0,-5));
  //Logger.log(new Date(eta).toDateString());

  let date = new Date().toLocaleDateString().slice(0,-5);
  Logger.log(date)
}

function test5(){
 let test = null;
 let err = test || "not found";
 Logger.log(err);
}

function testDates(){
  let today = new Date();
  let lastMonth = new Date(new Date().setDate(today.getDate() - 30));

  let year = lastMonth.getFullYear();

  let month = (1 + lastMonth.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  let day = lastMonth.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  let dateFinal = year + '-' + month + '-' + day;
  Logger.log(dateFinal);
}
function test3(){

}

function scrapeLogData(){
  let rateId = "";
  for (let i = 18; !shipmentLog.getRange(i,5).isBlank(); i++){
    if (shipmentLog.getRange(i,5).getValue() != "Etsy"){
      let trackingNumber = shipmentLog.getRange(i,3).getValue();
      rateId = getRateId(trackingNumber);

      const params = {
        headers: {Authorization: shippoApiKey},
        contentType: 'application/json'
      };
      if (rateId != ""){
        const response = UrlFetchApp.fetch('https://api.goshippo.com/rates/' + rateId, params);
        const data = JSON.parse(response.getContentText());
        shipmentLog.getRange(i,11).setValue(data["amount"]);
      } else (Logger.log("No Shipping Cost Found for Row " + i))
    } else (Logger.log("Etsy Order found at Row " + i))
  }
}

function scrapeLogData2(){
  for (let i = 18; !shipmentLog.getRange(i,5).isBlank(); i++){
    if (shipmentLog.getRange(i,5).getValue() == "Shopify" || shipmentLog.getRange(i,5).getValue() == "Shippo"){
      let trackingNumber = shipmentLog.getRange(i,3).getValue();
      let row = getTempRow(trackingNumber);
      if (row != ""){
        let orderNumber = list.getRange(row,10).getValue();
        shipmentLog.getRange(i,8).setValue(orderNumber);

        let orderValue = list.getRange(row,7).getValue();
        shipmentLog.getRange(i,9).setValue(orderValue);

        let shipping = list.getRange(row,8).getValue();
        if (shipping != 0){shipmentLog.getRange(i,10).setValue(shipping)};
        
        let city = list.getRange(row,11).getValue();
        shipmentLog.getRange(i,12).setValue(city);

        let st = list.getRange(row,12).getValue();
        shipmentLog.getRange(i,13).setValue(st);

        let zip = list.getRange(row,13).getValue();
        shipmentLog.getRange(i,14).setValue(zip);
      } else (Logger.log("No match found for Row" + i))
    } else (Logger.log("Non Shippo/Shopify Order at Row " + i))
  }
}

function getRateId(trackingNumber){
  for (let i = 2; !list.getRange(i,1).isBlank(); i++){
    let reference = list.getRange(i,2).getValue();
    if (reference == trackingNumber){
      let rateId = list.getRange(i,6).getValue();
      return rateId;
    }
  }
  return "";
}

function getTempRow(trackingNumber){
  for (let i = 2; !list.getRange(i,1).isBlank(); i++){
    let reference = list.getRange(i,2).getValue();
    if (reference == trackingNumber){return i;}
  }
  return "";
}

function shippoTempCall(){
  const params = {
    headers: {Authorization: shippoApiKey},
    contentType: 'application/json'
  };

  const response = UrlFetchApp.fetch('https://api.goshippo.com/transactions?page=1&results=100', params);
  const data = JSON.parse(response.getContentText());
  let responseValues = [];

  //Pulling Shippo Shipped Orders
  for (let i = 0; i < data["results"].length; i++) {
    let objectId = data["results"][i]["object_id"];
    let trackingNumber = data["results"][i]["tracking_number"];
    let status = data["results"][i]["tracking_status"];
    let eta = data["results"][i]["eta"];
    let carrier = data["results"][i]["tracking_url_provider"];
    let rate = data["results"][i]["rate"]
    
    responseValues.push([objectId,trackingNumber,status,eta,carrier,rate]);
  }
  list.getRange(2,1,responseValues.length,6).setValues(responseValues);
  Logger.log("{shippoTempCall} All Shipped Orders Called Successfully");
}

function shippoTempShippedOrdersCall(){
  const params = {
    headers: {Authorization: shippoApiKey},
    contentType: 'application/json'
  };

  const response = UrlFetchApp.fetch('https://api.goshippo.com/orders?page=1&results=100', params);
  const data = JSON.parse(response.getContentText());
  let responseValues = [];

  //Pulling Shippo Shipped Orders
  for (let i = 0; i < data["results"].length; i++) {
    if (data["results"][i]["order_status"] == "SHIPPED"){
      let date = data["results"][i]["placed_at"];
      let dateFormatted = date.slice(0,10);
      let trackingNumber = "";
        if (data["results"][i]["transactions"].length != 0){trackingNumber = data["results"][i]["transactions"][0]["tracking_number"]};
      let name =  data["results"][i]["to_address"]["name"];
      let app = data["results"][i]["shop_app"];
      let orderStatus = data["results"][i]["order_status"];
      let notes = data["results"][i]["notes"];
      let orderValue = data["results"][i]["subtotal_price"];
      let customerShippingPaid = data["results"][i]["shipping_cost"];
      let objectId = data["results"][i]["object_id"];
      let orderNumber = data["results"][i]["order_number"];
      let city = data["results"][i]["to_address"]["city"];
      let state = data["results"][i]["to_address"]["state"];
      let zip = data["results"][i]["to_address"]["zip"];
      
      responseValues.push([dateFormatted,trackingNumber,name,app,orderStatus,notes,orderValue,customerShippingPaid,objectId,orderNumber,city,state,zip]);
    }
  }; 
  list.getRange(2,1,responseValues.length,13).setValues(responseValues);
  Logger.log("{shippoTempShippedOrdersCall} All Shipped Orders Called Successfully");
}


