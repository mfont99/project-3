# -*- coding: utf-8 -*-
"""
Created on Thu Jun  6 17:43:56 2024

@author: canan
"""

import pandas as pd

# Load the dataset
df = pd.read_csv('C:/Users/canan/OneDrive/Documents/Project 3(Opioids)/Medicaid_Opioid_Prescribing_Rates_by_Geography_2022.csv')

# Display the first few rows of the dataframe
print("Initial data:\n", df.head())

# Columns to be erased (example: 'Column1', 'Column2')
columns_to_erase = ['Opioid_Prscrbng_Rate_5Y_Chg', 'Opioid_Prscrbng_Rate_1Y_Chg', 'LA_Opioid_Prscrbng_Rate_5Y_Chg', 'LA_Opioid_Prscrbng_Rate_1Y_Chg']

# Erase the specified columns
df = df.drop(columns=columns_to_erase)

# Display the dataframe after erasing columns
print("Data after erasing columns:\n", df.head())

# Save the modified dataframe to a new CSV file
df.to_csv('modified_dataset.csv', index=False)