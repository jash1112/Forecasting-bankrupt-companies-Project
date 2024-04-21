from flask import Flask, jsonify, render_template, request
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker, Session, scoped_session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import MetaData
from flask import Flask, request, jsonify
from keras.models import load_model
from sqlalchemy import Table

# Flask app setup
app = Flask(__name__)

# Database configuration
render_username = 'forecating_companies_future_user'
render_password = 'qRvkrYzSYuo6TvDWAh8SMcQokhT5pYyb'
render_host = 'dpg-cog4tdmv3ddc73e67q00-a.ohio-postgres.render.com'
database = 'forecating_companies_future'
engine = create_engine(f"postgresql+psycopg2://{render_username}:{render_password}@{render_host}:5432/{database}")

# Create a MetaData object
metadata = MetaData()

# Reflect the tables
user_table = Table(render_username, metadata, autoload=True, autoload_with=engine)

# Use a scoped session to interact with the database
with engine.connect() as connection:
    query = user_table.select()
    result = connection.execute(query)

    # Fetch all rows from the result
    rows = result.fetchall()

    # Print the fetched rows
    for row in rows:
        print(row)

# def fetch_data_from_database(table):
#     with Session() as session:
#         try:
#             query = session.query(table)
#             print(f"Executing SQL: {query}")  # This will show the raw SQL query being executed
#             result = query.all()
#             print(f"Query Results: {result}")  # This will show the results fetched from the database
#             if not result:
#                 print("No data returned from query.")
#             data = [row.__dict__ for row in result]
#             for item in data:
#                 item.pop('_sa_instance_state', None)
#             return data
#         except Exception as e:
#             print(f"Error fetching data from database: {e}")
#             return []
        

# # Load the trained model
# model = load_model("Forecasting_bankrupt_companies.h5")
# @app.route("/predict", methods=["POST"])
# def predict():
#     # Get input data from request
#     data = request.json
#     # Make prediction using the loaded model
#     prediction = model.predict([data["input"]])
#     # Return prediction as JSON response
#     return jsonify({"prediction": prediction.tolist()})
        
# @app.route('/api/data')
# def get_company_data():
#     # Fetch data from the database
#     company_data = fetch_data_from_database(company_data_table)
    
#     # Log the data to the console before returning it
#     print("Data to be returned:", company_data)

#     # Return the data as JSON
#     if not company_data:
#         return jsonify({"error": "No data found"}), 404
#     return jsonify(company_data)


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
