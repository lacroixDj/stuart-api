#!/bin/bash

mongo ${MONGO_DB} --port ${MONGO_PORT} -u ${MONGO_DB_USER} -p ${MONGO_DB_PASS}  --authenticationDatabase ${MONGO_DB} --eval "db.test.insert( { msg: 'hello world'} )"
