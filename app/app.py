from flask import Flask, jsonify, render_template, request
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, scoped_session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import MetaData

# Flask app setup
app = Flask(__name__)

# Database configuration
render_username = 'forecating_companies_future_user'
render_password = 'qRvkrYzSYuo6TvDWAh8SMcQokhT5pYyb'
render_host = 'dpg-cog4tdmv3ddc73e67q00-a.ohio-postgres.render.com'
database = 'forecating_companies_future'
engine = create_engine(f"postgresql+psycopg2://{render_username}:{render_password}@{render_host}:5432/{database}")
metadata = MetaData()


# Reflect the tables
metadata.reflect(engine)

# Save references to each table
company_data_table = metadata.tables['Company_Data']

# Create a scoped session to interact with the database
Session = scoped_session(sessionmaker(bind=engine))
session = Session()

def fetch_data_from_database(table):
    with Session() as session:
        try:
            # Query all entries from the provided table
            result = session.query(table).all()
            # Convert results into a list of dictionaries excluding internal SQLAlchemy keys
            data = [row.__dict__ for row in result]
            for item in data:
                item.pop('_sa_instance_state', None)
            return data
        except Exception as e:
            print(f"Error fetching data from database: {e}")
            return []
        
@app.route('/api/data')
def get_company_data():
    # Fetch data from the database
    company_data = fetch_data_from_database(company_data_table)
    
    # Return the data as JSON
    if not company_data:
        return jsonify({"error": "No data found"}), 404
    return jsonify(company_data)


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
