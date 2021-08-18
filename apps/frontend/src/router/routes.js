import merge from 'deepmerge'
import baseRoutes from '../modules/base/routes'
import storymappingRoutes from '../modules/storymapping/routes'
import retrospectiveRoutes from '../modules/retrospective/routes'

import { routes as userRoutes } from '@dracul/user-frontend'
import { routes as customRoutes } from '@dracul/customize-frontend'
import { routes as notificationRoutes } from '@dracul/notification-frontend'

const routes = merge.all([baseRoutes, storymappingRoutes, retrospectiveRoutes, userRoutes, notificationRoutes, customRoutes])


export default routes;
