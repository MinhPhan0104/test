#! /bin/bash
sudo rm -rf /home/ws-test
cd /home & sudo git clone https://github.com/MinhPhan0104/ws-test.git
sudo chmod 777 /home/ws-test/
sudo chmod +x /home/ws-test/run.sh
cp -r node_modules /home/ws-test/
cd /home/ws-test & npm start
