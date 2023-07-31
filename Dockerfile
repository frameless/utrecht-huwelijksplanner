FROM node:18.14-alpine3.17

ENV SHELL /bin/bash

ARG TZ=Europe/Amsterdam
ENV TZ Europe/Amsterdam


WORKDIR /var/www

COPY package.json package-lock.json ./

ARG HUSKY_SKIP_INSTALL=true
ARG NODE_ENV
ARG NPM_REGISTRY
ARG NPM_STRICT_SSL
ARG NPM_TOKEN
ARG NEXT_PUBLIC_API_URL

RUN echo $NEXT_PUBLIC_API_URL

RUN if test "$NODE_ENV" = 'development'; \
then \
    npm config set "//registry.npmjs.org/:_authToken" "${NPM_TOKEN}" \
    && npm ci --no-update-notifier \
    && npm config set "//registry.npmjs.org/:_authToken" "" \
    && npm cache clean --force 2> /dev/null \
; fi

# After building the application, remove the `devDependencies`
# for when NODE_ENV is "production" using a production mode install,
# leaving only the packages needed for production.

ADD ./ /var/www/

RUN if test "$NODE_ENV" != 'development'; \
then \
    npm config set "//registry.npmjs.org/:_authToken" "${NPM_TOKEN}" \
    && NODE_ENV=development && npm ci --no-update-notifier \
    && npm run build \
    && npm prune \
    && npm config set "//registry.npmjs.org/:_authToken" "" \
    && npm cache clean --force 2> /dev/null \
; fi

ARG BUILD_DATE
ARG VCS_REF

LABEL \
    org.label-schema.build-date="${BUILD_DATE}" \
    org.label-schema.description="Utrecht Huwelijksplanner front-end" \
    org.label-schema.name="utrecht-huwelijksplanner" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.url="https://github.com/frameless/utrecht-huwelijksplanner/" \
    org.label-schema.usage="https://github.com/frameless/utrecht-huwelijksplanner/blob/develop/README.md" \
    org.label-schema.vcs-ref="${VCS_REF}" \
    org.label-schema.vcs-url="https://github.com/frameless/utrecht-huwelijksplanner.git" \
    org.label-schema.vendor="Frameless B.V." \
    org.label-schema.version="8.10"

EXPOSE 3000

ENTRYPOINT ["npm", "run"]

CMD ["start"]