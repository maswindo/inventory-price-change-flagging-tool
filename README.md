# Invoice Price Change Flagging Tool

A Google Apps Script solution to automatically flag price changes on new invoices in Google Sheets.

This tool is designed to assist inventory and procurement teams by comparing incoming invoice prices against historical records. It outputs clear, easy-to-read flags showing if a product's price has increased, decreased, stayed the same, or if it's a new product.

## 🚀 Features

- **Automatic Price Comparison**
  - Compares each invoice item to the most recent price in historical invoice records.

- **Clear Price Change Flags**
  - 🔺 Increased → Price went up
  - 🔻 Decreased → Price went down
  - ✅ Same → Price stayed the same
  - 🆕 New Product → First recorded purchase

- **Easy to use**
  - Enter invoice as usual → run the script → view price flags immediately next to each product.

## 📌 Usage

1. Enter invoice data in the `Invoice Input` sheet (Product, Quantity, Price per Unit, UOM).
2. Run the `flagInvoicePriceChanges` Apps Script function.
3. Review flagged price statuses directly in the invoice sheet.
4. Post the invoice as normal.

## 📈 Future Roadmap

- UOM-aware price comparisons → normalize price per standardized unit
- Fully automatic flagging during invoice posting
- Slack or email notifications for significant price increases

## 💼 Real-World Use Case

This tool was built as part of a larger Inventory Management System to help streamline invoice processing and purchasing decisions at a growing service company. It supports smarter buying decisions and helps spot vendor price changes proactively.

## 📎 Technologies

- Google Apps Script
- Google Sheets
