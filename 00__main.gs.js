function __main(report_sheets, settings_sheets) {
  const _env = createEnv(settings_sheets)
  const cleaned_data = cleanRawData(_env.raw_data_env)
  const data = processData(cleaned_data, _env.validation_data)
  const report = createReport(data)
  printReport(report, report_sheets)  
  return { errors: _env.errors }
}
