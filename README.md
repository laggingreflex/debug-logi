# debug-logi

A wrapper around [debug-logger] with some extra (opinionated) features and defaults, and a simpler ready-to-use interface inspired by [logi].

[debug-logger]: https://www.npmjs.com/package/debug-logger
[logi]: https://www.npmjs.com/package/logi

```js
import log from 'debug-logi'

log('hi!')
// :log  hi

log.err('oh no!')
// :err  oh no!

log.verb('ose')
// (no output, unless DEBUG=:verbose)
```
```js
import {createLogger} from 'debug-logi'

const log = createLogger('app')
log('hi!')
// app:log  hi
log.verb('ose')
// (no output, unless DEBUG=:verbose)
```
```js
import {createLogger} from 'debug-logi'

const log = createLogger({verbose: true})
log.verb('now enabled')
// :verb  now enabled
```