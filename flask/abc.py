import os
print(os.getcwd())
if os.path.isdir(os.path.join(os.getcwd() , 'identification' , 'images')):
    print('sdas')
    os.chdir(os.path.join(os.getcwd() , 'identification' , 'images'))