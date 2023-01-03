import face_recognition
from . import improve 
import pickle
from time import sleep
import cv2
import os

async def detect(fr):

    if os.path.isdir('D:/FYP-Project/flask/identification'):
        os.chdir('D:/FYP-Project/flask/identification')
    
    cascPathface = os.path.dirname(
    cv2.__file__) + "/data/haarcascade_frontalface_alt2.xml"

    faceCascade = cv2.CascadeClassifier(cascPathface)



    data = pickle.loads(open('face_enc', "rb").read())


    print("Streaming started")
    # video_capture = cv2.VideoCapture(0)

    # ret, fr = video_capture.read()
    gray = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY)

    gray = improve.adjust_dark_spots(gray)
    gray = improve.adjust_brightness(gray)

    faces = faceCascade.detectMultiScale(gray,scaleFactor=1.1, minNeighbors=6,minSize=(160, 160), flags=cv2.CASCADE_SCALE_IMAGE)

    rgb = cv2.cvtColor(fr, cv2.COLOR_BGR2RGB)

    encodings = face_recognition.face_encodings(rgb)
    names = []

    #sleep(1)
    
    for encoding in encodings:

        matches = face_recognition.compare_faces(data["encodings"], encoding)
    
        name = "Unknown"
        
        if True in matches:
        
            # print(matches)
            matchedIdxs = [i for (i, b) in enumerate(matches) if b]
            counts = {}
            
            # print(matchedIdxs)
            for i in matchedIdxs:
                
                name = data["name"][i]
                counts[name] = counts.get(name, 0) + 1

            name = max(counts, key=counts.get)

        names.append(name)
    
        for ((x, y, w, h), name) in zip(faces, names):
            cv2.rectangle(fr, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(fr, name, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2)

        # with open("test.txt", "r") as file:
        #     lines = [line.rstrip() for line in file]
        # file.close()

        # with open("test.txt", "a") as file:
        #     for obj in detections:
        #         if obj not in lines:
        #             file.write(obj + '\n')
        with open("test.txt","w") as f:
            f.write(f"Candidate ID : {name}")
        f.close

        # cv2.imshow("Detector", fr)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()
