# Atlas Traffic Report
Google Apps Script traffic report for performance marketing agencies<br>

Connects application data and source data in the case of advertising third-party applications without direct postback<br>
Groups advertising campaigns data by sources, apps, regions and sums values<br>

# Concept
<img src="./readme-slides/concept_schema.png"> 

# Usage
<img src="./readme-slides/main_screen.png" style="width: 45%; display: flex;"> 
<img src="./readme-slides/source_settings.png" style="margin-left: 9%; width: 45%; display: flex;"> 
Main View / Setting Source Data

<br>
<img src="./readme-slides/creating_report.png" style="width: 40%; display: inline;"> Create Report

# Campaign Naming
To ensure the report works correctly, all advertising campaigns must be named according to the template

<b>Campaign name tamplate:</b>
AppName_Region_Agent_CustomField_AdAccount

<b>Cases:</b>
<br>
✅ ShadowRunner_AE_BRA_global_SAMediaGroup009 <br>
✅ ShadowRunner_AE_BRA_SAMediaGroup009 <br>
❌ <strike>TikTok_</strike>ShadowRunner_AE_BRA_global_SAMediaGroup009 <br>
❌ <strike>AE_ShadowRunner</strike>_BRA_global_SAMediaGroup009 <br>
