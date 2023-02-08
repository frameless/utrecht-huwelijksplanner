#!/bin/sh -e

curl --verbose --request POST \
  --url https://huwelijksplanner-gateway.commonground.nu/api/assents \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "name": "Anne Nico Johannes Deursen", "description": "U begint de aanvraag", "request": "string", "forwardUrl": "", "property": "partners", "process": "http://localhost:3000/assent/", "contact": "string", "person": "string", "status": "granted", "requester": "259730890", "revocable": true }' \
  --output tmp/new-assent-myself.json