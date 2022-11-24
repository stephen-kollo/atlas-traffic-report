function cleanRawData(sources_docs_env) {
  console.log("------- Cleaning Raw Data -------")
  const raw_traffic_data = getRawData(sources_docs_env)
  return cleanData(raw_traffic_data)
}

function getRawData(sources_docs_env) {
  raw_traffic_data = []

  sources_docs_env.forEach(source => {
    const tracker_list = SpreadsheetApp.openByUrl(source.tracker_link).getSheets()[0];
    const source_list = SpreadsheetApp.openByUrl(source.source_link).getSheets()[0];
    const tracker_list_last_row = tracker_list.getLastRow()
    const source_list_last_row = source_list.getLastRow()
    
    var tracker_data = []
    const tracker_campaign_names = tracker_list.getRange(1, source.tracker_campaign_name, tracker_list_last_row, 1).getValues()
    const tracker_convertions = tracker_list.getRange(1, source.tracker_convertions, tracker_list_last_row, 1).getValues()
    const tracker_revenue = tracker_list.getRange(1, source.tracker_revenue, tracker_list_last_row, 1).getValues()

    for(var i = 0; i < tracker_list_last_row; i++) {
      tracker_data.push({
        campaign_name: tracker_campaign_names[i][0],
        convertions: Number(tracker_convertions[i][0]),
        revenue: Number(tracker_revenue[i][0]),
        installs: 0,
        cost: 0
      })
    }

    var source_data = []
    const source_campaign_names = source_list.getRange(1, source.source_campaign_name, source_list_last_row, 1).getValues()
    const source_installs = source_list.getRange(1, source.source_installs, source_list_last_row, 1).getValues()
    const source_cost = source_list.getRange(1, source.source_cost, source_list_last_row, 1).getValues()

    for(var i = 0; i < source_list_last_row; i++) {
      source_data.push({
        campaign_name: source_campaign_names[i][0],
        convertions: 0,
        revenue: 0,
        installs: Number(source_installs[i][0]),
        cost: Number(source_cost[i][0])
      })
    }

    raw_traffic_data.push({
      source_name: source.name,
      tracker_data: tracker_data,
      source_data: source_data
    })
  })

  console.log("..got raw traffic data")
  return raw_traffic_data
}

function cleanData(raw_traffic_data) {
  var cleaned_data = []
  for(var i = 0; i < raw_traffic_data.length; i++) {
    const tracker_data = raw_traffic_data[i].tracker_data
    const source_data = raw_traffic_data[i].source_data

    var tracker_data_cleaned = tracker_data.filter(campaign => campaign.convertions > 0 )
    tracker_data_cleaned = tracker_data_cleaned.filter(campaign => !campaign.campaign_name.toLowerCase().includes("total"))
    
    var source_data_cleaned = source_data.filter(campaign => campaign.cost > 0)
    source_data_cleaned = source_data_cleaned.filter(campaign => !campaign.campaign_name.toLowerCase().includes("total"))
    cleaned_data.push({
      source_name: raw_traffic_data[i].source_name,
      tracker_data: tracker_data_cleaned,
      source_data: source_data_cleaned
    })
  }

  console.log("..raw traffic data cleaned")
  return cleaned_data
}
