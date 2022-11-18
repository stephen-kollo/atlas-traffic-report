function main() {
  const _env = createEnv()
  const cleaned_data = cleanRawData(_env.raw_data_env)
  const data = processData(cleaned_data, _env.validation_data)
  const report = createReport(data)
  printReport(report)  
}
