#!/bin/bash
docker stop currency-api && docker rm currency-api
wait
docker build -t currency-api . 
wait
docker run -p 3001:3001 --name currency-api --network mynetwork -d currency-api
