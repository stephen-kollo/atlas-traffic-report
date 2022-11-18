function processData(cleaned_data, validation_data) {
  console.log("------- Processing Data -------")
  const tags_data = pushCampaignTags(cleaned_data, validation_data)
  const concat_data = concatSourceTrackerData(tags_data)
  return sortDataByCampaignTags(concat_data)
}

function pushCampaignTags(data, validation_data) {
  const validation_data_apps = validation_data.apps
  const validation_data_regions = validation_data.regions

  data.forEach(source => {
    source.tracker_data.forEach(campaign => {
      campaign.campaign_name = getSingleCampaignTags(campaign.campaign_name, validation_data_apps, validation_data_regions)
    })
    source.source_data.forEach(campaign => {
      campaign.campaign_name = getSingleCampaignTags(campaign.campaign_name, validation_data_apps, validation_data_regions)
    })
  })

  console.log("..campaign tags pushed")
  return data
}

function getSingleCampaignTags(campaign_name, validation_data_apps, validation_data_regions) {
  const arr = campaign_name.split('_');
  
  let tags
  if(arr[0] === undefined || arr[1] === undefined || arr[2] === undefined || arr[3] === undefined) {
    tags = {
      error: {
        error_name: "naming_error",
        campaign_name: campaign_name
      },
      app: "zzz",
      region: "zzz",
      agent: "zzz",
      payout: "zzz",
      account: "zzz"
    }
  } else if (!validation_data_apps.includes(arr[0].toLowerCase())) {
    tags = {
      error: {
        error_name: "app_naming_error",
        campaign_name: campaign_name
      },
      app: "zzz",
      region: "zzz",
      agent: "zzz",
      payout: "zzz",
      account: "zzz"
    }
  } else if (!validation_data_regions.includes(arr[1].toLowerCase())) {
    tags = {
      error: {
        error_name: "region_naming_error",
        campaign_name: campaign_name
      },
      app: "zzz",
      region: "zzz",
      agent: "zzz",
      payout: "zzz",
      account: "zzz"
    }
  } else {
    tags = {
      app: arr[0],
      region: arr[1],
      agent: arr[2],
      payout: arr[3],
      account: arr[arr.length-1]
    }
  }

  return tags
}

function concatSourceTrackerData(data){
  var concatData = []
  data.forEach(source => {
    concatData.push({
      source_name: source.source_name,
      data: source.source_data.concat(source.tracker_data)
    })
  })
  
  console.log("..data concat done")
  return concatData
}

function sortDataByCampaignTags(concat_data){
  concat_data.forEach(source => {
    source.data.sort((a, b) => 
      a.campaign_name.agent.localeCompare(b.campaign_name.agent) 
      || a.campaign_name.app.localeCompare(b.campaign_name.app) 
      || a.campaign_name.region.localeCompare(b.campaign_name.region)
      || a.campaign_name.account.localeCompare(b.campaign_name.account)
    );
    source = processNamingErrors(source)
  })

  const sorted_data = concat_data
  console.log("..data sorted by campaign tags")
  return sorted_data 
}


function processNamingErrors(source_object) {
  var errors = []
  while(source_object.data[source_object.data.length-1].campaign_name.error != undefined) {
    errors.push(source_object.data[source_object.data.length-1])
    source_object.data.pop()
  }
  source_object.errors = errors
  
  return source_object
}
