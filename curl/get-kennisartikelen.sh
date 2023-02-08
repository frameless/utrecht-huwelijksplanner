#!/bin/sh -e

curl --verbose --request GET \
  --url https://huwelijksplanner-gateway.commonground.nu/api/sdg/kennisartikel \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --output tmp/kennisartikelen.json