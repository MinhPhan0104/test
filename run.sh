#!/bin/sh
sudo cp ../node_modules.zip .
sudo unzip node_modules.zip
/home/meomeo_development/.nvm/versions/node/v18.18.2/bin/ts-node index.ts > stdout.txt 2> stderr.txt &
