from flask import Flask, jsonify, render_template,request
from sqlalchemy import create_engine, select
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

# Create a Flask app
app = Flask(__name__)

# SQLAlchemy engine
render_username = 'forecating_companies_future_user'
render_password = 'qRvkrYzSYuo6TvDWAh8SMcQokhT5pYyb'
render_host = 'dpg-cog4tdmv3ddc73e67q00-a.ohio-postgres.render.com'
database = 'forecating_companies_future'
engine = create_engine(f"postgresql+psycopg2://{render_username}:{render_password}@{render_host}:5432/{database}")
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)
print(Base.classes.keys())

 

def fetch_data_from_database(table):
    with Session(engine) as session:
        try:
            result = session.query(table).all()
            data = [row.__dict__ for row in result]
            for item in data:
                item.pop('_sa_instance_state', None)
            return data
        except Exception as e:
            print(f"Error fetching data from database: {e}")
            return []

@app.route('/data-for-company')
def data_for_company():
    company_name = request.args.get('name', default=None, type=str)
    if company_name:
        # Assuming 'Company' is the class mapped to the company table
        Company = Base.classes.company
        company_data = fetch_data_from_database(Company)
        # You would filter this data based on the company_name and prepare it for the frontend
        # This is a placeholder for the logic you would implement
        filtered_data = {'trendAnalysis': {}, 'comparativeAnalysis': {}, 'financialRatiosDistribution': {}, 'correlationAnalysis': {}, 'riskAssessment': {}}
        return jsonify(filtered_data)
    else:
        return jsonify({'error': 'Company name not provided'}), 400

@app.route('/')
def index():
    return render_template("index(prototype_1).html")


@app.route('/dashboard.html')
def dashboard():
    return render_template('dashboard.html')

@app.route('/introduction.html')
def introduction():
    return render_template('introduction.html')



if __name__ == '__main__':
    app.run(debug=True)

