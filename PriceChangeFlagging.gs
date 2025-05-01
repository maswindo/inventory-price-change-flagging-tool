function flagInvoicePriceChanges() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const invoiceSheet = ss.getSheetByName('Invoice Input'); // Active invoice
  const priceHistorySheet = ss.getSheetByName('Invoice Line Items'); // Historical prices

  const invoiceData = invoiceSheet.getDataRange().getValues();
  const priceHistoryData = priceHistorySheet.getDataRange().getValues();

  // Build product -> last price map from Invoice Line Items
  const priceMap = {};
  for (let i = 1; i < priceHistoryData.length; i++) {
    const product = priceHistoryData[i][0];
    const priceStr = priceHistoryData[i][2];
    if (!product || !priceStr) continue;

    const price = parseFloat(priceStr.toString().replace('$',''));
    if (!priceMap[product]) {
      priceMap[product] = price;
    }
  }

  // Find header row (where "Product" and "Price per Unit" are listed)
  let headerRow = -1;
  for (let i = 0; i < invoiceData.length; i++) {
    if (invoiceData[i][0] === "Product" && invoiceData[i][2] === "Price per Unit") {
      headerRow = i;
      break;
    }
  }

  if (headerRow === -1) {
    Logger.log("No header row found. Exiting.");
    return;
  }

  // Add "Price Change Status" header in column E (next to Price per Unit)
  invoiceSheet.getRange(headerRow + 1, 5).setValue("Price Change Status");

  // Go through invoice lines
  for (let i = headerRow + 1; i < invoiceData.length; i++) {
    const row = invoiceData[i];
    const product = row[0];
    const priceStr = row[2];

    if (!product || !priceStr) continue;

    const currentPrice = parseFloat(priceStr.toString().replace('$',''));
    const lastPrice = priceMap[product];
    let status = "";

    if (lastPrice === undefined) {
      status = "🆕 New Product";
    } else if (currentPrice > lastPrice) {
      status = "🔺 Increased";
    } else if (currentPrice < lastPrice) {
      status = "🔻 Decreased";
    } else {
      status = "✅ Same";
    }

    // Write status to column E
    invoiceSheet.getRange(i + 1, 5).setValue(status);
  }

  SpreadsheetApp.flush();
}
