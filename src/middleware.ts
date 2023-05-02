import { stackMiddlewares } from './middlewares/stackMiddlewares'
import { withAuthentication } from './middlewares/withAuthentication'
import { withAuthorization } from './middlewares/withAuthorization'
import { withHeaders } from './middlewares/withHeaders'
import { withLogging } from './middlewares/withLogging'

export default stackMiddlewares([
  withAuthentication,
  withAuthorization,
  withLogging,
  withHeaders,
])
