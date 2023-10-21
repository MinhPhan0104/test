#!/bin/sh
sudo cp ../node_modules.zip .
sudo unzip node_modules.zip
ts-node index.ts > stdout.txt 2> stderr.txt &
