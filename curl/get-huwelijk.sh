#!/bin/sh -e

ID=7e5c7bfd-db51-41f8-b409-d594d7d6a4d7

curl --verbose --request GET \
  --url "https://huwelijksplanner-gateway.commonground.nu/api/huwelijken/${ID}?extend[]=partners&extend[]=getuigen" \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --output tmp/huwelijk.json