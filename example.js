let log = require('.')

log(`I'm a log output`);
log.error(`I'm an error output`);
log.verbose(`I won't be visible unless...`);
console.log('=======================================');

log = log.createLogger({verbose: true})
log.verbose(`I'm a verbose output, still not visible because same namespace are cached (including blank ones)`);
console.log('=======================================');

log = log.createLogger('app', {verbose: true})
log(`I'm a namespaced output`);
log.verbose(`I'm a verbose output, only visible if DEBUG=:verbose or {verbose: true}`);
console.log('=======================================');

log = log.createLogger('child')
log(`I'm a child output`);
log.verbose(`with inherited config (verbose sill visible)`);
console.log('=======================================');
