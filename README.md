# Atlas Traffic Report
Google Apps Script traffic report for performance marketing agencies<br>
Connects tracker data and source data in case of no postback given<br>
Groups advertising campaigns data by sources, apps, regions and sums values<br>

# Concept
<img src="./readme-slides/concept.png"> 

# Usage


# Campaign Naming
To ensure the report works correctly, all advertising campaigns must be named according to the template

<b>Campaign name tamplate:</b>
AppName_Region_Agent_CustomField_AdAccount

<b>Cases:</b>
<br>
✅ MagicPic_AE_BRA_payout:1.4_SAMediaGroup009 <br>
✅ MagicPic_AE_BRA_SAMediaGroup009 <br>
❌ <strike>TikTok_</strike>MagicPic_AE_BRA_payout:1.4_SAMediaGroup009 <br>
❌ <strike>AE_MagicPic</strike>_BRA_payout:1.4_SAMediaGroup009 <br>
