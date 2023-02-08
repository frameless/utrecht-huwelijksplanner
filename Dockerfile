FROM node:18.14-alpine3.17

ENV SHELL /bin/bash

ARG TZ=Europe/Amsterdam
ENV TZ Europe/Amsterdam

USER node

WORKDIR /var/www

COPY --chown=node:node package.json package-lock.json ./

ARG HUSKY_SKIP_INSTALL=true
ARG NODE_ENV
ARG NPM_REGISTRY
ARG NPM_STRICT_SSL
ARG NPM_TOKEN

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

ADD --chown=node:node ./ /var/www/

RUN if test "$NODE_ENV" != 'development'; \
then \
    npm config set "//registry.npmjs.org/:_authToken" "${NPM_TOKEN}" \
    && NODE_ENV=development npm ci --no-update-notifier \
    && npm run build \
    && npm prune \
    && npm config set "//registry.npmjs.org/:_authToken" "" \
    && npm cache clean --force 2> /dev/null \
; fi

EXPOSE 3000

ENTRYPOINT ["npm", "run"]

CMD ["start"]