import pandas as pd

# Function to calculate revenue and expenditure for a department
def calculate_revenue_expenditure_by_department(data, department):
    try:
        # Filter data for the given department
        dept_data = data[data['Department'] == department]

        # Initialize lists to store results
        categories = []
        category_summaries = []

        # Iterate over unique categories in the department data
        for category in dept_data['Category'].unique():
            # Filter data for the current category
            cat_data = dept_data[dept_data['Category'] == category]

            # Calculate revenue, expenditure, and profit for the category
            revenue = cat_data['Amount'].apply(lambda x: x if x > 0 else 0).sum()
            expenditure = -cat_data['Amount'].apply(lambda x: x if x < 0 else 0).sum()
            profit = float(revenue + expenditure)  # Ensure profit is converted to float

            # Append category and its summary to lists
            categories.append(category)
            category_summaries.append({
                'Category': category,
                'Revenue': float(revenue),  # Convert revenue to float
                'Expenditure': float(expenditure),  # Convert expenditure to float
                'Profit': profit
            })

        # Calculate total revenue and expenditure for the department
        total_revenue = sum(summary['Revenue'] for summary in category_summaries)
        total_expenditure = sum(summary['Expenditure'] for summary in category_summaries)

        return {
            'Department': department,
            'TotalRevenue': float(total_revenue),  # Convert total_revenue to float
            'TotalExpenditure': float(total_expenditure),  # Convert total_expenditure to float
            'Categories': categories,
            'CategorySummary': category_summaries
        }

    except Exception as e:
        print(f'Error calculating revenue and expenditure: {str(e)}')
        return None


# Function to calculate total profit
def calculate_total_profit(data):
    try:
        # Ensure 'Amount' column is numeric and convert to float
        data['Amount'] = data['Amount'].astype(float)

        # Calculate total revenue and expenditure
        total_revenue = data[data['Amount'] > 0]['Amount'].sum()
        total_expenditure = data[data['Amount'] < 0]['Amount'].sum()

        # Calculate total profit
        total_profit = float(total_revenue + total_expenditure)  # Convert to float

        return {
            'TotalRevenue': float(total_revenue),  # Convert total_revenue to float
            'TotalExpenditure': float(total_expenditure),  # Convert total_expenditure to float
            'TotalProfit': total_profit
        }

    except Exception as e:
        print(f'Error calculating total profit: {str(e)}')
        return None


# Function to get current status (revenue - expenditure)
def calculate_current_status(data):
    try:
        # Ensure 'Amount' column is numeric and convert to float
        data['Amount'] = data['Amount'].astype(float)

        # Calculate total revenue and expenditure
        total_revenue = data[data['Amount'] > 0]['Amount'].sum()
        total_expenditure = data[data['Amount'] < 0]['Amount'].sum()

        # Calculate current status (revenue - expenditure)
        current_status = float(total_revenue - abs(total_expenditure))  # Convert to float

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
            'Amount': float(t['Amount'])  # Convert Amount to float
        } for _, t in data.iterrows()]

        return transaction_list

    except Exception as e:
        print(f'Error converting data to transaction list: {str(e)}')
        return None
