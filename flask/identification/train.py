from imutils import paths
import face_recognition
import pickle
import cv2
import os
 

# name = input('Enter Name : ')
def train_model():

    if os.path.isdir('D:/FYP-Project/flask/identification'):
        os.chdir('D:/FYP-Project/flask/identification')
    
    imagePaths = list(paths.list_images('images'))
    print(imagePaths)
    data = {}
    encodings = []
    names = []

    if os.path.exists('face_enc'):
        data = pickle.loads(open('face_enc', "rb").read())

        encodings = data['encodings']
        names = data['name']


    for (i, imagePath) in enumerate(imagePaths):
        

        image = cv2.imread(imagePath)
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        root, name = os.path.dirname(imagePath).split('\\')

        print(name)

        boxes = face_recognition.face_locations(rgb,model='hog')
        img_encodings = face_recognition.face_encodings(rgb, boxes)
        
        for encoding in img_encodings:
            encodings.append(encoding)
            names.append(name)
        
    
    data = {'encodings' : encodings, 'name' : names}
    # data[name] = encodings

    with open('face_enc', 'wb') as fp:
        pickle.dump(data, fp)

    return "Success"

if __name__ == '__main__':
    train_model()