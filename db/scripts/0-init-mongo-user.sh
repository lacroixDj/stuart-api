#!/bin/bash

mongo --port ${MONGO_PORT} -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase admin --eval "db = db.getSiblingDB('${MONGO_INITDB_DATABASE}'); db.createUser({user: '${MONGO_APP_USER}', pwd: '${MONGO_APP_PASS}', roles:[{role:'readWrite', db: '${MONGO_INITDB_DATABASE}'}]}); "



