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