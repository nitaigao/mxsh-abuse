const request = require('request')

exports.handle = function(e, ctx, cb) {
  console.log(e)
  records = e.Records
  recipients = records.map(record =>
    JSON.parse(record.Sns.Message).complaint.complainedRecipients.map(recipient => 
        recipient.emailAddress.replace('<', '').replace('>', '')))
  const offenders = [].concat.apply([], recipients)
  offenders.forEach(offender => {
    console.log(`reporting ${offender}`)
    request.post('https://mxsh.io/api/abuse/complaints').form({email: offender})
  })
  console.log("Finished")
  cb(null)
}