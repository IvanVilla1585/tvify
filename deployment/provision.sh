#!/usr/bin/env bash

## Install basic development tools and nginx
apt-get update
apt-get install -y build-essential git nginx libkrb5-dev

## Install Databases
apt-get install -y mongodb redis-server

## Install Node.js 4.x from NodeSource Distributions
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

## Copy configuration to real destinations
cp /root/config/default /etc/nginx/sites-enabled/default
cp /root/config/tvify-1.conf /etc/init
cp /root/config/tvify-2.conf /etc/init
cp /root/config/tvify-3.conf /etc/init

## Install TVify
rm -rf /opt/tvify
mkdir -p /opt/tvify
tar xvfz /root/tvify-0.1.0.tgz -C /opt/tvify
cd /opt/tvify/package && npm install

## Run services
service nginx restart
service tvify-1 restart
service tvify-2 restart
service tvify-3 restart
