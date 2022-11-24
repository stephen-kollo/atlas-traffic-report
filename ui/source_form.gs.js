function createSourceLinkForm() {
  const sources = getSourcesEnv()
  return HtmlService.createHtmlOutput(
    createSourceLinkFormHtml(sources)
  ).getContent()
}

function createModalHtml(source_id, source) {

  const createLine = (source_id, source_name, type, value) => {
    return `
    <div class="input-group mb-3">
      <div style="width: 80%;" class="input-group-prepend">
        <span class="input-group-text" id="modal-${source_name}-${type}">${type}</span>
      </div>
      <input type="text" id="source-${source_id}-data-${type}" class="form-control" aria-describedby="modal-${source_name}-${type}" value="${value}" placeholder="${value}">
    </div>
    `
  }

  const createLinkLine = (source_id, source_name, type, value) => {
    return `
    <div class="input-group mb-3">
      <div style="width: 30%;" class="input-group-prepend">
        <span class="input-group-text" id="modal-${source_name}-${type}">${type}</span>
      </div>
      <input type="text" id="source-${source_id}-data-${type}" class="form-control" aria-describedby="modal-${source_name}-${type}" value="${value}" placeholder="${value}">
    </div>
    `
  }
  
  var html = `
  <!-- Button trigger modal -->
  <button style="margin-bottom: 10px; border-radius: 50px;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#${source.source_name}-modal">
   ✏️ ${source.source_name.charAt(0).toUpperCase() + source.source_name.slice(1)}
  </button>

  <!-- Modal -->
  <div class="modal fade" id="${source.source_name}-modal" tabindex="-1" role="dialog" aria-labelledby="${source.source_name}-modalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="${source.source_name}-modalLabel">Column numbers: ${source.source_name}</h5>
        </div>
        <div class="modal-body">
            ${createLine(source_id, source.source_name, "tracker-campaign-name", source.tracker_camp_name)}
            ${createLine(source_id, source.source_name, "tracker-convertions", source.tracker_convertions)}
            ${createLine(source_id, source.source_name, "tracker-revenue", source.tracker_revenue)}
            ${createLine(source_id, source.source_name, "source-campaign-name", source.source_camp_name)}
            ${createLine(source_id, source.source_name, "source-installs", source.source_installs)}
            ${createLine(source_id, source.source_name, "source-cost", source.source_cost)}
            ${createLinkLine(source_id, source.source_name, "tracker-link", source.tracker_link)}
            ${createLinkLine(source_id, source.source_name, "source-link", source.source_link)}
        </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button id="source-${source_id}-modal-save-changes-button" type="button" class="btn btn-primary source-save-changes-button">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  `
  return html
}


function createSourceLinkFormHtml(sources) {
  var html = 
  `
  <h4 class="section-title">Sources</h3>
  <div style="display: inline;">
  `
  for(let i = 0; i < sources.length; i++) {
    const source = sources[i]
    html = html + 
    `
    ${createModalHtml(i, source)}
    `
  }

  return html + "</div>"
}
