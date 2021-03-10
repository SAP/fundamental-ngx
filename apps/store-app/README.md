# Store Demo App

In order to run this demo, you'll not only need to serve the Angular application, but you'll also need to start the demo REST service. The demo REST service uses [json-server](https://www.npmjs.com/package/json-server).

## Installing json-server

json-server needs to be installed globally. To install, run:
```
npm install -g json-server
```

## How to start the demo

To run the demo, you'll need to navigate to the data JSON file, `db.json` and start `json-server`:

```
$ cd apps/store-app/src/server
$ json-server db.json --routes routes.json
```

Once the REST service is up and running, in another shell start the application using usual `ng` command:

```
$ ng serve store-app
```
