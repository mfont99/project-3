# Project-3
Group Members: Matthew Fontaine, David Kidaha, Kalisse Bakker, and Logan Canann

Description: In this project we ventured into the world of opioids. Diving into mortality rates within the country and comparing these numbers with precription rates to see if any correlation exists. Throughout this process we were able to utilize the various data analysis tools to paint a picture of the story behind the numbers. 

Engineering: We Extracted Tranformed and Loaded various data sets from the CDC, Census Buraeu and US county Latitude and logitude coordinates to get a clear picture of the story behind the numbers and help build a visually aesthetic picture behind the Opioids pandemic. After initial cleaning of the raw files we used PostgresSQL to house the info into set tables. 

Database: Because there was a variety of data available in the prescription datasets and death datasets, in order to allow them to be joined it was critical to create uuid's that could be added to each file. All files contained National, State, or County level data. We gathered the FIPS data for both state and county and combined them to create a fips_uuid that would allow each dataset to be joined by location. Additional tables were created to identify the level of granularity within each file. For example, the table "geo_lvl" was created with only 4 rows and 2 columns. Columns were geo_lvl_desc (National, State, County, and Zip Code) and lvl_uuid/geo_lvl_uuid (1, 2, 3, 4). By adding this value to each dataset based on the fips data, it would allow us to separate by larger areas and not specific states or counties.  The result is that all datasets can be merged on location information in a variety of ways. 

Visualization: Using Javascript and HTML we were able to plot a visual map of the Opioids related mortality rates by counties over a time span. As part of the excercise to use a new librabry not covered in class We got to use seaborn to plot a couple of more dynamic visual representaion of the counties with the highest mortality numbers, off of which we we're able to glean at the problem of opioids around the appalachian area of the country.   

HTML link: https://mfont99.github.io/project-3/


Citations:

National Center for Health Statistics. NCHS - Drug Poisoning Mortality by County: United States. Date accessed [6/10/2024]. Available from https://data.cdc.gov/d/pbkm-d27e.
