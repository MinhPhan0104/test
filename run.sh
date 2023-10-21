#!/bin/sh
sudo cp /home/node_modules.zip /home/ws-test
sudo cd /home/ws-test
sudo unzip node_modules.zip
/home/meomeo_development/.nvm/versions/node/v18.18.2/bin/ts-node index.ts > stdout.txt 2> stderr.txt &
