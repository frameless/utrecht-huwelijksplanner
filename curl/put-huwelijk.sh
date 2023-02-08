#!/bin/sh -e

ID=7e5c7bfd-db51-41f8-b409-d594d7d6a4d7

curl --verbose --request PUT \
  --url "https://huwelijksplanner-gateway.commonground.nu/api/huwelijken/${ID}" \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Content-Type: application/json' \
  --data-binary '@put-huwelijk.json' \
  --output tmp/put-huwelijk.json