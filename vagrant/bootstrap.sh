#!/usr/bin/env bash

sudo apt-get update
sudo apt-get install -y php-cli php-mbstring php-intl composer zip php-zip php-xml ruby-sass

echo "cd /vagrant" >> /home/vagrant/.bashrc
