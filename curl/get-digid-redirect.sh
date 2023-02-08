#!/bin/sh -e

curl --verbose --request GET \
  --url https://huwelijksplanner-gateway.commonground.nu/api/user/inloggen/digid?forward=https://localhost:3000/digid-success&error=https://localhost:3000/digid-failure \
  --header 'Authorization: 7ae53442-1269-407e-a6ea-f630a28ae019'

# TODO message":"Could not find an Endpoint with this path and\/or method","data":{"path":"user\/inloggen\/digid","method":"GET"},"path":"user\/inloggen\/digid"}