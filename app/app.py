from flask import Flask
from flask import render_template


app = Flask(__name__)

@app.route('/')
def index():
   return render_template("index(prototype_1).html")

@app.route('/second')
def second():
   return render_template("index_prototype_2.html")

if __name__ == "__main__":
    app.run(debug=True) 