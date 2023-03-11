from flask import Flask,render_template,jsonify,redirect,request,url_for
import json
import pandas as pd
app = Flask(__name__,static_folder='static')

@app.route('/schedule/<major>',methods=['POST'])
def hello(major):
    hours = ['08:00-09:05','09:15-10:20','10:30-11:35','11:45-12:50','','01:30-02:35','02:45-03:50','04:00-05:05','05:15-06:20','06:30-07:35','07:45-08:50']
    data = request.get_json()
    
    #hours = ['08:00','09:15','11:45','01:30','02:45','04:00','06:20']
    return render_template('schedule.html',hours=hours,sunday=swapKeyValue(data,'1'),monday=swapKeyValue(data,'2'),tuesday=swapKeyValue(data,'3'),wednesday=swapKeyValue(data,'4'),thursday=swapKeyValue(data,'5'),major=major)

@app.route('/',methods=['GET'])
def index():
   return render_template("choice.html")

@app.route('/',methods=['POST'])
def select():
    choice = request.form['major']
    return redirect(f'courses/{choice}')

@app.route('/courses/<major>')
def courses(major):
    data = pd.read_csv(f'{major}_combined.csv')
    data['course_code'] = data['course_code'].astype(str)
    data['course_gender'] = 'ذكر'
    data['course_hours'] = data['course_hours'].replace('ذكر','')
    jsoned_data = data.to_json(orient='records')
    parsed = json.loads(jsoned_data)
    json.dumps(parsed, indent=4) 
    return render_template('index.html',data = data ,major=major)

@app.route('/join')
def join():
    return render_template('joinus.html')
def swapKeyValue(json,day):
    swapped_obj = {}
    for key, value in json[day].items():
        for v in value:
            swapped_obj[v] = key
    return swapped_obj

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')



