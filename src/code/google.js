/*
Author: 風信子 t.me/TeleDele, umzr: github.com/umzr
用法: 將Line 13, Line 14, Line 18 數值更換
How to use: 
Create bot from the @botfather,
Change clientID, TelegramBotToken
and set Webhook

clientID is the group ID, you may check this information from  @ShowJsonBot <-- something like this. I haven't tried it.

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
        //similiar to the Gmail search
        var threads = GmailApp.search('is:unread subject:{快訊：}');
        //Read the unread email
        //for (var i = 0; i < threads.length; i++) {
        // array backward to make it mroe logically
        for (var i = threads.length - 1; i >= 0; i--) {
            var message = threads[i].getMessages();
            Logger.log(message[0].getSubject() + '\n' + message[0].getPlainBody());
            cleansingData = message[0].getPlainBody();
            //Catch message from the main subject
            if (message[0].getSubject() == "快訊：") {
                //Formatting - Cleaning the space
                // cleansingData = threads[i].getFirstMessageSubject()
                var outputString = splitter(cleansingData, 4096);
            }

            //array loop if gmail message string < 4096
            for (var j = 0; j < outputString.length; ++j) {
                var lastPage = outputString.length - 1
                var strLastPage = lastPage.toString()
                if (j === 0) {
                    Content = '●(' + 0 + '/' + strLastPage + ")" + outputString[j];
                } else {
                    Content = '◉(' + j.toString() + '/' + strLastPage + ')' + outputString[j];
                }

                pushTelegramBotMessage(Content);
                //push up every 2 sec, if you want
                //Utilities.sleep(2000);
                if (j === 0) {
                    threads[i].markRead();
                }
            }
            // Content = '●' + cleansingData;
            // pushTelegramBotMessage(Content);
            // threads[i].markRead();
        }
        //Check up every 15 sec
        Utilities.sleep(15000);
    }
}

//https://stackoverflow.com/questions/7624713/js-splitting-a-long-string-into-strings-with-char-limit-while-avoiding-splittin
//Splitter function
function splitter(str, l) {
    var strs = [];
    while (str.length > l) {
        var pos = str.substring(0, l).lastIndexOf(' ');
        pos = pos <= 0 ? l : pos;
        strs.push(str.substring(0, pos));
        var i = str.indexOf(' ', pos) + 1;
        if (i < pos || i > pos + l)
            i = pos;
        str = str.substring(i);
    }
    strs.push(str);
    return strs;
}

//傳送 Telegram 訊息給使用者
//Function to push message to Telegram Bot
function pushTelegramBotMessage(message) {
    var payload = {
        "method": "sendMessage",
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