# arc-plugin-marko

A plugin for using [Marko](https://github.com/marko-js/marko) with
[architect](https://arc.codes/).

## Installation

This plugin contains both build-time code and runtime code, you will need to
install it in the root of your architect project as well as each architect
route that will be serving Marko templates:

```bash
npm install arc-plugin-marko --save
```

## Usage

[marko-architect-todomvc](https://github.com/marko-js-samples/marko-architect-todomvc)
is a fully functioning sample app using this plugin.

Inside the `.arc` file inside your project, you will need to specify the `pages`
property, which are the absolute paths to the pages that will be served, and the
`bucket` property, which a globally unique [AWS S3](https://aws.amazon.com/s3/)
bucket.

**.arc**
```
...
@plugins
arc-plugin-marko
  pages ./src/html/get-index/page.marko
  bucket marko-todomvc-bucket
```

Then you need to register the runtime code for each page that should be rendered:

**src/html/get-index/index.js**
```js
exports.handler = require('arc-plugin-marko/runtime').run({
  template: require('./page')
})
```

Example of a top-level page:

**src/html/get-index/page.marko**

```marko
<!doctype html>
<html>
  <head>
    <title>Marko + Arc = <3</title>
  </head>
  <body>
    <my-fancy-button/>
  </body>
</html>
```

## Plugin API Configuration

Supported properties that can be passed to the plugin:

* *{Object} options.pages* - [**Required**] Absolute path to all Marko top-level
  pages to render
* *{String} options.bucket* - Globally unique [AWS S3](https://aws.amazon.com/s3/)
 bucket name
* *{Object} options.config* - Custom [Lasso](https://github.com/lasso-js/lasso)
  configuration

## Plugin Runtime API

API for `require('arc-plugin-marko/runtime')`

* **run**(options)
  * *{Object} options.template* - [**Required**] template module to render
  * *{Object} options.buildConfig* - Custom [Lasso](https://github.com/lasso-js/lasso)
    configuration
  * *{Object} options.data* - Data that will be passed to the Marko template
  * *{Function} options.onDone* - Callback function to call when the Marko
    template has finished rendering
  * *{Function} options.onError* - Callback function to call if the Marko
    template render failed with an error
