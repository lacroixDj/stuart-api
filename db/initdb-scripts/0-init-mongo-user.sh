#!/bin/bash

mongo --port ${MONGO_PORT} -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase admin --eval "db = db.getSiblingDB('${MONGO_DB}'); db.createUser({user: '${MONGO_DB_USER}', pwd: '${MONGO_DB_PASS}', roles:[{role:'readWrite', db: '${MONGO_DB}'}]}); "



