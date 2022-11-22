function createReport(sorted_data) {
  console.log("------- Creating Report -------")
  const report_data = combineData(sorted_data)
  const report = {
    report_data: report_data,
    totals: countTotals(report_data),
    regions: countByRegion(report_data),
    apps: countByApp(report_data),
  }
  return report
}

function combineData(sorted_data) {
  const combined_data = []

  for(var j = 0; j < sorted_data.length; j++) {
    const data = sorted_data[j].data
    var combined = []

    for(var i = 0; i < data.length; i++) {
      const unitName = `${data[i].campaign_name.agent} / ${data[i].campaign_name.app} / ${data[i].campaign_name.region}`
      if(combined.length > 0 && combined[combined.length-1].name == unitName) {
        combined[combined.length-1].revenue += data[i].revenue
        combined[combined.length-1].convertions += data[i].convertions
        combined[combined.length-1].cost += data[i].cost
        combined[combined.length-1].installs += data[i].installs
      } else {
        combined.push({
          name: unitName,
          cost: data[i].cost,
          installs: data[i].installs,
          revenue: data[i].revenue,
          convertions: data[i].convertions,
          tags: {
            agent: data[i].campaign_name.agent,
            app: data[i].campaign_name.app,
            region: data[i].campaign_name.region
          }
        })
      }
    }

    combined_data.push({
      source_name: sorted_data[j].source_name,
      data: combined,
      errors: sorted_data[j].errors
    })
  }

  console.log("..source and tracker data combined")
  return combined_data
}

function countTotals(data) {
   const totals = []
   data.forEach(source => {
     var total = {
      source_name: source.source_name,
      total_convertions: source.data.reduce((sum, unit) => {
        return sum + unit.convertions;
      }, 0),
      total_revenue: source.data.reduce((sum, unit) => {
        return sum + unit.revenue;
      }, 0),
      total_installs: source.data.reduce((sum, unit) => {
        return sum + unit.installs;
      }, 0),
      total_cost: source.data.reduce((sum, unit) => {
        return sum + unit.cost;
      }, 0),
      total_profit: 0,
      total_roi: 0,
    }
    total.total_profit = total.total_revenue - total.total_cost
    total.total_roi = (total.total_revenue - total.total_cost) / total.total_cost 

    totals.push(total)
   })

   console.log("..totals counted")
   return totals
}

function countByRegion(data) {
  var regions_by_source = []
  
  data.forEach(source => {
    var regions = []
    const data = source.data

    data.sort((a, b) => 
      a.tags.region.localeCompare(b.tags.region) 
    );
    
    for(var i = 0; i < data.length; i++) {
      if(regions.length > 0 && regions[regions.length-1].region == data[i].tags.region) {
        regions[regions.length-1].revenue += data[i].revenue
        regions[regions.length-1].convertions += data[i].convertions
        regions[regions.length-1].cost += data[i].cost
        regions[regions.length-1].installs += data[i].installs
      } else {
        regions.push({
          region: data[i].tags.region,
          cost: data[i].cost,
          installs: data[i].installs,
          revenue: data[i].revenue,
          convertions: data[i].convertions,
          profit: 0,
          roi: 0,
        })
      }
    }

    regions_by_source.push({
      source: source.source_name,
      regions: regions
    })

    regions.forEach(region => {
      region.profit = region.revenue - region.cost
      region.roi = (region.revenue - region.cost) / region.cost
    })

    regions.sort((a, b) => b.profit - a.profit);
  })

  console.log("..regions counted")
  return regions_by_source
}

function countByApp(data) {
  var apps_by_source = []
  
  data.forEach(source => {
    var apps = []
    const data = source.data

    data.sort((a, b) => 
      a.tags.app.localeCompare(b.tags.app) 
    );
    
    for(var i = 0; i < data.length; i++) {
      if(apps.length > 0 && apps[apps.length-1].app == data[i].tags.app) {
        apps[apps.length-1].revenue += data[i].revenue
        apps[apps.length-1].convertions += data[i].convertions
        apps[apps.length-1].cost += data[i].cost
        apps[apps.length-1].installs += data[i].installs
      } else {
        apps.push({
          app: data[i].tags.app,
          cost: data[i].cost,
          installs: data[i].installs,
          revenue: data[i].revenue,
          convertions: data[i].convertions,
          profit: 0,
          roi: 0,
        })
      }
    }

    apps_by_source.push({
      source: source.source_name,
      apps: apps
    })

    apps.forEach(app => {
      app.profit = app.revenue - app.cost
      app.roi = (app.revenue - app.cost) / app.cost
    })

    apps.sort((a, b) => b.profit - a.profit);
  })

  console.log("..apps counted")
  return apps_by_source
}
