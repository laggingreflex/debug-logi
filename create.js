const debugLogger = require('debug-logger')
const levels = require('./levels')
const modErr = require('./err')

module.exports = createLogger

function createLogger(namespace, config) {
  if (typeof namespace === 'object') {
    config = namespace
    namespace = config.namespace
  }
  namespace = namespace || ''
  config = config || {}

  debugLogger.levels = config.levels || levels
  debugLogger.inspectOptions = {
    colors: config.noColors ? false : config.colors,
  }

  debugLogger.debug.enable(Object.entries({
    log: true,
    error: true,
    warn: true,
    debug: config.debug || config.verbose >= 1,
    info: config.verbose >= 2,
    verbose: config.verbose,
    silly: config.verbose >= 3,
    trace: config.verbose >= 3,
    '*': config.verbose >= 3,
  }).filter(([, v]) => v).map(([l]) => l).map(e => namespace + ':' + e).join(','));

  const logger = debugLogger(namespace)

  modErr(logger)

  const log = logger.log
  log.logger = logger
  Object.assign(log, logger)

  log.createLogger = (n, c) => {
    if (typeof n === 'object') {
      c = n
      n = c.n
    }
    c = Object.assign({}, c, config)
    n = n ? ((namespace ? (namespace + (config.sep || ':')) : '') + n) : namespace
    return createLogger(n, c)
  }

  return log
}
