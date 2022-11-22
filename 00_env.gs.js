function createEnv(settings_sheets) {
  console.log("========= TRAFFIC REPORT SCRIPT IS RUNNING =========")
  console.log("------- Creating Env -------")

  const validation_data = getValidationData(settings_sheets)
  const source_data = getSourceData(settings_sheets.getSheetByName("Sources"))

  console.log("..env created")
  return {
    errors: source_data.errors,
    raw_data_env: source_data.data,
    validation_data: validation_data
    }
}

function getSourceData(source_sheet){
  const last_row = source_sheet.getLastRow()
  var data = []
  var errors = []
  for (var i = 2; i <= last_row; i++){
    const values = source_sheet.getRange(i,1,1,9).getValues()[0]
    try {
      SpreadsheetApp.openByUrl(values[7])
      SpreadsheetApp.openByUrl(values[8])

      data.push({
        name: values[0],
        tracker_campaign_name: values[1],
        tracker_convertions: values[2],
        tracker_revenue: values[3],
        source_campaign_name: values[4],
        source_installs: values[5],
        source_cost: values[6],
        source_link: values[7],
        tracker_link: values[8]
      })
    } catch (e) {
      errors.push(`${values[0]}: incorrect spreadsheet links`)
    }
  }
  return { data: data, errors: errors }
}

function getValidationData(settings_sheets) {
  const apps_list = settings_sheets.getSheetByName("Apps");
  const apps_last_row = apps_list.getLastRow();
  const regions_list = settings_sheets.getSheetByName("Regions");
  const regions_last_row = regions_list.getLastRow();
  var apps = []
  var regions = []
  const app_list = apps_list.getRange(1,1,apps_last_row,1).getValues()
  const region_list = regions_list.getRange(1,1,regions_last_row,1).getValues()
  
  app_list.forEach(app => {
    if(app[0].length > 0) {
      apps.push(app[0].toLowerCase())
    }
  })

  region_list.forEach(region => {
    if(region[0].length > 0) {
      regions.push(region[0].toLowerCase())
    }
  })
  
  const validation_data = {
    agent: settings_sheets.getSheetByName("Agent").getRange(1,1).getValue(),
    apps: apps,
    regions: regions
  }

  return validation_data
}
