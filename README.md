# ItemsAPI dashboard

This project is an angular.js dashboard for <a href="https://www.itemsapi.com" target="_blank">ItemsAPI</a>.  

Initially it was mostly for demo purposes but now it allows you to:
- create your own search api by providing json data
- search and manage your items
- integrate with heroku easily

![](https://media.giphy.com/media/1iYG1Zaf12Yrk6T6/giphy.gif)


## Requirement

- node.js

## Heroku installation

<a target="_blank" href="https://heroku.com/deploy?template=https://github.com/itemsapi/dashboard"><img src="https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67" alt="Deploy" data-canonical-src="https://www.herokucdn.com/deploy/button.png"></a>

## Installation (ubuntu 14.04)

Clone ItemsAPI Dashboard repository from github:

```bash
$ git clone https://github.com/itemsapi/dashboard.git
```

Node.js:
```bash
$ sudo apt-get install curl
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ sudo npm update npm -g
```

local npm packages (in your project directory):
it will install bower packages as well
```bash
$ npm install --production
```

## Configuration and Run

```bash
$ npm start
```

Open http://localhost:3000 in your browser

## Demo

- http://app.itemsapi.com/

## Example data

- https://github.com/itemsapi/itemsapi-example-data/tree/master/items
- https://raw.githubusercontent.com/itemsapi/itemsapi-example-data/master/items/restaurants.json

## Contribution

This is early stage of the dashboard. There is still lot of works, improvements. If you want to help you can:

- make code review and suggest improvements
- share your ideas
- add new pull requests

## License

ItemsAPI dashboard is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.
