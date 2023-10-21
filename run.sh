#! /bin/bash
cd /home & sudo rm -rf /home/ws-test
cd /home & sudo git clone https://github.com/MinhPhan0104/ws-test.git
sudo cp -r node_modules /home/ws-test/
sudo chmod 777 /home/ws-test/
cd /home/ws-test & npm start
