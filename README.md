## Setup:

1. Make sure you have node version 8.10.0. (You can use [nvm](https://github.com/creationix/nvm), run `nvm use v8.10.0`)
2. Install [yarn](https://yarnpkg.com/en/)

## Client-Side Development

`cd client`

1. `yarn install`
2. `country=ke page=first yarn dev` and open [http://127.0.0.1:8080/?xcid=Z0JBQQ](http://127.0.0.1:8080/?xcid=Z0JBQQ)

### Create a new Page

```
cd client
yarn new-page
```

And follow the instructions.

### Code Structure

`first` landing page is in `./client/src/landing-pages/first/` directory.

Files in this directory:

* `Root.tsx` is the main component for the landing page
* `index.tsx`, `index.ssr.tsx`, `hotReload.tsx` are boilerplate, don't worry about them.

### Update locales of a page

```
yarn update-page-locales
```

### Available Pages

* `country=ke page=first yarn dev`
* `country=ke page=ipad-desktop yarn dev`
* `country=gr page=love-horoscope yarn dev`

### Release a Page

```
country=ke page=first yarn build-and-upload-page
```

You must have `osui_aws_access_key_id` environment variable.

The command will display the preview link of the page.

---
### Documentation

#### Re-usable components:

`yarn docz:dev` will give you a URL like (http://localhost:3000), open this URL on your browser.

#### System Design Decisions

* [Why Static Web Pages?](docs/StaticWebPages.md)
* [Why Webpack?](docs/Webpack.md)
* [Why TypeScript?](docs/TypeScript.md)
* [Open Problems (TODO)](docs/TODO.md)

---

The following topics are related to advanced features that are not fully tested. 

### Generate Server-side rendering

Inside `client`,

1. `page=first yarn build:ssr:all`

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