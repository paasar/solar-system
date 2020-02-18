# Solar system visualization with Three.js

See it live here: https://paasar.github.io/solar-system

This is a Three.js project to visualize Solar system.

It is also a project for me to improve my TypeScript skills.

Started with Typescript Three.js Webpack Starter https://github.com/pinqy520/three-typescript-starter.git

## Usage

### Install Typscript

```
yarn global add typescript
```

### Start

```
$ yarn
$ yarn start
```

### Deploy

First build the program.

```
$ yarn build
```

Then copy `index.html` and JS-bundle to repository root and push changes to origin.
```
$ cp dist/index.html dist/solar.bundle.js .
$ git add & commit... & push
```

Or to deploy somewhere else just copy `dist/index.html`, `dist/solar.bundle.js` and `assets` directory where ever you want to serve it from.

## Textures

Textures from https://www.solarsystemscope.com/textures/

## Copyright

CC BY-NC 4.0 @ Ari Paasonen
