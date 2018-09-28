## Setup:

1. Make sure you have node version 8.10.0. (You can use [nvm](https://github.com/creationix/nvm), run `nvm use v8.10.0`)
2. Install [yarn](https://yarnpkg.com/en/)

## Client-Side Development

`cd client`

1. `yarn install`
2. `page=first yarn dev` and open [http://127.0.0.1:8080](http://127.0.0.1:8080)


### Code Structure

`first` landing page is in `./client/src/landing-pages/first/` directory.

Files in this directory:

* `Root.tsx` is the main component for the landing page
* `index.tsx`, `index.ssr.tsx`, `hotReload.tsx` are boilerplates, don't worry about them.
  

### Generate Server-side rendering

Inside `client`,

1. `page=first yarn build:ssr:all`


## Server development

First make sure that you have built the pages for server-side rendering. (above) 

`cd server`

1. `yarn install`
2. `yarn dev-server` and open [http://localhost:3030/Z0JBQQ](http://localhost:3030/Z0JBQQ)
