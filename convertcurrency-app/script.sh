#!/bin/bash
docker stop currency-api && docker rm currency-api
wait
docker build -t currency-api . 
wait
docker run -p 8080:8080 --name currency-api --network mynetwork -d currency-api
