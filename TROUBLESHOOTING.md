# Common problems

## Recommendations

There are some problems with running dashboard with the latest version of npm@3.10.7. 
npm@3.8.6 is recommended (it is also used on heroku)

Update npm to proper version

```bash
$ sudo npm install npm@3.8.6 -g
```

## Styles are not loaded

That can be a problem with bower (happened on digitalocean). Install it manually in your directory.

Install bower and whole frontend side
```bash
$ sudo npm install bower -g
$ bower install
```

## Elasticsearch version

Dashboard was tested only with Elasticsearch 1.7. Not sure if that works with Elasticsearch 2.4. There is a plan to make more automated tests and improve returning proper error information.
