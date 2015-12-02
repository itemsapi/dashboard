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

Currently it is a basic installation version of Dashboard. Later there will be added instructions how to compile it with grunt and use for production purposes.

## Configuration and Run

- to change your backend URL to your own go to `app/scripts/app.js` and change `baseUrl` (you can use demo url http://cloud.itemsapi.com/api/v1)
- to run application open http://dashboard.cms/app in the browser

## Demo

- http://app.itemsapi.com/

## Contribution

This is early stage of the dashboard. There is still lot of works, improvements. If you want to help you can:

- ask for new feature
- make code review and suggest improvements
- share your ideas
- add new pull requests

## License

ItemsAPI dashboard is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.
