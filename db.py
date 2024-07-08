

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def setup_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:N%40ndu456@localhost/financialanalysis'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    migrate.init_app(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    
class Transactions(db.Model):
    TransactionID = db.Column(db.String(50), primary_key=True)
    DateandTime = db.Column(db.String(50), nullable=False)
    Department = db.Column(db.String(100), nullable=False)
    Category = db.Column(db.String(100), nullable=False)
    Amount = db.Column(db.Float, nullable=False)



