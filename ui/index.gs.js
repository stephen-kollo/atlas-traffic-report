function getSourcesEnv() {
  const list = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sources");
  const lastRow = list.getLastRow()
  let sourceSchema = []
  for(let i = 2; i <= lastRow; i++) {
    const source = list.getRange(i,1,1,9).getValues()[0]
    sourceSchema.push({
      source_name: source[0],
      tracker_camp_name: source[1],
      tracker_convertions: source[2],
      tracker_revenue: source[3],
      source_camp_name: source[4],
      source_installs: source[5],
      source_cost: source[6],
      source_link: source[7],
      tracker_link: source[8]
    })
  }
  return sourceSchema;
}

function getValidationEnv() {
  const agentList = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Agent");
  const regionsList = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Regions");
  const appsList = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Apps");
  
  const appsData = appsList.getRange(1,1,appsList.getLastRow(),1).getValues()
  let apps = []
  appsData.forEach(app => {
    apps.push(app[0])
  })
  
  const regionsData = regionsList.getRange(1,1,regionsList.getLastRow(),1).getValues()
  let regions = []
  regionsData.forEach(region => {
    regions.push(region[0])
  })
  
  const validationSchema = {
    agent: agentList.getRange(1,1).getValue(),
    regions: regions,
    apps: apps
  }

  return validationSchema
}

function createReportBlank() {
  const date = new Date()
  const doc = SpreadsheetApp.create(`${date.getDate()}.${date.getMonth() + 1} | Traffic Report`);
  doc.getSheets()[0].setName("General report");
  doc.insertSheet().setName("Campaign report");
  doc.insertSheet().setName("Error report");
  return doc
}

function addItemsToSettings(items, listName) {
  const list = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(listName);
  const row = list.getLastRow() + 1
  const itemList = items.split(',');
  var result = []
  itemList.forEach(item => {
    result.push([item])
  })
  list.getRange(row,1,itemList.length,1).setValues(result)
  return true
}

function deleteItemFromSettings(id, listName) {
  const list = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(listName);
  const row = id + 1
  list.deleteRow(row);
  return true
}

function updateSourceSettings(settings) {
  const row = settings.id + 2
  const list = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sources");
  const data = [[
    settings.tracker_campaign_name,
    settings.tracker_convertions,
    settings.tracker_revenue,
    settings.source_campaign_name,
    settings.source_installs,
    settings.source_cost,
    settings.source_link,
    settings.tracker_link
  ]]
  list.getRange(row,2,1,8).setValues(data)
  return true
}

function moveToPublicFolder(doc, dir) {
  var file = DriveApp.getFileById(doc.getId());
  var folder = DriveApp.getFolderById(dir);
  file.moveTo(folder);
  return true
}
