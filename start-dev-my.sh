#!/usr/bin/env bash

#################################
## Run application in DEV mode ##
#################################


started_at=$(date +"%s")
service postgresql stop
echo "-----> Provisioning containers"
docker-compose -f docker-compose.dev.yaml up -d
echo ""
