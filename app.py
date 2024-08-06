from flask import Flask, request, jsonify
import bcrypt
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token, JWTManager,get_jwt
from flask_cors import CORS
from db import setup_db, User, db, Transactions
from dashboard import dashboarddata
import pandas as pd
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from sqlalchemy.types import String as StringType
from extractusername import extract_username_from_jwt
from departments import calculate_revenue_expenditure_by_department,calculate_total_profit,calculate_current_status,get_all_transactions

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'financialanalysis'

setup_db(app)

jwt = JWTManager(app)
CORS(app) 

@app.route('/signup', methods=['POST', 'GET'])
def signup():
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if User.query.filter_by(username=username).first():
            return jsonify({"message": "Username already exists","code":409})

        if User.query.filter_by(email=email).first():
            return jsonify({"message": "Email already exists","code":409})

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        new_user = User(username=username, email=email, password=hashed_password.decode('utf-8'))
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully","code":201})

    return jsonify({"message": "Signup endpoint. Use POST to submit data."})

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        additional_claims = {
            'username': user.username,
            'user_id': user.id
        }
        access_token = create_access_token(identity=user.id, additional_claims=additional_claims)
        return jsonify({'message': 'Login Success', 'financialtoken': access_token}), 200
    else:
        return jsonify({'message': 'Login Failed'}), 401
def extract_username_from_jwt():
    claims = get_jwt()
    return claims.get('username')
@app.route('/dashboard',methods=['GET'])
@jwt_required()
def dashboard():
    username = extract_username_from_jwt()
    try:
        
        transactions = Transactions.query.filter_by(updatedby=username).all()
        if not transactions:
            return jsonify({'message':"no data found"})
        data = pd.DataFrame([(t.TransactionID, t.DateandTime, t.Department, t.Category, t.Amount) for t in transactions],
                            columns=['TransactionID', 'DateandTime', 'Department', 'Category', 'Amount'])

        processed_data = dashboarddata(data)
        
        return processed_data

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/transactions', methods=['GET'])
@jwt_required()
def get_all_transactions_route():
    try:
        username=extract_username_from_jwt()
        transactions = Transactions.query.filter_by(updatedby=username).all()
        transaction_list = []
        for transaction in transactions:
            transaction_list.append({
                'transactionId': transaction.TransactionID,
                'department': transaction.Department,
                'category': transaction.Category,
                'dateandtime': transaction.DateandTime,
                'amount': transaction.Amount
            })

        return jsonify({
            'transactions': transaction_list,
            'message': 'Transactions fetched successfully'
        }), 200

    except Exception as e:
        print(f"Error retrieving transactions: {str(e)}")
        return jsonify({'message': 'Error retrieving transactions'}), 500


@app.route('/transactions/<department>', methods=['GET'])
@jwt_required()
def get_transactions(department):
    try:
        username=extract_username_from_jwt()
        transactions = Transactions.query.filter_by(Department=department,updatedby=username).all()
        transaction_list = []
        for transaction in transactions:
            transaction_list.append({
                'transactionId': transaction.TransactionID,
                'department':transaction.Department,
                'category':transaction.Category,
                'dateandtime': transaction.DateandTime,
                'amount': transaction.Amount
            })

        return jsonify({
            'transactions': transaction_list,
            'message': 'Transactions fetched successfully'
        }), 200

    except Exception as e:
        print(f"Error retrieving transactions: {str(e)}")
        return jsonify({'message': 'Error retrieving transactions'}), 500

@app.errorhandler(401)
def unauthorized(error):
    return jsonify({'message': 'Unauthorized access'}), 401





@app.route('/upload', methods=['POST'])
@jwt_required()
def upload_transactions():
    username = get_jwt_identity()

    if not username:
        return jsonify({'error': 'Invalid token or username not found'}), 400

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.endswith('.csv'):
        try:
            data = pd.read_csv(file)

            app.logger.info(f'Received {len(data)} rows of data from {file.filename}')

            expected_columns = ['TransactionID', 'DateandTime', 'Department', 'Category', 'Amount']
            if not all(col in data.columns for col in expected_columns):
                return jsonify({'error': 'Invalid CSV format or missing columns'}), 400

            for index, row in data.iterrows():
                transaction = Transactions(
                    TransactionID=row['TransactionID'],
                    DateandTime=row['DateandTime'],
                    Department=row['Department'],
                    Category=row['Category'],
                    Amount=row['Amount'],
                    updatedby=username  
                )
                db.session.add(transaction)

            db.session.commit()

            return jsonify({'message': 'Transactions data uploaded successfully'}), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Error processing file: {str(e)}'}), 500

    else:
        return jsonify({'error': 'Unsupported file type or format'}), 400

@app.route('/departments-summary/<department>', methods=['GET'])
@jwt_required()
def departments_summary(department):
    username = extract_username_from_jwt()

    if not username:
        return jsonify({'error': 'Invalid token or username not found'}), 400

    try:
        transactions = db.session.query(Transactions).filter_by(Department=department,updatedby=username).all()

        data = pd.DataFrame([(t.TransactionID, t.DateandTime, t.Department, t.Category, t.Amount) for t in transactions],
                            columns=['TransactionID', 'DateandTime', 'Department', 'Category', 'Amount'])
        data['DateandTime'] = pd.to_datetime(data['DateandTime'], errors='coerce')
        data['Amount'] = data['Amount'].astype(float)
        data = data.dropna(subset=['Amount'])

        
        department_data = data[data['Department'] == department]

        department_summary = calculate_revenue_expenditure_by_department(department_data, department)
        total_profit = calculate_total_profit(department_data)
        current_status = calculate_current_status(department_data)

        all_transactions = get_all_transactions(department_data)

        response_data = {
            'DepartmentSummary': department_summary,
            'TotalProfit': total_profit,
            'CurrentStatus': current_status,
            'Transactions': all_transactions
        }

        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({'error': f'Error processing data: {str(e)}'}), 500





if __name__ == '__main__':
    app.run(debug=True)
