function createButtonInCell() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cells = sheet.getRange("E2:E"); // Change to the desired cell address

  // Create a data validation rule
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Send Mail"])
    .setAllowInvalid(false)
    .build();

  // Apply the rule to the range
  cells.setDataValidation(rule);
}
