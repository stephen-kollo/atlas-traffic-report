function doGet() {
  const iconUrl = 'https://ps.w.org/menu-image/assets/icon-128x128.png'
  return HtmlService.createTemplateFromFile('index').evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle('Atlas Traffic Report')
    .setFaviconUrl(iconUrl)
} 

function includeExternalFile(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent()
}

function createTrafficReport(){
  const report_sheets = createReportBlank()
  const settings_sheets = SpreadsheetApp.getActiveSpreadsheet()

  const responce = __main(report_sheets, settings_sheets)
  
  return { url: report_sheets.getUrl(), errors: responce.errors }
}
