curl --verbose --request GET \
  --url https://huwelijksplanner-gateway.commonground.nu/api/huwelijken \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --output tmp/huwelijken.json

npx prettier --write tmp/*.json