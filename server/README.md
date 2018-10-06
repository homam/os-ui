## Development

```
yarn dev-server 
```


To test the CDN:

```
root="https://s3.eu-central-1.amazonaws.com/mobirun/os-ui/" yarn dev-server   

```

## Production Setup

Make sure you have pm2 installed.

```
cp .setup/ecosystem.config.js.template ecosystem.config.js
```

And edit the file.

```
yarn start
```

We build the project autimatically by `prestart` command.

If you want to build it manually, use: `./node_modules/.bin/tsc -p tsconfig.json --outDir .dist`

## Enviroment Variables

```
osui_connection_string="postgresql://localhost/os-ui" # postgresql database
osui_aws_access_key_id="..."
osui_secret_access_key="..."
```

## Preview Pages without a camapign

Use `preview/?country={country}&page={page}`

For example:
```
http://localhost:3030/preview/?country=gr&page=love-horoscope
```