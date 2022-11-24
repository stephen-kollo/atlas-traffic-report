function createAdvancedSettingsForm() {
  const validationSchema = getValidationEnv()
  return HtmlService.createHtmlOutput(
    createAdvancedSettingsFormHtml(validationSchema)
  ).getContent()
}

function createAdvancedSettingsFormHtml(validationSchema) {
  var appsHtml = createAttractiveButtons(validationSchema.apps, 'apps')
  var regionsHtml = createAttractiveButtons(validationSchema.regions, 'regions')

  var html = 
  `
  <style>
    .apps-container {
      max-width: 850px;
      display: flex;
      flex-wrap: wrap;
    }

    .app-container {
      max-width: 850px;
      display: flex;
      flex-wrap: wrap;
    }

    .remove-icon {
      margin-right: 3px;
      margin-left: 3px;
      vertical-align: center;
    }

    .add-icon {
      margin-right: 3px;
      margin-left: 3px;
      vertical-align: center;
    }

    .app-text {
      margin-top: 2px;
      vertical-align: center;
    }

    .icon-btn {  
        color: gray;
        border: none;
        background: #e8e8e8;
        margin: 3px;
        text-align: center;
        vertical-align: center;
        display: flex;
        width: fit-content;
        block-size: fit-content;
        padding: 1px 15px 3px 1px;
        border-radius:50px;
    }
    .icon-add-btn {  
        border: none;
        margin: 3px;
        text-align: center;
        vertical-align: center;
        display: flex;
        width: fit-content;
        block-size: fit-content;
        padding: 1px 15px 3px 1px;
        border-radius:50px;
    }

    .add-item-input {
      width: 200px;
      border-radius: 50px;
    }

    .add-item-form {
      display: none;
      width: 300px;
      background: transparent;
      border: none;
      border-bottom: 1px solid #e8e8e8;
      -webkit-box-shadow: none;
      box-shadow: none;
      border-radius: 0;
    }

    .add-item-form:focus {
      -webkit-box-shadow: none;
      box-shadow: none;
    }

  </style>
  <div class="line"></div>
  <h4 class="section-title">Apps</h3>
  <div id="apps-container" class="app-container">
    ${appsHtml}
  </div>
  <div class="line"></div>
  <h4 class="section-title">Regions</h3>
  <div id="regions-container" class="app-container">
    ${regionsHtml}
  </div>
  <div class="line"></div>
  `
  return html
}


function createAttractiveButtons(data, groupName){
  const removeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`
  const addIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>`

  var html = ""

  for(let i = 0; i < data.length; i++) {
    const unit = data[i]
    html = html + `
      <a id="${groupName}-item-button-${i}" class="btn icon-btn btn-secondary ${groupName}-item-button" >
        <div class="remove-icon">${removeIcon}</div>
        <span class="app-text">${unit}</span>
      </a>
    `
  }

  html = html + `
    <a id="${groupName}-item-button-add" class="btn icon-add-btn btn-primary" >
      <div class="add-icon">${addIcon}</div>
      <span class="app-text">Add</span>
    </a>
    <input id="${groupName}-item-input" class="form-control form-control-sm add-item-form" type="text" placeholder="Type ${groupName} separated by commas">
  `
  
  return html
}
