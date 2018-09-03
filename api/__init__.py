
# coding: utf-8
#圖片新增的排序是否為最新 須測試(應該是正常)
#vote選項請勿使用 , 不然可能會錯誤
#目前傳送圖片的功能只有針對jpg

import string
import json
import re
import random
import time
import ast
import requests
import pandas
import sqlite3 as sqlite
from flask import Flask, request, abort, jsonify
from flask_cors import CORS

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage, ImageMessage, VideoMessage, AudioMessage, PostbackEvent
)

app = Flask(__name__)
CORS(app)

line_token = 'D9I+Oxtoll926dCqHX3bnx6fhiAqKt28n/PQYmaeGjsmG3Uq+W+tspiRQaAW6AZTQKpZuvi9VAFFpL8+EBhExS1U/zjqRCoVF2lpDwFgDvf6k9bOrlgB8fEcBJCgTd9g41oQ7iTMb3o0t2qPddQskgdB04t89/1O/w1cDnyilFU='
line_bot_api = LineBotApi(line_token)
handler = WebhookHandler('e840717929fb3e363919b0b31b86f056')
FileRout=''
#/var/www/line_saying/api/

def USER_GET_MEET_ID(user_id):
    conn = sqlite.connect('%sdata/db/create_check.db'%(FileRout))
    c = conn.cursor()
    meet_id = c.execute('SELECT meet FROM user_in_where WHERE id ="%s"'%(user_id))
    meet_id = meet_id.fetchall()[0][0]
    conn.commit()
    conn.close()
    return meet_id

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
        invite_id=''.join(random.choice(string.digits) for x in range(5))

        conn = sqlite.connect('%sdata/db/create_check.db'%(FileRout))
        c = conn.cursor()
        c.execute('INSERT INTO meet_check (api_request,user_id,invite_id) VALUES ("%s","%s","%s")'%(meet_id,event.source.user_id,invite_id))
        conn.commit()
        conn.close()
        
        line_bot_api.reply_message(
                event.reply_token,
                TextSendMessage(text='已創建meeting~代碼是：\n%s'%(meet_id)))
    elif re.match('[0-9]{5}$', event.message.text) != None:
        invite_id = re.match('[0-9]{5}$', event.message.text).group(0)
        
        conn = sqlite.connect('%sdata/db/create_check.db'%(FileRout))
        c = conn.cursor()
        api_request = c.execute('SELECT api_request FROM meet_check WHERE web_pass ="pass" AND invite_id ="%s"'%(invite_id))
        api_request = api_request.fetchall()
        if api_request != []:
            try:
                c.execute('INSERT INTO user_in_where (id,meet) VALUES ("%s","%s")'%(event.source.user_id,api_request[0][0]))
            except:
                c.execute('UPDATE user_in_where SET meet ="%s" WHERE id ="%s"'%(api_request[0][0],event.source.user_id))
            line_bot_api.reply_message(
                    event.reply_token,
                    TextSendMessage(text='已加入meeting囉~\n請問你要匿名還是公開姓名呢?'))
        else:
            line_bot_api.reply_message(
                event.reply_token,
                TextSendMessage(text='目前沒有這個meeting壓...'))
        conn.commit()
        conn.close()
    
    elif event.message.text == "/public_yes":
        user_name=line_bot_api.get_profile(event.source.user_id).display_name

        conn = sqlite.connect('%sdata/db/create_check.db'%(FileRout))
        c = conn.cursor()
        c.execute('UPDATE user_in_where SET public_name ="yes" WHERE id ="%s"'%(event.source.user_id))
        c.execute('UPDATE user_in_where SET user_name ="%s" WHERE id ="%s"'%(user_name,event.source.user_id))
        line_bot_api.reply_message(
                event.reply_token,
                TextSendMessage(text='已公開~'))
        conn.commit()
        conn.close()

    elif event.message.text == "/public_no":
        user_name=line_bot_api.get_profile(event.source.user_id).display_name

        conn = sqlite.connect('%sdata/db/create_check.db'%(FileRout))
        c = conn.cursor()
        c.execute('UPDATE user_in_where SET public_name ="no" WHERE id ="%s"'%(event.source.user_id))
        c.execute('UPDATE user_in_where SET user_name ="%s" WHERE id ="%s"'%(user_name,event.source.user_id))
        line_bot_api.reply_message(
                event.reply_token,
                TextSendMessage(text='好~以匿名~'))
        conn.commit()
        conn.close()

    elif event.message.text[0] == '?':
        say=event.message.text[1:len(event.message.text)]

        conn = sqlite.connect('%sdata/db/create_check.db'%(FileRout))
        c = conn.cursor()
        public_name = c.execute('SELECT public_name FROM user_in_where WHERE id ="%s"'%(event.source.user_id))
        public_name =public_name.fetchall()[0][0]
        if public_name == 'yes':
            user_name = c.execute('SELECT user_name FROM user_in_where WHERE public_name ="yes" AND id ="%s"'%(event.source.user_id))
            user_name = user_name.fetchall()[0][0]
        elif public_name == 'no':
            user_name = '匿名'

        conn = sqlite.connect('%sdata/db/%s.db'%(FileRout,USER_GET_MEET_ID(event.source.user_id)))
        c = conn.cursor()
        c.execute('INSERT INTO user_say (name,id,say,timestamp) VALUES ("%s","%s","%s","%s")'%(user_name,event.source.user_id,say,str(event.timestamp)))
        conn.commit()
        conn.close()
        line_bot_api.reply_message(
                event.reply_token,
                TextSendMessage(text='收到留言!!\n如果要附加圖片~請直接傳圖喔'))

    elif event.message.text=='test':
        print(type(event.timestamp))
        print(event.timestamp)
        test=line_bot_api.get_profile(event.source.user_id).display_name
        print(test)
        headers = {'Content-Type':'application/json','Authorization':'Bearer %s'%(line_token)}
        payload = {
            'replyToken':event.reply_token,
            'messages':[{"type":"text","text":"May I help you?"}]
            }
        res=requests.post('https://api.line.me/v2/bot/message/reply',headers=headers,json=payload)
        # line_bot_api.reply_message(
        #         event.reply_token,
        #         TextSendMessage(text='已接收'))

@handler.add(MessageEvent, message=(ImageMessage))
def handle_content_message(event):
    message_content = line_bot_api.get_message_content(event.message.id)

    with open('%sdata/image/%s.jpg'%(FileRout,str(event.timestamp)), 'wb') as fd:
        for chunk in message_content.iter_content():
            fd.write(chunk)

    conn = sqlite.connect('%sdata/db/%s.db'%(FileRout,USER_GET_MEET_ID(event.source.user_id)))
    c = conn.cursor()
    get_all_timestamp=c.execute('SELECT timestamp FROM user_say WHERE id ="%s"'%(event.source.user_id)).fetchall()
    c.execute('UPDATE user_say SET image ="https://messfar.com/line_saying_data/%s.jpg" WHERE timestamp ="%s"'%(str(event.timestamp),get_all_timestamp[len(get_all_timestamp)-1][0]))
    conn.commit()
    conn.close()
    line_bot_api.reply_message(
            event.reply_token,
            TextSendMessage(text='收到圖片!!如果圖片要更換\n再傳一張就會覆蓋囉~'))

@handler.add(PostbackEvent)
def handle_postback(event):
    vote_dict = ast.literal_eval(event.postback.data)
    meet_id=USER_GET_MEET_ID(event.source.user_id)

    if vote_dict['type'] == 'vote': 
        conn = sqlite.connect('%sdata/db/%s.db'%(FileRout,meet_id))
        c = conn.cursor()
        user_id = str(c.execute('SELECT id FROM vote_%s'%(vote_dict['name'])).fetchall())
        is_vote = re.search('%s,'%(event.source.user_id),user_id)
        conn.commit()
        conn.close()

        if is_vote == None:
            conn = sqlite.connect('%sdata/db/%s.db'%(FileRout,meet_id))
            c = conn.cursor()
            if vote_dict['index'] == '1':
                vote_temp=int(c.execute('SELECT one FROM vote_%s'%(vote_dict['name'])).fetchall()[0][0])
                vote_temp+=1
                vote_temp = str(vote_temp)
                c.execute('UPDATE vote_%s SET one ="%s"'%(vote_dict['name'],vote_temp))
            elif vote_dict['index'] == '2':
                vote_temp=int(c.execute('SELECT two FROM vote_%s'%(vote_dict['name'])).fetchall()[0][0])
                vote_temp+=1
                vote_temp = str(vote_temp)
                c.execute('UPDATE vote_%s SET two ="%s"'%(vote_dict['name'],vote_temp))
            elif vote_dict['index'] == '3':
                vote_temp=int(c.execute('SELECT three FROM vote_%s'%(vote_dict['name'])).fetchall()[0][0])
                vote_temp+=1
                vote_temp = str(vote_temp)
                c.execute('UPDATE vote_%s SET three ="%s"'%(vote_dict['name'],vote_temp))
            elif vote_dict['index'] == '4':
                vote_temp=int(c.execute('SELECT four FROM vote_%s'%(vote_dict['name'])).fetchall()[0][0])
                vote_temp+=1
                vote_temp = str(vote_temp)
                c.execute('UPDATE vote_%s SET four ="%s"'%(vote_dict['name'],vote_temp))
            id_temp=c.execute('SELECT id FROM vote_%s'%(vote_dict['name'])).fetchall()[0][0]
            id_temp='%s,%s'%(event.source.user_id,id_temp)
            c.execute('UPDATE vote_%s SET id ="%s"'%(vote_dict['name'],id_temp))
            conn.commit()
            conn.close()

            line_bot_api.reply_message(
                event.reply_token, TextSendMessage(text='感謝你對\n%s\n投下寶貴的一票~'%(vote_dict['label'])))
        else:
            line_bot_api.reply_message(
                event.reply_token, TextSendMessage(text='你已經投票了呀呀呀!'))
            
@app.route('/create_meet', methods=['POST'])
def create_meet():
    def meet_data(invite_id,web_id,slide_key,meet_name):
        conn = sqlite.connect('%sdata/db/%s.db'%(FileRout,web_id))
        c = conn.cursor()
        data = 'name TEXT,id TEXT,say TEXT,timestamp TEXT,image TEXT'
        c.execute('CREATE TABLE info(meet_name TEXT,invite_id TEXT,web_id TEXT,slide_key TEXT)')
        c.execute('CREATE TABLE user_say(%s)'%(data))
        c.execute('CREATE TABLE vote_sort(sort INTEGER PRIMARY KEY AUTOINCREMENT,vote_id TEXT NOT NULL)')
        c.execute('INSERT INTO info (meet_name,invite_id,web_id,slide_key) VALUES ("%s","%s","%s","%s")'%(meet_name,invite_id,web_id,slide_key))
        conn.commit()
        conn.close()
    meet_name=request.get_json()['meet_name']
    web_id=request.get_json()['web_id']
    slide_link=request.get_json()['slide_link']

    res = requests.get('http://www.slideshare.net/api/oembed/2?url=%s&format=json'%(slide_link))
    res = json.loads(res.text)
    slide_key = res['html']
    slide_key = re.search('key/\w{14}',slide_key).group(0)
    slide_key = slide_key[4:len(slide_key)]

    conn = sqlite.connect('%sdata/db/create_check.db'%(FileRout))
    c = conn.cursor()
    try:
        ans=c.execute("SELECT * FROM meet_check WHERE api_request='%s'" %(web_id))
        if ans != []:
            sent_id=list(ans)[0][2]
            c.execute('UPDATE meet_check SET web_pass ="pass" WHERE api_request ="%s"'%(web_id))
            invite_id = c.execute('SELECT invite_id FROM meet_check WHERE api_request ="%s"'%(web_id))
            invite_id = invite_id.fetchall()[0][0]
            meet_data(invite_id,web_id,slide_key,meet_name)
            line_bot_api.push_message(sent_id, TextSendMessage(text='已驗證成功~\n邀請碼是%s'%(invite_id)))
            conn.commit()
            conn.close()

            ret={'invite_id':invite_id,"web_id":web_id,"slide_key":slide_key,"meet_name":meet_name}
            return jsonify(ret)
    except:
        None
    conn.commit()
    conn.close()
    return "create fail"

@app.route('/meet_info', methods=['GET'])
def meet_info():
    def get_info(meet_id,what):
        conn = sqlite.connect('%sdata/db/%s.db'%(FileRout,meet_id))
        c = conn.cursor()
        info = c.execute('SELECT %s FROM info'%(what))
        info = info.fetchall()[0][0]
        conn.commit()
        conn.close()
        return info

    meet_id=request.args.get('meet_id')
    ret={}
    ret['meet_name'] = get_info(meet_id,'meet_name') 
    ret['invite_id'] = get_info(meet_id,'invite_id') 
    ret['web_id'] = get_info(meet_id,'web_id') 
    ret['slide_key'] = get_info(meet_id,'slide_key') 

    return jsonify(ret)
    

@app.route('/vote', methods=['POST'])
def post_vote():
    meet_id=request.get_json()['meet_id']
    vote_data=request.get_json()['vote_data']
    vote_name = vote_data['template']['title']
    number_set=['one','two','three','four']
    
    conn = sqlite.connect('%sdata/db/%s.db'%(FileRout,meet_id))
    c = conn.cursor()
    data = 'id TEXT DEFAULT "",labels TEXT,'
    insert_data = ''
    for item in list(range(0,len(vote_data['template']['actions']))):
        data += '%s TEXT DEFAULT 0,'%(number_set[item])
        insert_data += '%s,'%(vote_data['template']['actions'][item]['label'])
        data_temp = vote_data['template']['actions'][item]['data']
        data_temp = data_temp[0:len(data_temp)-1]
        vote_data['template']['actions'][item]['data'] = "%s,'name':'%s'}"%(data_temp,vote_name)
    data = data[0:len(data)-1]
    c.execute('CREATE TABLE vote_%s(%s)'%(vote_name,data))
    c.execute('INSERT INTO vote_%s (labels) VALUES ("%s")'%(vote_name,insert_data))
    c.execute('INSERT INTO vote_sort (vote_id) VALUES ("%s")'%(vote_name))
    conn.commit()
    conn.close()
    
    conn = sqlite.connect('%sdata/db/create_check.db'%(FileRout))
    c = conn.cursor()
    user_id = c.execute('SELECT id FROM user_in_where WHERE meet ="%s"'%(meet_id))
    user_id = user_id.fetchall()
    
    for item in user_id:
        headers = {'Content-Type':'application/json','Authorization':'Bearer %s'%(line_token)}
        payload = {
            'to':item[0],
            'messages':[vote_data]
            }
        res=requests.post('https://api.line.me/v2/bot/message/push',headers=headers,json=payload)
    
    conn.commit()  
    conn.close()

    return 'ok'

@app.route('/say', methods=['POST'])
def say():
    say=request.get_json()['say']
    meet_id=request.get_json()['meet_id']
    
    conn = sqlite.connect('%sdata/db/create_check.db'%(FileRout))
    c = conn.cursor()
    user_id = c.execute('SELECT id FROM user_in_where WHERE meet ="%s"'%(meet_id))
    user_id = user_id.fetchall()
    
    for item in user_id:
        headers = {'Content-Type':'application/json','Authorization':'Bearer %s'%(line_token)}
        payload = {
            'to':item[0],
            'messages':[{"type":"text","text":"%s"%(say)}]
            }
        res=requests.post('https://api.line.me/v2/bot/message/push',headers=headers,json=payload)
    
    conn.commit()  
    conn.close()
 
    return 'ok'


@app.route('/sent_image', methods=['POST'])
def sent_image():
    meet_id = request.form['meet_id']
    image = request.files['image']
    timestamp = str(int(time.time()))

    image.save('%sdata/image/speech/%s.jpg'%(FileRout,timestamp))
    image_url = 'https://messfar.com/line_saying_data/speech/%s.jpg'%(timestamp)
    
    conn = sqlite.connect('%sdata/db/create_check.db'%(FileRout))
    c = conn.cursor()
    user_id = c.execute('SELECT id FROM user_in_where WHERE meet ="%s"'%(meet_id))
    user_id = user_id.fetchall()
    
    for item in user_id:
        headers = {'Content-Type':'application/json','Authorization':'Bearer %s'%(line_token)}
        payload = {
            'to':item[0],
            'messages':[{"type": "image","originalContentUrl": "%s"%(image_url),"previewImageUrl": "%s"%(image_url)}]
            }
        res=requests.post('https://api.line.me/v2/bot/message/push',headers=headers,json=payload)
    
    conn.commit()  
    conn.close()
 
    return 'ok'

@app.route('/user_say', methods=['GET'])
def user_say():
    meet_id=request.args.get('meet_id')
    
    conn = sqlite.connect('%sdata/db/%s.db'%(FileRout,meet_id))
    df = pandas.read_sql_query("SELECT * FROM user_say", conn)
    ret = df.to_dict(orient='records')

    conn.commit()  
    conn.close()
 
    return jsonify(ret)

@app.route('/vote', methods=['GET'])
def get_vote():
    def get_vote_name_list(meet_id):
        conn = sqlite.connect('%sdata/db/%s.db'%(FileRout,meet_id))
        c = conn.cursor()
        vote_name_list = c.execute('SELECT vote_id FROM vote_sort')
        vote_name_list = vote_name_list.fetchall()
        conn.commit()
        conn.close()
        return vote_name_list

    meet_id=request.args.get('meet_id')
    number_set=['one','two','three','four']
    vote_name_list=get_vote_name_list(meet_id)
    vote_list=[]
    
    for item in list(range(0,len(vote_name_list))):
        vote_name = vote_name_list[item][0]
        
        conn = sqlite.connect('%sdata/db/%s.db'%(FileRout,meet_id))
        c = conn.cursor()
        vote_labels = c.execute('SELECT labels FROM vote_%s'%(vote_name))
        vote_labels = vote_labels.fetchall()[0][0].split(',')
        vote_labels.pop()
        vote_list += [{'vote_name':'%s'%(vote_name),'vote_item':[]}]
        for item2 in list(range(0,len(vote_labels))):
            vote_count = c.execute('SELECT %s FROM vote_%s'%(number_set[item2],vote_name))
            vote_count = vote_count.fetchall()[0][0]
            vote_list[item]['vote_item']+=[{'label':vote_labels[item2],'vote_count':vote_count}]    
        conn.commit()
        conn.close()

    return jsonify(vote_list)

@app.route('/test', methods=['POST'])
def test():
    slide_link=request.get_json()['slide_link']
    res = requests.get('http://www.slideshare.net/api/oembed/2?url=%s&format=json'%(slide_link))
    res = json.loads(res.text)
    slide_key = res['html']
    slide_key = re.search('key/\w{14}',slide_key).group(0)
    slide_key = slide_key[4:len(slide_key)]

    return 'ok'

if __name__ == "__main__":
    app.run()

