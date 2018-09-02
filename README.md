# Kayrana

The [backend api](./api) uses an express nodejs server.

The [frontend app](./app) was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.


## Development server

### API

To run the API simply run on the terminal

```bash    
docker-compose docker-compose up -d
```

The API will be available at `http://localhost:3000`

### APP

Unfortunately the APP does not have a docker image and it will be necessary to install NodeJs and NPM.

Run in your terminal

```bash    
npm install
```

```bash    
npm start
```

Navigate to `http://localhost:4200`. The app will automatically reload if you change any of the source files.

