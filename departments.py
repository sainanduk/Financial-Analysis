import pandas as pd

def calculate_revenue_expenditure_by_department(data, department):
    try:
        
        dept_data = data[data['Department'] == department]

        
        categories = []
        category_summaries = []
        for category in dept_data['Category'].unique():
            cat_data = dept_data[dept_data['Category'] == category]
            revenue = cat_data['Amount'].apply(lambda x: x if x > 0 else 0).sum()
            expenditure = -cat_data['Amount'].apply(lambda x: x if x < 0 else 0).sum()
            profit = float(revenue + expenditure)  

            categories.append(category)
            category_summaries.append({
                'Category': category,
                'Revenue': float(revenue),  
                'Expenditure': float(expenditure),  
                'Profit': profit
            })
        total_revenue = sum(summary['Revenue'] for summary in category_summaries)
        total_expenditure = sum(summary['Expenditure'] for summary in category_summaries)

        return {
            'Department': department,
            'TotalRevenue': float(total_revenue), 
            'TotalExpenditure': float(total_expenditure), 
            'Categories': categories,
            'CategorySummary': category_summaries
        }

    except Exception as e:
        print(f'Error calculating revenue and expenditure: {str(e)}')
        return None

def calculate_total_profit(data):
    try:
        data['Amount'] = data['Amount'].astype(float)
        total_revenue = data[data['Amount'] > 0]['Amount'].sum()
        total_expenditure = data[data['Amount'] < 0]['Amount'].sum()
        total_profit = float(total_revenue + total_expenditure) 

        return {
            'TotalRevenue': float(total_revenue),  
            'TotalExpenditure': float(total_expenditure), 
            'TotalProfit': total_profit
        }

    except Exception as e:
        print(f'Error calculating total profit: {str(e)}')
        return None


def calculate_current_status(data):
    try:
        data['Amount'] = data['Amount'].astype(float)

        total_revenue = data[data['Amount'] > 0]['Amount'].sum()
        total_expenditure = data[data['Amount'] < 0]['Amount'].sum()
        current_status = float(total_revenue - abs(total_expenditure)) 

        return {
            'CurrentStatus': current_status
        }

    except Exception as e:
        print(f'Error calculating current status: {str(e)}')
        return None


def get_all_transactions(data):
    try:
        data['DateandTime'] = pd.to_datetime(data['DateandTime'], format='%Y-%m-%d %H:%M:%S', errors='coerce')
        data['Amount'] = data['Amount'].astype(float)

        transaction_list = [{
            'TransactionID': t['TransactionID'],
            'DateandTime': t['DateandTime'].strftime('%Y-%m-%d'),
            'Department': t['Department'],
            'Category': t['Category'],
            'Amount': float(t['Amount']) 
        } for _, t in data.iterrows()]

        return transaction_list

    except Exception as e:
        print(f'Error converting data to transaction list: {str(e)}')
        return None
