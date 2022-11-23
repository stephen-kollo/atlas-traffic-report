# Atlas Traffic Report
<img src="./readme-slides/concept_schema.png"> 
Google Apps Script traffic report for performance marketing agencies<br>

Connects application data and source data in the case of advertising third-party applications without direct postback<br>
Groups advertising campaigns data by sources, apps, regions and sums values<br>

# Usage

## Main
To start using report simply set data from sources an apps to Google Sheets and link these sheets by clicking on each source button in "Sources" section of the interface (Tiktok & Bigo in given example)<br>
✏Tiktok<br>
✏️Bigo<br>
<br>
In pop-up menu set Google Sheets links and numbers of each column in menu to attach exact columns in your sheets<br>
This menu is shown in the screenshot below<br>
<br>
When data sheets linked, click on "Create Report" green button, it will open loading pop-up<br>
It will take 15-30 seconds to create report<br>
When it is complete, click "Open Report" button to open report sheet<br>
<br>
## Report Sections
Report is devided into 3 sections

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
