#!/bin/sh -e

curl --verbose --request POST \
  --url https://huwelijksplanner-gateway.commonground.nu/api/huwelijken \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --header 'Content-Type: application/json' \
  --data-binary '@new-huwelijk.json' \
  --output tmp/new-huwelijk.json