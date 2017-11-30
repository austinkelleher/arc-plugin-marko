require('marko/compiler').configure({ writeToDisk: false })

const arc = require('@architect/functions')
const getDefaultBuildConfig = require('./getDefaultBuildConfig')

function route (template, data, onDone, onError) {
  return function (req, res) {
    let renderPromise = template.render(data) // eslint-disable-line no-unused-vars
      .then(out => res({ html: out.getOutput() }))

    if (onDone) {
      renderPromise = renderPromise.then(onDone)
    }

    renderPromise = renderPromise.catch(onError || function (err) {
      console.error('Error rendering template: ', err)
      res({ status: 500 })
    })
  }
}

let lassoConfigured = false

exports.run = function ({ template, buildConfig, data, onDone, onError }) {
  if (!lassoConfigured) {
    const config = Object.assign({}, buildConfig || getDefaultBuildConfig(process.cwd()), {
      loadPrebuild: true
    })

    require('lasso').configure(config)
    lassoConfigured = true
  }
  return arc.html.get(route(template, data, onDone, onError))
}
