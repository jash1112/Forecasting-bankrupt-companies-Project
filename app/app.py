from flask import Flask, jsonify, render_template, request
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Flask app setup
app = Flask(__name__)

# Database configuration
render_username = 'forecating_companies_future_user'
render_password = 'qRvkrYzSYuo6TvDWAh8SMcQokhT5pYyb'
render_host = 'dpg-cog4tdmv3ddc73e67q00-a.ohio-postgres.render.com'
database = 'forecating_companies_future'
DATABASE_URI = f"postgresql+psycopg2://{render_username}:{render_password}@{render_host}:5432/{database}"
engine = create_engine(DATABASE_URI)

# Declarative base setup
Base = declarative_base()

class CompanyData(Base):
    __tablename__ = 'Company_Data'
    
    # Define columns based on the data types provided
    sector = Column(String, primary_key=True)
    Name = Column(String)
    symbol = Column(String)
    code = Column(String)
    year = Column(Integer)
    current_ratio = Column('Current ratio',Float)
    quick_ratio = Column('Quick Ratio',Float)
    cash_ratio = Column('Cash ratio',Float)
    operating_cash_flow_ratio = Column('Operating cash flow ratio',Float)
    working_capital_ratio = Column('Working capital ratio',Float)
    return_on_equity = Column('Return On Equity (ROE)',Float)
    net_profit_margin = Column('Net profit margin',Float)
    sales_turnover_ratio = Column('Sales turnover ratio',Float)
    return_on_assets = Column('Return On Assets (ROA)',Float)
    eps = Column('EPS',Float)
    debt_to_assets_ratio = Column('Debt-to-assets ratio',Float)
    equity_ratio = Column('Equity Ratio',Float)
    debt_to_equity_ratio = Column('Debt to equity ratio',Float)
    interest_coverage_ratio = Column('Interest coverage ratio',String)  
    total_debt_to_ebitda_ratio = Column('Total debt to EBITDA ratio',String)
    cash_flow_to_debt_ratio = Column('Cash flow to debt ratio',Float)
    inventory_turnover_ratio = Column('Inventory turnover ratio',String)
    receivables_turnover_ratio = Column('Receivables turnover ratio',String)
    asset_turnover_ratio = Column('Asset Turnover Ratio',Float)
    working_capital_turnover_ratio = Column('Working capital turnover ratio',String)
    ebitda = Column('EBITDA',String)
    ev_ebitda = Column('EV/EBITDA',String)
    ev_ebit = Column('EV / EBIT',String)
    ev_free_cash_flow = Column('EV / Free Cash Flow',String)
    ev_invested_capital = Column('EV / Invested Capital',String)
    ev_revenue = Column('EV / Revenue',String)
    pe_ratio = Column('P/E Ratio',String)
    price_book = Column('Price/Book',String)
    dividend_per_share = Column('Dividend Per Share',Float)
    altman_z_score = Column('Altman Z-Score',Float)
    piotroski_score = Column('Piotroski Score',Integer)
    Classification = Column(Integer)

# Database connection setup
engine = create_engine(DATABASE_URI)
Base.metadata.create_all(engine)  # Creates all tables according to the defined classes

# Create a session to interact with the database
Session = sessionmaker(bind=engine)
session = Session()

@app.route('/api/company-data/', methods=['GET'])
def company_data():
    company_name = request.args.get('Name')
    session = Session(bind=engine)
    try:
        query_result = session.query(CompanyData).filter(CompanyData.Name == company_name).order_by(CompanyData.year).all()
        data_list = [{column.name: getattr(row, column.name) for column in CompanyData.__table__.columns} for row in query_result]
        return jsonify(data_list)
    finally:
        session.close()


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
