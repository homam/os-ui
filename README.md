## Setup:

1. Make sure you have node version 8.10.0. (You can use [nvm](https://github.com/creationix/nvm), run `nvm use v8.10.0`)
2. Install [yarn](https://yarnpkg.com/en/)

## Client-Side Development

`cd client`

1. `yarn install`
2. `page=first yarn dev` and open [http://127.0.0.1:8080/?xcid=Z0JBQQ](http://127.0.0.1:8080/?xcid=Z0JBQQ)


### Code Structure

`first` landing page is in `./client/src/landing-pages/first/` directory.

Files in this directory:

* `Root.tsx` is the main component for the landing page
* `index.tsx`, `index.ssr.tsx`, `hotReload.tsx` are boilerplates, don't worry about them.

### Available Pages:

* `page=first yarn dev`
* `page=ipad-desktop yarn dev`
  
### Create a New Page

```
yarn new-page
```

And answer the questions.

### Generate Server-side rendering

Inside `client`,

1. `page=first yarn build:ssr:all`

### Documentation

`yarn docz:dev` will give you a URL like (http://localhost:3000), open this URL on your browser.

## Server development

First make sure that you have built the pages for server-side rendering. (above) 

`cd server`

1. `yarn install`
2. `yarn dev-server` and open [http://localhost:3030/Z0JBQQ](http://localhost:3030/Z0JBQQ)

----

Development Without React:

```
noReact=true page=love-horoskop html=true yarn dev
```

Development Without CSS Modules:

```
page=love-horoskop html=true yarn dev
```