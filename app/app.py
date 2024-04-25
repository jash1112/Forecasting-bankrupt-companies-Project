from flask import Flask, jsonify, render_template, request
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker, Session, scoped_session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import MetaData
from flask import Flask, request, jsonify
#from keras.models import load_model
from sqlalchemy import Table

# Flask app setup
app = Flask(__name__)

# Database configuration
render_username = 'companies_future_user'
render_password = 'EYzOpF6fPsSXqlhuU2zl5ynR7y1WT5qq'
render_host = 'dpg-cok3468l6cac73dt3dj0-a.oregon-postgres.render.com'
database = 'companies_future'
cxn_string = f"postgresql+psycopg2://{render_username}:{render_password}@{render_host}:5432/{database}"
engine = create_engine(cxn_string, echo=False)

# Create a MetaData object
metadata = MetaData()

# Bind the MetaData to the engine
metadata.bind = engine

# Reflect the tables
metadata.reflect(bind=engine)

# # Print the table names to verify
print(metadata.tables.keys())

# Access the reflected table
company_data_table = metadata.tables.get('Company_Data_reduce')
linear_regression_table = metadata.tables.get('Linear Regression')
# Function to fetch data from the database
def fetch_data_from_database(table):
    if table is not None:
        with engine.connect() as connection:
            query = table.select()
            result = connection.execute(query)
            rows = result.fetchall()
            # Fetch column names as strings
            column_names = [str(column) for column in result.keys()]
            data = {column:[row[i] for row in rows if row[i] is not None] for i, column in enumerate(column_names)}
            
    return data


# # Load the trained model
# model = load_model("Forecasting_bankrupt_companies.h5")
# @app.route("/predict", methods=["POST"])
# def predict():ta
#     # Get input data from request
#     data = request.json
#     # Make prediction using the loaded model
#     prediction = model.predict([data["input"]])
#     # Return prediction as JSON response
#     return jsonify({"prediction": prediction.tolist()})


@app.route('/api/data')
def api_data():
    company_data = fetch_data_from_database(company_data_table)
    # if not company_data:
    #     return jsonify({"error": "No data found"}), 404
    return jsonify(company_data)

@app.route('/api/linear/regression')
def api_linear():
    linear_table = fetch_data_from_database(linear_regression_table)
    
    return jsonify(linear_table)

# Static page routes
@app.route('/')
def index():
    return render_template("index_main.html")

@app.route('/dashboard.html')
def dashboard():
    return render_template('dashboard.html')

@app.route('/introduction.html')
def introduction():
    return render_template('introduction.html')

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
