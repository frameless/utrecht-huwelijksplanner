rm tmp/agenda.json tmp/agenda-specific.json

curl --verbose \
  --url "https://huwelijksplanner-gateway.commonground.nu/api/calendar/availabilitycheck?start=2022-01-01&interval=PT1H" \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --output tmp/agenda.json

curl --verbose --request GET \
  --url "https://huwelijksplanner-gateway.commonground.nu/api/calendar/availabilitycheck?start=2022-01-01&stop=2023-01-01&interval=PT1H&resources_could[]=http://huwelijksplanner.nl/api/sdg/api/v1/producten/f3603321-b592-41b5-a2c7-949f493dbd99&resources_could[]=http://huwelijksplanner.nl/api/sdg/api/v1/producten/d8f8a46b-9b89-4a66-8187-4f5e4c7043ba&resources_could[]=http://huwelijksplanner.nl/api/sdg/api/v1/producten/1387be9f-254e-422b-a56a-b6d6d3a2f063" \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --output tmp/agenda-specific.json
