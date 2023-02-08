#!/bin/sh -e

curl --verbose --request POST \
  --url https://huwelijksplanner-gateway.commonground.nu/api/assents \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "name": "Sanne van den Broecke", "description": "U wordt uitgenodigd als partner bij een huwlijk", "request": "string", "forwardUrl": "", "property": "partners", "process": "http://localhost:3000/assent/", "contact": "string", "person": "string", "status": "", "requester": "298272921", "revocable": true }' \
  --output tmp/new-assent.json