from flask import Flask, request
from flask_socketio import SocketIO, emit, join_room , send
from gaze.convImage import showImage
import gaze.tracking as tracking
from identification.train import train_model
import base64
from PIL import Image
import cv2
import numpy as np
import io , os
import asyncio
# from multiprocessing import Process
import requests , json
from dotenv import load_dotenv
from identification.main import detect

COUNT = 0
load_dotenv()

app = Flask(__name__)
app.secret_key = 'random secret key!'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/', methods=['GET'])
def index():
    print('Called')
    url = "http://{}:{}/get_data_stream".format(os.environ.get("SERVER_BASE_URL") , os.environ.get("SERVER_PORT"))
    x = requests.post(url , data = json.dumps({'abc' :'abcd'}) , headers = {'Content-Type': 'application/json'})
    print(x)
    return "..."

@socketio.on('connect')
def connect(data):
    print('Connected')

@socketio.on('join')
def join(message):
    username = message['username']
    room = message['room']
    join_room(room)
    print('RoomEvent: {} has joined the room {}\n'.format(username, room))
    emit('ready', {username: username}, to=room, skip_sid=request.sid)


# GAZE
@socketio.on('data')
def transfer_data(message):
    print('Starting emit')
    username = message['username']
    room = message['room']
    data = message['data']


    imgdata = base64.b64decode(data)
    img = Image.open(io.BytesIO(imgdata))
    # opencv_img= cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGB)
    # cv2.imshow('a', opencv_img)
    img.save("a.jpg")
    # print('a')
    asyncio.run(tracking.main_func(np.array(img)))
    
    # with open('test.txt', 'r') as f:
    #     x = f.read()
    #     print(x)
    
    # if cv2.waitKey(100) & 0xFF == ord('q'):
    #     ...
    # print(data)
    # cv2.waitKey()

    print('Image from {}\n'.format(username))

    content = ''
    with open('test.txt', 'r') as f:
        content = f.read()

    payload = {'username' : username , 'room' : room , 'data' : content}

    headers = {'Content-Type': 'application/json'}
    url = "http://{}:{}/get_data_stream".format(os.environ.get("SERVER_BASE_URL") , os.environ.get("SERVER_PORT"))
    # requests.post(url , data = json.dumps(payload) , headers = headers)
    
    # emit('data', data, to=room, skip_sid=request.sid)

@socketio.on('register_user')
def register_user(payload):

    if os.path.isdir('D:/FYP-Project/flask'):
        print('1')
        os.chdir('D:/FYP-Project/flask')
    
    global COUNT
    data = payload['data']
    id = payload['id']

    imgdata = base64.b64decode(data)
    img = Image.open(io.BytesIO(imgdata))
    COUNT += 1

    if not os.path.exists(os.path.join(os.getcwd() ,  'identification' , 'images' , str(id))):
        os.mkdir(os.path.join(os.getcwd() , 'identification' , 'images' , str(id)))

    if os.path.isdir(os.path.join(os.getcwd() , 'identification' , 'images' , str(id))):
        print('1')
        os.chdir(os.path.join(os.getcwd() , 'identification' , 'images' , str(id)))

    print(os.getcwd())
    img.save('{}.jpg'.format(str(COUNT)))

    if COUNT == 29:
        COUNT = 0
        print("MODEL RESULT " ,train_model())
        socketio.stop()





# IDENTIFICATION
@socketio.on('identification')
def get_identification(payload):

    if os.path.isdir('D:/FYP-Project/flask'):
        os.chdir('D:/FYP-Project/flask')
    
    data = payload['data']
    id = payload['id']

    imgdata = base64.b64decode(data)
    img = Image.open(io.BytesIO(imgdata))
    print("KHIZPUR")
    result = asyncio.run(detect(np.array(img)))
    print("KHIZPUR 2 number")
    emit('SEND_LIVE_STREAM' , result)

@socketio.on_error_default
def default_error_handler(e):
    print("Error: {}".format(e))
    socketio.stop()

if __name__ == '__main__':
    print('SERVER STARTED')
    socketio.run(app, host="0.0.0.0", port=9000)