#!/usr/bin/env bash

# input directory with json files
DIR=$1

for i in ${DIR}/*.json;
do
    jsonlint-php "$i"
    echo ""
done
