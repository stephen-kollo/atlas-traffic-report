function createEnv() {
  console.log("========= TRAFFIC REPORT SCRIPT IS RUNNING =========")
  console.log("------- Creating Env -------")
  const tech_list = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tech"); 

  const validation_data = getValidationData(tech_list)

  // this can be modified simply adding new source schemas to the object "raw_data_env"
  const raw_data_env = [
    {
      name: "tiktok",
      tracker_link: tech_list.getRange(1,6).getValue(),
      source_link: tech_list.getRange(3,6).getValue(),
      tracker_campaign_name: 1, // numbers for each column in raw tracker/source excel docs
      tracker_convertions: 2,
      tracker_revenue: 3,
      source_campaign_name: 1,
      source_cost: 4,
      source_installs: 7,
    }, 
    {
      name: "bigo",
      tracker_link: tech_list.getRange(2,6).getValue(),
      source_link: tech_list.getRange(4,6).getValue(),
      tracker_campaign_name: 1,
      tracker_convertions: 2,
      tracker_revenue: 3,
      source_campaign_name: 2,
      source_cost: 4,
      source_installs: 7,
    }
  ]
  console.log("..env created")
  return {
    raw_data_env: raw_data_env,
    validation_data: validation_data
    }
}

function getValidationData(tech_list) {
  var apps = []
  var regions = []
  const app_list = tech_list.getRange(2,2,100,1).getValues()
  const region_list = tech_list.getRange(2,3,100,1).getValues()
  
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
    agent: tech_list.getRange(2,1).getValue(),
    apps: apps,
    regions: regions
  }

  return validation_data
}
