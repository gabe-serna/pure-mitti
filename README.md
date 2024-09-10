<p align="center">
  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMVq98JWAYA6U5e3GFimpvmDhCsFVOvjuMqiuFLi1R5G_zolj5Sbo5Wp36Y75EpUukeb8&usqp=CAU' alt='Pure Mitti Logo'/>
</p>
<p align="center">
  A complete user's guide on how to use the Pure Mitti Fulfillment Spreadsheet.
</p>
<p align="center">
  <a href='#inventory'>Overview</a> - 
  <a href='#shipments'>Shipments</a> -
  <a href='#shipment-tracker-script'>Shipment Tracker Script</a> -
  <a href='#samples'>Samples</a> -
  <a href='#inventory'>Inventory</a> -
  <a href='#menu-items-reference'>Menu Items Reference</a>
</p>

## Overview

This document contains everything that you need to know in order to use the Pure Mitti Fulfillment Spreadsheet.

In this section, we will discuss the high level purpose of every tab in this spreadsheet. In later sections, more in-depth explanations and tutorials will be provided for the main use cases for this tool. At the end, we'll go over all of the supplementary functions provided in the menu.

<br>

### What are the main uses of this spreadsheet?

1. Fulfill Orders

Whether it be sending out a small sample or logging the tracking information for a huge wholesale order, the **main purpose** of this spreadsheet is to assist you with fulfilling orders for Pure Mitti.

2. Check the Shipping Status of an Order

Every once in awhile, you should check the status of all the orders we have shipped out recently. This will allow us to ensure that shipping is going smoothly, or catch any issues early if there are any. More on how to do this in the [Shipments](#shipments) section.

3. Update Inventory Stock

It is incredibly important to Pure Mitti that we maintain an accurate record of our inventory at all times. This means updating the inventory when a new shipment arrives, and doing regular inventory recounts. More on how to do this in the [Inventory](#inventory) section.

4. Analysis

The Shipment Log tab is a record of all the shipments we have sent out starting in 2024. The benefit of having so much data on our shipments stored all in one place is that doing analysis is vastly easier. Using this data, we have created some charts in the Metrics tab to better understand the relationship between different metrics.

## Shipments

[Overview](#shipments-overview) - [How to Use It](#how-to-use-it) - [Shipment Statuses & Tracking](#shipment-statuses--tracking)

<p align='center'>
<img src='https://i.ibb.co/wrNThNr/Screenshot-2024-09-04-071636.png' alt='Screenshot of Shipments Tab'>
</p>

<p align="center">
 <em>Fig 1. An example image of what the Shipments tab could look like.</em>
</p>

The Shipments tab is a very powerful tool we use for sending out shipments and for checking on shipping status. Generally, you want to treat this tab as mostly _view-only_ with the exception of the **Notes** column and the **Items** column. Otherwise, you will interact with this page using the tools provided to you in the [Menu](#menu-items-reference).

<br>

### Shipments Overview

The Shipments Tab can be divided into 2 sections:

1. Incoming Orders
2. Outgoing Shipments

Orders that come from **Shopify**, **Faire**, and **PodFoods** will automatically be populated in the Incoming Orders section, and likewise will move to the Outgoing Shipments tab once shipped. **Etsy** has not yet been integrated.

**All other orders you must add and update manually.**

> _Note: Faire orders must be accepted before they will show up in the Incoming Orders section._

<br>
Once an order is detected as being delivered, it will automatically clear from the Shipments tab and will go to the Shipment Log where additional data about the shipment will be logged.

<br>

### How to Use It

<p align='center'>
<img src='https://i.ibb.co/18BkkSg/Screenshot-2024-09-04-074433.png' alt='Screenshot of Incoming Orders Section'>
</p>

<p align="center">
 <em>Fig 2. An example image of the Incoming Orders section</em>
</p>

The first thing you want to do when fulfilling orders is to check the **Incoming Orders** section. This will give you an overview of what orders you need to fulfill. **Etsy** orders will not appear here.

⚠️ **You must still manually check Faire for orders not yet accepted.**

> For these orders, add notes regarding any extras that were sent _(flyers, shelf toppers, sample soaps, etc.)_, and adjust the Items Ordered column if needed _(item changes, errors with the script, etc.)_.

As stated previously, these orders will automatically be moved to the Outgoing Shipments section and then to the Shipment Log.

<br>

---

<br>

Once you have fulfilled all of the orders that come from these portals, you may still have **manual orders** to fulfill. In order to add and and update these orders, you must utilize some of the [Menu Item](#menu-items-reference) functions.

> _Note: Manual Orders in this context will be defined as orders that are not inputted through a system, but rather asked for directly in-person on through email._

<p align='center'>
  <img src='https://i.ibb.co/vVf6bqn/Screenshot-2024-09-04-080246.png' alt='screenshot of menu items with arrows'>
</p>
<p align="center">
  <em>Fig 3. A screenshot of the Menu Items emphasizing the Manual Order section</em>
</p>
 
➕ **Manually Add New Order**
- Use this to add a manual order to the Incoming Orders section.

<br>

↪️ **Move Manual Order to Shipment**

- Once a manual order has been shipped out, use this to move the order to the Outgoing Shipments section.

<br>

➕ **Manually Add Shipment to Log**

- If a manual order was shipped out before it was added to the incoming orders section, use this to add it to the Outgoing Shipments section.
  <br>
  <br>

### Shipment Statuses & Tracking

Sometimes, you will use the Shipment tab to check the shipping status of the orders you have recently sent out. Here are the common shipment statuses you will find and what you should do about them.

🔵 **PRE_TRANSIT** or **UNKNOWN** or **CONFIRMED** or _not found_

- The package has not yet been scanned by the carrier.

- This usually changes within a day or two at most. If a shipment has this status for a few days and has been given to the carrier, copy the tracking number and check the status on the carrier website for more detailed information.
  > Even if a package was not scanned at its drop-off location, it still may be scanned at a later date as it travels and can still be delivered.

🟡 **TRANSIT**

- The package is en route to the customer.

- This is the most common tracking status you will see. Once a package has been scanned by the carrier its status will change to this up until when it gets delivered.
- Once a shipment has this status, an **ETA** may be added at the bottom of its notes if it's available. If it is a few days past the ETA date, copy the tracking number and check the status on the carrier website for more detailed information. The shipment might be delayed or sometimes even lost.

🟢 **DELIVERED**

- The package has successfully been delivered to the customer.

- Most of the time you won't see this status because the spreadsheet will check every hour for shipments of this status and move it to the Shipment Log tab. In the case that you do see this status, just give it some time and it will automatically go away.

<br>

---

<br>
Now here are some of the less common statuses and what they mean.

<br>

**OUT_FOR_DELIVERY**

- The package is out for delivery.

- This will most likely go away within a day and will be replaced with **DELIVERED** but may sometimes be replaced with **DELIVERY_ATTEMPTED**.

**DELIVERY_ATTEMPTED**

- The package had an unsuccessful delivery attempt and will make another attempt soon.

- This will likely go away within a few days once a successful delivery attempt is made. If this status remains, copy the tracking number and check the status on the carrier website for more detailed information.

<br>

## Shipment Tracker Script

[API Calls & Get New Orders](#api-calls--get-new-orders) - [Check If Shipped](#check-if-shipped) - [Check If Transit](#check-if-transit) - [Check If Delivered](#check-if-delivered)

Even if you aren't going to be interacting with the source code, it would still be beneficial to understand at a high level what is going on _"behind the scenes"_.

Major Sections:

- API Calls
- Get New Orders
- Check If Shipped
- Check If Transit
- Check if Delivered

<br>

**📌Each major section of the script is scheduled to run once every hour.📌**

### API Calls & Get New Orders

The first part of this script starts with making **API Calls** to the apps we use to retrieve all of our order data. This part is the most important because without this data there would be nothing to display in the spreadsheet.

> _Think of an API like a waiter at a restaurant.<br><br>You give the waiter your order, the waiter gives your order to the kitchen, and then once its done your waiter comes back with your order. It's the same process with an API.<br><br>You give the API your request (in this case we want data about our orders), the API gives that request to Shopify/PodFoods/Etsy's backend where that data is stored, and then the API gives us whatever the backend returns._

All of the API logic is stored in **Api Calls.gs** _(not uploaded to this repo for security reasons)_. The data retrieved from these calls are stored in separate sheets that are hidden by default. You actually find these sheets by clicking the "All Sheets" in the bottom left corner of the spreadsheet.

<br>

For **Shopify** and **PodFoods**, we split up the data that we retrieve from the API calls into two categories:

- **New Orders**: Still need to be fulfilled and will show up in the Incoming Orders section.

- **Shipped Orders**: Shipping label purchased and will show up in the Outgoing Shipments section.

> **Faire** orders are currently tracked through the **Shopify** API.

Once we have all of the data stored in the spreadsheet, the next main function that runs is **Get New Orders**. All it does is add new orders to the Incoming Orders section if they aren't already there. Any of the functions regarding API calls or getting new orders can be run manually using one of the [Menu Item](#menu-items-reference) functions.

<p align="center">
<img src="https://i.ibb.co/BKbVTRV/Screenshot-2024-09-07-091008.png" alt="Screenshot of Menu Items for Running Api Calls">
</p>

<p align="center">
  <em>Fig 5. Screenshot of Menu Items for Running Api Calls</em>
</p>

🟠 **Etsy**

- Not implemented yet

<br>

⚫ **Shippo**

- **Refresh Shippo Backend** - Refreshes data on all Shippo orders in the Outgoing Shipments section.

<br>

🟢 **Shopify**

- **Refresh Shopify Backend** - Refreshes data on all Shopify orders including Incoming Orders and Outgoing Shipments.
- **Update Shopify Incoming Orders** - Add any new orders to the Incoming Orders section.

<br>

🟣 **Pod Foods**

- **Refresh Pod Foods Backend** - Refreshes data on all Pod Foods orders including Incoming Orders and Outgoing Shipments.
- **Update Pod Foods Incoming Orders** - Add any new orders to the Incoming Orders section.

<br>

⟳ **Refresh Backend for All Apps**

- Refreshes data for all apps including Incoming Orders and Outgoing Shipments.

<br>

### Check If Shipped

Now that all of the new orders have been added, the next part of the script is **Check If Shipped**.

As the name suggests, this part of the script checks every order in the Incoming Orders section to see if it has shipped. The way it does this is by getting the order ID of the new order and searching for it in the list of shipped orders. If there is a match, then the order has been shipped and must be updated. If there is no match then it has not been shipped yet.

> If you want to manually run this part of the script you can use the following Menu Item function:<br>🚚 **Update All Outgoing Shipments**

<br>

### Check If Transit

Once an item has been shipped out, we can run the **Check If Transit** part of the script to update the ETA for all orders in the Outgoing Shipments section.

The ETA will be appended to the bottom of each order's notes that have the status of 🟡**TRANSIT**. If any updates are made to the ETA as the package is being shipped, the ETA in the spreadsheet will update accordingly. Until the carrier provides an ETA, the notes will remain unchanged.

⚠️ On occassion the ETA might display **"DELAYED"**, in which case you should copy the tracking number and check the status on the carrier website for more detailed information.

> If you want to manually run this part of the script you can use the following Menu Item function:<br>⏰ **Update ETA**

<br>

### Check If Delivered

As packages finally reach the customer, the final part of the script that cleans everything up is **Check If Delivered**.

This part of the script works by checking the status of all orders in the Outgoing Shipments section. Any orders that have a status of 🟢**DELIVERED** will be removed from the Shipments tab and added to the Shipment Log tab. Inside the Shipment Log, you can see the history of all orders we have sent out since **2024** along with additional data such as Order Number, Order Value, Shipping Cost, Address, and more.

> If you want to manually run this part of the script you can use the following Menu Item function:<br>📦 **Update All Delivered Shipments**

## Samples

> Note: Samples tab is not fully finished yet

<p align='center'>
<img src="https://i.ibb.co/bzVgx71/Screenshot-2024-09-07-111809.png" alt="Screenshot of the Add New Orders Menu Item Category">
</p>
<p align='center'>
  <em>Fig 6. Add New Orders Menu Item category</em>
</p>

To add an order to the samples tab, click on the **Add New Orders** Menu Item category and click:

➕ **New Sample Request**

- This will open up a dialog where you can input the information about the order _(Name, Date, Address, etc.)_ and then select which items you would like to add to the sample request. Once you click submit, a new entry in the Samples tab will be added.

<br>

> Eventually there will be functionality for marking the an order as fulfilled and adding tracking information to it.

## Inventory

[The Inventory Entry Editor](#the-inventory-entry-editor)

<p align='center'>
  <img src="https://i.ibb.co/L9k21b4/Screenshot-2024-09-08-133402.png" alt="Screenshot-2024-09-08-133402" border="0">
</p>

<p align='center'>
  <em>Fig 7. A screenshot of the In-Stock Inventory section</em>
</p>

> Note: Treat the numbers shown here as **read-only**. The more you manually edit on this side, the more likely it is for mistakes to occur.

The Inventory tab is the home for all things related to maintaining an accurate inventory count. Here you can find the current state of our inventory as well as a user interface for logging all inventory that comes and goes. This user interface will be called the **Inventory Entry Editor** and will be covered in the following section.

<br>

Before covering the Entry Editor though, there are two Menu Item functions that are used for the Inventory tab.

<p align="center">
<img src="https://i.ibb.co/mJ2sRc8/inventory-functions.png" alt="menu item functions for the inventory tab">
</p>
<p align="center">
  <em>Fig 8. Menu Item Functions for the Inventory Tab</em>
</p>

<br>

🛍️ **Move Bags from Storage to Floor**

- Opens up a dialog where you select which type of bag you want to update, and then you input how many bags you are moving from the storage to the floor. Use this function whenever you take bags from storage and bring them down to the floor.

<br>

🫧 **Add New Soap Month**

- Opens up a date picker dialog. When a new shipment of soaps arrive, use this function and input the date of the shipment's arrival to add a new soap batch month to the inventory count. You can then record the quantity of soaps that have been ordered in this shipment in the Inventory Entry Editor under the new date.

<br>

### The Inventory Entry Editor

The user interface that is used to log what inventory is coming in and out is called the **Inventory Entry Editor**. You can see the current entry being edited on the right side of the Inventory Tab.

> _The term "Entry" refers to a list of items that represent the movement of inventory on a particular day._<br><br>_When the Create New Entry section is empty, you may click **EDIT** to start working on a new entry. The items that appear in this section are part of the current entry. Once the details have been finalized, click **EXPORT** to push the entry to the log and update the inventory count. That entry may no longer be edited, and you may click **EDIT** to start a new entry._<br><br>_Each entry may have a maximum of 11 items at the time of writing_.

<br>

<p align='center'>
<img src="https://i.ibb.co/WfZSyK2/Screenshot-2024-09-08-142043.png" alt="Screenshot of a Sample Inventory Entry" width='500'>
</p>
<p align="center">
  <em>Fig 9. A Sample Inventory Entry</em>
</p>

What is displayed on the spreadsheet in Fig. 9 is a sample inventory entry created using the Entry Editor. In this format you may make slight adjustments to the entries, but removing or adding items must be done with the Entry Editor.

What can be adjusted outside of the Entry Editor?

- **Quantity**: Overwrite the value with the desired value. Input a negative value (red) to indicate that inventory is being sent out, and input and positive value (green) to indicate that new inventory has arrived.

- **Unit**: Click the arrow to open up a dropdown menu. You may select either a single unit or a case of that item. _(See [Case Pack Reference](#case-pack-reference) for how many units is in a case for each item.)_

- **Item**: Click the arrow to open up a dropdown menu. You may only select between different variations of that item type _(other soaps, bags, dishbars, and hair products)_. To change the item to a different type, open the Inventory Entry Editor, delete the item, and then add the desired item.

- **Month**- FOR SOAPS ONLY. Click the arrow to open up a dropdown menu. You may select any of the available soap month batches. Please reference the inventory count displayed on the left side of the Inventory Tab when selecting which soap month.

<br>

---

<br>

To open the Inventory Entry Editor, click on where it says **EDIT** (look at Fig. 9 for reference) and the Editor dialog will appear. After loading briefly, you will be met with a screen pictured below.

<p align='center'>
<img src="https://i.ibb.co/xYnvGC3/image.png" alt="Screenshot of The Inventory Entry Editor in Use" width='500'>
</p>

<p align="center">
  <em>Fig 10. The Inventory Entry Editor in Use</em>
</p>

If no items were previously added to this entry, the box labelled as **Item Entries** in Fig. 10 would be empty. Any items that were previously added to this entry and shown on the spreadsheet will be displayed here.

In order to add an item entry, you must follow these steps:

1. Click on the name of the item you wish to add to this entry.

2. Select the quantity. Input a negative value (red) to indicate that inventory is being sent out, and input and positive value (green) to indicate that new inventory has arrived.
3. Select the unit. You may select either a single unit or a case of that item. _(See [Case Pack Reference](#case-pack-reference) for how many units is in a case for each item)_
4. FOR SOAPS ONLY. Select the month. A dropdown of all the soap batch months with the corresponding number of soaps in stock will appear to the right.

> _Note: To remove an item, hover over the item you wish to remove. It will turn red, and if you click on it you will remove it._

## Menu Items Reference

[Case Pack Reference](#case-pack-reference)

<p align='center'>
  <img src="https://i.ibb.co/7bFk9R9/Screenshot-2024-09-04-080246.png" alt="screenshot of menu items with arrows">
</p>
<p align="center">
  <em>Fig 11. A screenshot of the Menu Items</em>
</p>

🟠 **Etsy**

- Not implemented yet

<br>

⚫ **Shippo**

- **Refresh Shippo Backend** - Refreshes data on all Shippo orders in the Outgoing Shipments section.

<br>

🟢 **Shopify**

- **Refresh Shopify Backend** - Refreshes data on all Shopify orders including Incoming Orders and Outgoing Shipments.
- **Update Shopify Incoming Orders** - Add any new orders to the Incoming Orders section.

<br>

🟣 **Pod Foods**

- **Refresh Pod Foods Backend** - Refreshes data on all Pod Foods orders including Incoming Orders and Outgoing Shipments.
- **Update Pod Foods Incoming Orders** - Add any new orders to the Incoming Orders section.

<br>

⟳ **Refresh Backend for All Apps**

- Refreshes data for all apps including Incoming Orders and Outgoing Shipments.

<br>
<br>

---

<br>

🚚 **Update All Outgoing Shipments**

- Checks every order in the Incoming Orders section to see if it has shipped. If an order is detected to be shipped, it will be move it to the Outgoing Shipments section.

<br>

⏰ **Update ETA**

- Updates the ETA for all orders in the Outgoing Shipments section. The ETA will be appended to the bottom of each order's notes that have the status of 🟡**TRANSIT**.

<br>

📦 **Update All Delivered Shipments**

- Checks all orders in the Outgoing Shipments section that have a status of 🟢**DELIVERED** will be removed from the Shipments tab and added to the Shipment Log tab

<br>
<br>

---

<br>

➕ **Manually Add New Order**

- Use this to add a manual order to the Incoming Orders section.

<br>

↪️ **Move Manual Order to Shipment**

- Once a manual order has been shipped out, use this to move the order to the Outgoing Shipments section.

<br>

➕ **Manually Add Shipment to Log**

- If a manual order was shipped out before it was added to the incoming orders section, use this to add it to the Outgoing Shipments section.

<br>
<br>

---

<br>

🛍️ **Move Bags from Storage to Floor**

- Opens up a dialog where you select which type of bag you want to update, and then you input how many bags you are moving from the storage to the floor. Use this function whenever you take bags from storage and bring them down to the floor.

<br>

🫧 **Add New Soap Month**

- Opens up a date picker dialog. When a new shipment of soaps arrive, use this function and input the date of the shipment's arrival to add a new soap batch month to the inventory count. You can then record the quantity of soaps that have been ordered in this shipment in the Inventory Entry Editor under the new date.

<br>
<br>

---

### Add New Orders Menu

➕ **New Sample Request**

- This will open up a dialog where you can input the information about the order _(Name, Date, Address, etc.)_ and then select which items you would like to add to the sample request. Once you click submit, a new entry in the Samples tab will be added.

<br>
<br>

### Case Pack Reference

Depending on the item type, a "case pack" will refer to a specific quantity typically used for wholesale orders. Listed below is a reference for how many items are in a case per item type.

Per Case:

- **Soaps**: 10 soaps
- **Dishbars**: 10 dishbars
- **Bags**: 12 bags
- **Hair Products**: 6 jars
