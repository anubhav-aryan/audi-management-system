import pandas as pd
import json

# Load the Excel file
excel_file = 'proctor_details(1).xlsx'
df = pd.read_excel(excel_file)

# Convert the DataFrame to a list of dictionaries
records = df.to_dict(orient='records')
print(len(records))
# Convert the list of dictionaries to JSON format
json_output = json.dumps(records, indent=4)

# Save the JSON output to a file
with open('output.json', 'w') as f:
    f.write(json_output)

# Example: Print the JSON output
