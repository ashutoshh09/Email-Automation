/**
* Creates a Google Doc and sends an email to the current user with a link to the doc.
*/
function createAndSendDocument() {
 try {
   var htmlBody = HtmlService.createTemplateFromFile('body');
   var previousMonth = (function() {
   var d = new Date();
   d.setMonth(d.getMonth() - 1);
   var getLastMonth = Utilities.formatDate(d,Session.getScriptTimeZone(),"MMM");
   return getLastMonth;
   })();
   var getYear = (function() {
   var d = new Date();
   d.setMonth(d.getMonth() - 1);
   var month = Utilities.formatDate(d,Session.getScriptTimeZone(),"MM");
   if( month == '12'){
         d.setFullYear(d.getFullYear()-1);
         var getLastyear = Utilities.formatDate(d,Session.getScriptTimeZone(),"yyyy");
        
   }else{
     var getLastyear = Utilities.formatDate(d,Session.getScriptTimeZone(),"yyyy");
    
   }
   return getLastyear;
   })();


   htmlBody.month = previousMonth;
   htmlBody.year = getYear;
   // Get the name of the document to use as an email subject line.
   const subject = 'Review: Deployments Programs Overview (' + previousMonth  + " " +getYear +")";
   var email_html = htmlBody.evaluate().getContent();
   var aliases = GmailApp.getAliases();


   const body = email_html;
   // list down the email address
   const emailList=["ashutoshm.nitt@gmail.com"]
   // cc mail
   var cc = 'ashutsohm.nitt@gmail.com'
  


   const emailLength=emailList.length;
   for (m=0;m<emailLength;m++){
   const emailStr = emailList[m];
   //Send the email:
   GmailApp.sendEmail(emailStr,subject,email_html,{from: aliases[0], htmlBody: email_html,cc:cc});
 }
   // // Send yourself an email with a link to the document.
   // GmailApp.sendEmail(email, subject, body);
 } catch (err) {
   // TODO (developer) - Handle exception
   console.log('Failed with error %s', err.message);
 }
}
