curl --verbose --request GET \
  --url https://huwelijksplanner-gateway.commonground.nu/api/klanten \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --output tmp/klanten.json