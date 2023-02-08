#!/bin/sh -e

curl --verbose --request POST \
  --url https://huwelijksplanner-gateway.commonground.nu/api/assents \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "name": "Gerda Getuige", "description": "U wordt uitgenodigd als getuige bij een huwlijk", "request": "string", "forwardUrl": "", "property": "partners", "process": "http://localhost:3000/assent/", "contact": "string", "person": "string", "status": "", "requester": "228807323", "revocable": true }' \
  --output tmp/getuige-1-assent.json

curl --verbose --request POST \
  --url https://huwelijksplanner-gateway.commonground.nu/api/assents \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "name": "Gerard Getuige", "description": "U wordt uitgenodigd als getuige bij een huwlijk", "request": "string", "forwardUrl": "", "property": "partners", "process": "http://localhost:3000/assent/", "contact": "string", "person": "string", "status": "", "requester": "228807323", "revocable": true }' \
  --output tmp/getuige-2-assent.json

curl --verbose --request POST \
  --url https://huwelijksplanner-gateway.commonground.nu/api/assents \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "name": "Gosse Getuige", "description": "U wordt uitgenodigd als getuige bij een huwlijk", "request": "string", "forwardUrl": "", "property": "partners", "process": "http://localhost:3000/assent/", "contact": "string", "person": "string", "status": "", "requester": "228807323", "revocable": true }' \
  --output tmp/getuige-3-assent.json

curl --verbose --request POST \
  --url https://huwelijksplanner-gateway.commonground.nu/api/assents \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Accept-Type: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "name": "Gonny Getuige", "description": "U wordt uitgenodigd als getuige bij een huwlijk", "request": "string", "forwardUrl": "", "property": "partners", "process": "http://localhost:3000/assent/", "contact": "string", "person": "string", "status": "", "requester": "228807323", "revocable": true }' \
  --output tmp/getuige-4-assent.json
