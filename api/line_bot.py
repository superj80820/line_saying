
# coding: utf-8

# In[59]:


import string
import random
import sqlite3 as sqlite
from flask import Flask, request, abort

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage,
)

app = Flask(__name__)

line_bot_api = LineBotApi('D9I+Oxtoll926dCqHX3bnx6fhiAqKt28n/PQYmaeGjsmG3Uq+W+tspiRQaAW6AZTQKpZuvi9VAFFpL8+EBhExS1U/zjqRCoVF2lpDwFgDvf6k9bOrlgB8fEcBJCgTd9g41oQ7iTMb3o0t2qPddQskgdB04t89/1O/w1cDnyilFU=')
handler = WebhookHandler('e840717929fb3e363919b0b31b86f056')


# In[ ]:


@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)

    return 'OK'

@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    if event.message.text=='meeting!':
        meet_id=''.join(random.choice(string.digits) for x in range(5))
        
        conn = sqlite.connect('create_check.db')
        c = conn.cursor()
        c.execute("INSERT INTO meet_check"+"(api_request,user_id) VALUES ('"+meet_id+"','"+event.source.user_id+"')")
        conn.commit()
        conn.close()
        
        line_bot_api.reply_message(
                event.reply_token,
                TextSendMessage(text='已創建meeting~代碼是：\n%s'%(meet_id)))
            
@app.route('/create_meet', methods=['POST'])
def create_meet():
    web_id=request.get_json()['web_id']
    conn = sqlite.connect('create_check.db')
    c = conn.cursor()
    ans=c.execute("SELECT * FROM meet_check WHERE api_request='%s'" %(web_id))
    if ans != []:
        sent_id=list(ans)[0][2]
        c.execute("UPDATE meet_check SET web_pass ='pass' WHERE api_request ='%s'"%(web_id))
        line_bot_api.push_message(sent_id, TextSendMessage(text='已驗證成功~'))
        conn.commit()
        conn.close()
        return "create done"
    else:
        conn.commit()
        conn.close()
        return "create fail"

if __name__ == "__main__":
    app.run()

