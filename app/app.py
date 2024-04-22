# from flask import Flask, jsonify, render_template, request
from sqlalchemy import create_engine, select, Column, Integer, String, Float
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker, Session
# from sqlalchemy.ext.automap import automap_base


from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, select
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from flask import SQLAlchemy
import sqlite3

conn = sqlite3.connect('user.db')


db = SQLAlchemy()

from common.db import db
from common.ma import ma

db.init_app(app)
ma.init_app(app)


# render_username = 'forecating_companies_future_user'
# render_password = 'qRvkrYzSYuo6TvDWAh8SMcQokhT5pYyb'
# render_host = 'dpg-cog4tdmv3ddc73e67q00-a.ohio-postgres.render.com'
# database = 'forecating_companies_future'
# engine = create_engine(f"postgresql+psycopg2://{render_username}:{render_password}@{render_host}:5432/{database}")
# Base = automap_base()


#------------------------------------------------------------------------------------------------------1
# Flask app setup
# app = Flask(__name__)

# # Database configuration
# render_username = 'forecating_companies_future_user'
# render_password = 'qRvkrYzSYuo6TvDWAh8SMcQokhT5pYyb'
# render_host = 'dpg-cog4tdmv3ddc73e67q00-a.ohio-postgres.render.com'
# database = 'forecating_companies_future'
# engine = f"postgresql+psycopg2://{render_username}:{render_password}@{render_host}:5432/{database}"
# Base = automap_base()

# # reflect the tables
# Base.prepare(engine, reflect=True)

# print(Base.classes.keys())

# # Save references to each table


# class Company_Data(Base):
#     __tablename__ = 'company_data'
    
#     # Define columns based on the data types provided
#     sector = Column(String, primary_key=True)
#     name = Column(String)
#     symbol = Column(String)
#     code = Column(String)
#     year = Column(Integer)
#     current_ratio = Column('current_ratio', Float)
#     quick_ratio = Column('quick_ratio', Float)
#     cash_ratio = Column('cash_ratio', Float)
#     operating_cash_flow_ratio = Column('operating_cash_flow_ratio', Float)
#     working_capital_ratio = Column('working_capital_ratio', Float)
#     return_on_equity = Column('return_on_equity', Float)
#     net_profit_margin = Column('net_profit_margin', Float)
#     sales_turnover_ratio = Column('sales_turnover_ratio', Float)
#     return_on_assets = Column('return_on_assets', Float)
#     eps = Column('eps', Float)
#     debt_to_assets_ratio = Column('debt_to_assets_ratio', Float)
#     equity_ratio = Column('equity_ratio', Float)
#     debt_to_equity_ratio = Column('debt_to_equity_ratio', Float)
#     interest_coverage_ratio = Column('interest_coverage_ratio', String)  
#     total_debt_to_ebitda_ratio = Column('total_debt_to_ebitda_ratio', String)
#     cash_flow_to_debt_ratio = Column('cash_flow_to_debt_ratio', Float)
#     inventory_turnover_ratio = Column('inventory_turnover_ratio', String)
#     receivables_turnover_ratio = Column('receivables_turnover_ratio', String)
#     asset_turnover_ratio = Column('asset_turnover_ratio', Float)
#     working_capital_turnover_ratio = Column('working_capital_turnover_ratio', String)
#     ebitda = Column('ebitda', String)
#     ev_ebitda = Column('ev_ebitda', String)
#     ev_ebit = Column('ev_ebit', String)
#     ev_free_cash_flow = Column('ev_free_cash_flow', String)
#     ev_invested_capital = Column('ev_invested_capital', String)
#     ev_revenue = Column('ev_revenue', String)
#     pe_ratio = Column('pe_ratio', String)
#     price_book = Column('price_book', String)
#     dividend_per_share = Column('dividend_per_share', Float)
#     altman_z_score = Column('altman_z_score', Float)
#     piotroski_score = Column('piotroski_score', Integer)
#     classification = Column('classification', Integer) 




# def fetch_data_from_database(table):
#     with Session(engine) as session:
#         try:
#             result = session.query(table).all()
#             data = [row.__dict__ for row in result]
#             for item in data:
#                 item.pop('_sa_instance_state', None)
#             return data
#         except Exception as e:
#             print(f"Error fetching data from database: {e}")
#             return []

# @app.route('/api/Company_Data', methods=['GET'])
# def company_data():

#     # Fetch company data from the database
#     company_data = fetch_data_from_database(Company_Data)
    
#     # Return the company data as JSON
#     return jsonify(company_data)


# # Static page routes
# @app.route('/')
# def index():
#     return render_template("index_main.html")

# @app.route('/dashboard.html')
# def dashboard():
#     return render_template('dashboard.html')

# @app.route('/introduction.html')
# def introduction():
#     return render_template('introduction.html')

# # Run the Flask application
# if __name__ == '__main__':
#     app.run(debug=True)

# ------------------------------------------------------------------------------------------------------------------2
# Flask app setup
# app = Flask(__name__)

# Database configuration
# render_username = 'forecating_companies_future_user'
# render_password = 'qRvkrYzSYuo6TvDWAh8SMcQokhT5pYyb'
# render_host = 'dpg-cog4tdmv3ddc73e67q00-a.ohio-postgres.render.com'
# database = 'forecating_companies_future'
# engine = create_engine(f"postgresql+psycopg2://{render_username}:{render_password}@{render_host}:5432/{database}")
# Base = automap_base()

# # reflect the tables
# Base.prepare(engine, reflect=True)

# print(Base.classes.keys())

# # Save references to each table
# Company_Data = Base.classes.Company_Data

# def fetch_data_from_database(table):
#     with Session(engine) as session:
#         try:
#             result = session.query(table).all()
#             data = [row.__dict__ for row in result]
#             for item in data:
#                 item.pop('_sa_instance_state', None)
#             return data
#         except Exception as e:
#             print(f"Error fetching data from database: {e}")
#             return []

# @app.route('/api/Company_Data', methods=['GET'])
# def company_data():

#     # Fetch company data from the database
#     company_data = fetch_data_from_database(Company_Data)
    
#     # Return the company data as JSON
#     return jsonify(company_data)

# Static page routes
# @app.route('/')
# def index():
#     return render_template("index_main.html")

# @app.route('/dashboard.html')
# def dashboard():
#     return render_template('dashboard.html')

# @app.route('/introduction.html')
# def introduction():
#     return render_template('introduction.html')

# # Run the Flask application
# if __name__ == '__main__':
#     app.run(debug=True)