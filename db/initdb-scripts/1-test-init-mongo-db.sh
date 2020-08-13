#!/bin/bash

mongo ${MONGO_INITDB_DATABASE} --port ${MONGO_PORT} -u ${MONGO_APP_USER} -p ${MONGO_APP_PASS}  --authenticationDatabase ${MONGO_INITDB_DATABASE} --eval "db.test.insert( { msg: 'hello world'} )"
