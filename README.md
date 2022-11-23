# Atlas Traffic Report
<img src="./readme-slides/concept_schema.png"> 
Google Apps Script traffic report for performance marketing agencies<br>

Connects application data and source data in the case of advertising third-party applications without direct postback<br>
Groups advertising campaigns data by sources, apps, regions and sums values<br>

# Usage
<img align="left" src="./readme-slides/main_screen.png" style="width: 50%;">
<img align="left" src="./readme-slides/source_settings.png" style="width: 50%;">

## Main
To start using report simply set data from Sources an Apps to Google Sheets and link these Sheets by clicking on each Source Button in "Sources" section of the interface (Tiktok & Bigo in given example)<br>
- ✏Tiktok<br>
- ✏️Bigo<br>
<br>
In pop-up menu set Google Sheets links and numbers of each Column in menu to attach exact Columns in your Sheets 

Main View / Setting Source Data
<br>
## Campaign Naming
To ensure the report works correctly, all advertising campaigns must be named according to the template

<b>Campaign name tamplate:</b>
AppName_Region_Agent_CustomField_AdAccount

<b>Cases:</b>
<br>
✅ ShadowRunner_AE_BRA_global_SAMediaGroup009 <br>
✅ ShadowRunner_AE_BRA_SAMediaGroup009 <br>
❌ <strike>TikTok_</strike>ShadowRunner_AE_BRA_global_SAMediaGroup009 <br>
❌ <strike>AE_ShadowRunner</strike>_BRA_global_SAMediaGroup009 <br>
