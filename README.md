# ItemsAPI dashboard

ItemsAPI dashboard is fast angular.js web application for managing items and demo purpose.

## Requirement

- node.js
- grunt
- bower
- nginx

## Installation (ubuntu 14.04)

Node.js:
```bash
$ sudo apt-get install curl
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ sudo npm update npm -g
```

npm packages:
```bash
$ sudo npm install bower -g
$ sudo npm install grunt-cli -g
```

local npm packages (in your project directory):
```bash
$ sudo npm install
```

install bower packages (angular, templates, etc):
```bash
$ bower install
```

Nginx configuration (basic version):
```nginx
server {
	listen   80; 
    server_name dashboard.cms;

    location ^~ /app {
        expires 0;
        root   /var/www/itemsapi-dashboard/;
    }
}
```

## Demo

- http://app.itemsapi.com/
