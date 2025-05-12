# Brewhaus

This repo uses the Open Brewery API. It uses Vue3/Typescript for the frontend and has a Node/Express.js backend.

## Project Setup

#### Install NPM dependencies

```sh
npm install
```

#### Run the frontend

```sh
npm run dev

# Running on: http://localhost:5173
```

#### Run the backend

```sh
npm run server

# Running on: http://localhost:9000
```

## Features

- Home page will list the first 25 breweries
- Inifinte Scrolling: will fetch 25 more at a time
- Search Ahead: debounced by 250ms
