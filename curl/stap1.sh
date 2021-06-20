curl --verbose --request POST \
  --url https://huwelijksplanner-gateway.commonground.nu/api/huwelijken \
  --header "Authorization: ${API_TOKEN}" \
  --header 'Content-Type: application/json' \
  --data '{ "partners": [] }'

# TODO: `; charset=utf-8` does not work
#--header 'Content-Type: application/json; charset=utf-8' \
