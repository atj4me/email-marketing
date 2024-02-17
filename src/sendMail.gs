function onEdit(e) {
    // Triggered when a cell is edited
    var sheet = e.source.getActiveSheet();
    var range = e.range;

    if (sheet.getName() === "Sheet1" && range.getColumn() === 5) {
        // Check if the edited cell is in column E (5)
        var value = range.getValue();
        if (value === "Send Mail") {
            // Perform actions when "Yes" is selected (e.g., reset to "No")

            var row = range.getRow();

            // Update the corresponding cell in Column I
            var columnI = sheet.getRange('I' + row);

            // Get data from the sheet
            const recipientEmail = sheet.getRange('D' + row).getValue(); // Change to the desired cell address
            const subject = sheet.getRange('G' + row).getValue();
            let emailBody = sheet.getRange('H' + row).getValue();

            // Replace #Name with the actual name from cell B
            const name = sheet.getRange('B2').getValue();
            emailBody = emailBody.replace('#Name', name);

            // Validate recipient email (you can add more validation if needed)
            if (!isValidEmail(recipientEmail)) {
                showMessage(columnI,
                    'The email is invalid!        ',
                    'error');

                range.setValue("");
                return;
            }

            if (!subject) {
                showMessage(columnI,
                    'Please enter a valid Subject!        ',
                    'error');
                range.setValue("");
                return;
            }


            if (!emailBody) {

                showMessage(columnI,
                    'Please enter a valid Body!        ',
                    'error');
                range.setValue("");
                return;
            }


            if (!name) {
                showMessage(columnI,
                    'Please enter a valid Name!        ',
                    'error');
    
                range.setValue("");
                return;
            }

            /**
             * Function to Send Email
             */
            sendEmail(recipientEmail, subject, emailBody);
            
            // Resize the column width to fit content
            columnI.setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);

            showMessage(columnI, 
                'Mail has been Sent Successfully to ' + recipientEmail + '!  with the following content \n\r      ' + emailBody,
                'success');


            sheet.autoResizeColumn(9); // Adjust the column index if needed


            range.setValue("");
        }
    }
}

// Validate email address
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(Cell, msg, type ){
    Cell.setValue('Please enter a valid Name!        ');
    // Apply formatting to highlight the cell
    Cell.setFontWeight('bold'); // Make the text bold
    Cell.setBackground('#FFFF00'); // Set a yellow background color

    if ( type == 'error') {
        columnI.setFontColor('red'); // Change font color to red
    }
    else if (type == 'success') {
        Cell.setFontColor('green'); // Change font color to red
    }
}

function sendEmail(to, subject, body) {
    // Send the email
               MailApp.sendEmail({
                   to: "thampiajit@gmail.com",
                   subject: "Test Email",
                   body: "Test Message",
               });
   }