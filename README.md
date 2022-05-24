# Auto-push-gmail-to-telegram-channel-or-group
    Call gmail API and connect telegram bot  

for example, we can receive tradeview alert to telegram channel.  
from gmail  
![image](https://raw.githubusercontent.com/umzr/Auto-push-gmail-to-telegram-channel-or-group/main/src/image/tradingview_gmail.png?token=GHSAT0AAAAAABUVO6VDXDI6YPZF45AWOBXOYUMVV3Q)

to telegram  
![image](https://raw.githubusercontent.com/umzr/Auto-push-gmail-to-telegram-channel-or-group/main/src/image/tradingview_notice.png?token=GHSAT0AAAAAABUVO6VDCSS3W7C6ANNOQ726YUMVTSA)

# How to do?

1) goto [@BotFather](https://t.me/BotFather)  create new bot
2) copy my script to [google script](https://script.google.com/).  
3) plate `TelegramBotToken` and `clientID` to my script
4) set Webhook https://api.telegram.org/bot<`TelegramBotToken`>/setWebhook?url=<`Current web app URL:`>
5) set timmer to Triggers the google web app
6) finish
