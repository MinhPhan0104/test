#! /bin/bash
cd /home
sudo rm -rf ws-test
sudo git clone https://github.com/MinhPhan0104/ws-test.git
sudo chmod 777 ws-test/
cd ws-test/
sudo chmod +x run.sh
cp -r node_modules /home/ws-test/
sudo cd /home/ws-test
npm start
