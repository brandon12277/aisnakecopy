from flask import Flask, jsonify,request
import tensorflow as tf
from flask_cors import CORS
import joblib
import sklearn
import pandas as pd
import numpy as np
app = Flask(__name__)

CORS(app) 


model = tf.keras.models.load_model('snake_ai.h5')

scaler = joblib.load("scaler_object_2.pkl")
label = joblib.load("label_object_2.pkl")
one_hot = joblib.load("onehot_object_2.pkl")



@app.route('/snake/move', methods=['POST'])
def get_data():
    
         print(request.headers)
         data = request.json
         move = []
         snakeX = data.get('snakeX')
         snakeY = data.get('snakeY')
         foodX = data.get('foodX')
         foodY = data.get('foodY')
         direction_snake = data.get('direction_snake')
         direction_food = data.get('direction_food')

         move = [[snakeX,snakeY,foodX,foodY,direction_snake,direction_food]]
         move = pd.DataFrame(move, columns=['snake_x', 'snake_y', 'food_x','food_y','direction_snake','direction_food'])
         move = one_hot.transform(move)
         move = scaler.transform(move)

         prediction = model.predict(move)
         prediction = np.argmax(prediction)
         prediction = label.inverse_transform([prediction])
         response = jsonify(prediction[0]) 
         response.headers.add('Access-Control-Allow-Origin', '*')
         response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
         response.headers.add('Access-Control-Allow-Methods', 'POST')
         return response
   
#@app.after_request   
#def after_request(response):
 #   response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
 #   response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
 #   return response

if __name__ == '__main__':
    app.run(debug=True)
