#!/bin/sh -e

curl --verbose --request GET \
  --url "https://huwelijksplanner-gateway.commonground.nu/api/sdg/api/v1/producten" \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --output tmp/producten.json

curl --verbose --request GET \
  --url "https://huwelijksplanner-gateway.commonground.nu/api/sdg/api/v1/producten?catalogus=huwelijk" \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --output tmp/producten-huwelijk.json

# curl --verbose --request GET \
#   --url "https://huwelijksplanner-gateway.commonground.nu/api/sdg/api/v1/producten" \
#   --header "Authorization: ${API_TOKEN}" \
#   --header 'Accept-Type: application/json' \
#   --output tmp/producten.json