/* ADD YOUR MODULE PERMISSIONS HERE */

import {
 BASE_SHOW
} from '../../modules/base/permissions'

import {
    PROJECT_CREATE,
    PROJECT_SHOW,
    PROJECT_UPDATE,
    PROJECT_DELETE
} from '../../modules/storymapping/permissions/Project'


export default [
    BASE_SHOW,
    PROJECT_CREATE,
    PROJECT_SHOW,
    PROJECT_UPDATE,
    PROJECT_DELETE
]
