import pandas as pd

def get_revenue_expenditure_by_department(data, department):
    
    dept_data = data[data['Department'] == department]
    dept_data['Amount'] = dept_data['Amount'].astype(float)  

    
    dept_data.loc[dept_data['Amount'] > 0, 'Revenue'] = dept_data['Amount']
    dept_data.loc[dept_data['Amount'] < 0, 'Expenditure'] = -dept_data['Amount']
  
    category_summary = dept_data.groupby('Category').agg({
        'Revenue': 'sum',
        'Expenditure': 'sum'
    }).reset_index()

    
    total_revenue = category_summary['Revenue'].sum()
    total_expenditure = category_summary['Expenditure'].sum()

    return {
        'Department': department,
        'TotalRevenue': total_revenue,
        'TotalExpenditure': total_expenditure,
        'DepartmentSummary': category_summary.to_dict(orient='records')
    }

def calculate_total_data(data):
    total_summary = data.groupby('Category').agg({
        'Amount': lambda x: x.sum() if x.sum() > 0 else 0,
        'Amount': lambda x: -x.sum() if x.sum() < 0 else 0
    }).reset_index()

    total_revenue = total_summary[total_summary['Amount'] > 0]['Amount'].sum()
    total_expenditure = -total_summary[total_summary['Amount'] < 0]['Amount'].sum()

    return {
        'TotalRevenue': total_revenue,
        'TotalExpenditure': total_expenditure
    }

def calculate_profit_metrics(data):
    total_data = calculate_total_data(data)
    total_revenue = total_data['TotalRevenue']
    total_expenditure = total_data['TotalExpenditure']

    gross_profit = total_revenue - total_expenditure
    net_profit = gross_profit - total_expenditure

    return {
        'GrossProfit': gross_profit,
        'NetProfit': net_profit,
        'CurrentStatus': total_revenue - total_expenditure
    }

def dashboarddata(data):
    
    data.columns = ['TransactionID', 'Date', 'Department', 'Category', 'Amount']

    data['Date'] = pd.to_datetime(data['Date'], errors='coerce')
    data['Amount'] = pd.to_numeric(data['Amount'], errors='coerce')
    data = data.dropna(subset=['Amount'])

    department_data = {}
    for department in data['Department'].unique():
        department_data[department] = get_revenue_expenditure_by_department(data, department)

    total_data = calculate_total_data(data)
    profit_metrics = calculate_profit_metrics(data)

    return {
        'Departments': department_data,
        'TotalData': total_data,
        'ProfitMetrics': profit_metrics
    }
