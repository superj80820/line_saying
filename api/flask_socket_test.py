from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit, send

app = Flask(__name__, template_folder='./')
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app)

@app.route('/callback')
def callback(address):
    sid = get_sid_from_address(address)
    socketio.send('payment seen on blockchain', room=sid)

# @socketio.on('address')
# def socketlisten(address):
    

@socketio.on('client_event')
def client_msg(msg):
    associate_address_with_sid(msg, request.sid)
    emit('server_response', {'data': msg['data']})
    
@socketio.on('connect_event')
def connected_msg(msg):
    emit('server_response', {'data': msg['data']})

if __name__ == '__main__':
    socketio.run(app)