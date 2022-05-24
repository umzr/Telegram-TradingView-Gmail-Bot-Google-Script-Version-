/*
Author: 風信子 t.me/TeleDele, umzr
用法: 將Line 13, Line 14, Line 18 數值更換
根據https://www.letswrite.tw/telegram-bot-gcp/
generate tg token

Workflow
1. Read unread email with tag
2. Send to bot
3. Mark as read
*/

/*
set Webhook
https://api.telegram.org/bot<TelegramBotToken>/setWebhook?url=<>
*/
var clientID = "<>" 

var TelegramBotToken = "<>";

var TelegramBotAPI = "https://api.telegram.org/bot" + TelegramBotToken + "/";

function searchUnreadEmail() {
  for (var loop3times = 0; loop3times <= 3; loop3times++) {
    // Find the unread email with filter 
    var threads = GmailApp.search('is:unread subject:{快訊：}');
    //Read the unread email
    //for (var i = 0; i < threads.length; i++) {
    for (var i = threads.length-1; i >= 0; i--) { // array backward to make it mroe logically
      var message = threads[i].getMessages();
      Logger.log(message[0].getSubject()+'\n'+message[0].getPlainBody());
      cleansingData = message[0].getPlainBody();
      
      if(message[0].getSubject() == "快訊："  ){
        //Formatting - Cleaning the space
        cleansingData = threads[i].getFirstMessageSubject()
      }
      
      Content = '●'+cleansingData;
      pushTelegramBotMessage(Content);
      threads[i].markRead();
    }
    //Check up every 15 sec
    Utilities.sleep(15000);
  }
}

//傳送 Telegram 訊息給使用者
function pushTelegramBotMessage(message) {
  var payload = {
    "method": "sendMessage",  //add this function
    "chat_id": clientID,
    "text": message,
  }
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };
  UrlFetchApp.fetch(TelegramBotAPI + "sendMessage", options);
}