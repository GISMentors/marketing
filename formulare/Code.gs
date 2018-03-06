/* Send Confirmation Email with Google Forms */
     
    function Initialize() {
     
    var triggers = ScriptApp.getProjectTriggers();
     
    for (var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
    }
     
    ScriptApp.newTrigger("SendConfirmationMail")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
     
    }
     
    function SendConfirmationMail(e) {
    try {
    var f, ss, cc, bcc, sendername, subject, columns;
    var message, value, textbody, sender, title;
    // This is your email address and you will be in the CC
    replyTo = "info@gismentors.cz";
    bcc = Session.getActiveUser().getEmail();
    // This will show up as the sender's name
    sendername = "GISMentors";

    ss = SpreadsheetApp.getActiveSheet();
      
    // This is the body of the auto-reply
    f = FormApp.getActiveForm();
    title = ss.getName();

    // Optional but change the following variable
    // to have a custom subject for Google Docs emails
    subject = "Potvrzení přihlášky na školení GISMentors " + title;

    message = "Dobrý den,<br>tímto potvrzujeme přijetí Vaší přihlášky na kurz GISMentors '" + 
    title + "'.<br>V následujicím kroku Vám budou sděleny další podrobnosti o školení a to " +
    "nejpozději 14 dní před konáním kurzu.<br><br>" +
    "Děkujeme za Vaši přízeň a těšíme se na viděnou. S pozdravem GISMentors.<br><br>";
    
    columns = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];
     
    // This is the submitter's email address
    sender = e.namedValues["Kontaktní e-mail"].toString();
     
    // Only include form values that are not blank
    for ( var keys in columns ) {
    var key = columns[keys];
    if ( e.namedValues[key] ) {
    message += key + ': '+ e.namedValues[key] + "<br />";
    }
    }
    textbody = message.replace("<br>", "\n");
     
    GmailApp.sendEmail(sender, subject, textbody,
                       {bcc: bcc, name: sendername, htmlBody: message, replyTo: replyTo});
    } catch (e) {
    Logger.log(e.toString());
    }
}
