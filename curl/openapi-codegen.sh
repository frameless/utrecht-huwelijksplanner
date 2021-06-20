npx -p openapi-typescript-codegen@0.23.0 openapi --exportCore true --input ../src/openapi/Agenda-Service.yaml --output ../src/generated/openapi/Agenda-Service/
npx -p openapi-typescript-codegen@0.23.0 openapi --exportCore true --input ../src/openapi/Overige-Objecten.yaml --output ../src/generated/openapi/Overige-Objecten/
npx -p openapi-typescript-codegen@0.23.0 openapi --exportCore true --input ../src/openapi/trouwservice.yaml --output ../src/generated/openapi/trouwservice/

mkdir -p ../src/generated/openapi/Agenda-Service/core/
mkdir -p ../src/generated/openapi/Overige-Objecten/core/
mkdir -p ../src/generated/openapi/trouwservice/core/

cp ../src/openapi/core/OpenAPI.ts ../src/generated/openapi/Overige-Objecten/core/
cp ../src/openapi/core/OpenAPI.ts ../src/generated/openapi/trouwservice/core/
cp ../src/openapi/core/OpenAPI.ts ../src/generated/openapi/Agenda-Service/core/