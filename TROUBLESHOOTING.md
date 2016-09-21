# Common problems

## Recommendations

There are some problems with running dashboard with the latest version of npm@3.10.7. 
npm@3.8.6 is recommended (it is also used on heroku)

```bash
$ sudo npm install npm@3.8.6 -g
```

## Styles are not loaded

That can be a problem with bower (happened on digitalocean). Install it manually.

```bash
$ sudo npm install bower -g
$ bower install
```
