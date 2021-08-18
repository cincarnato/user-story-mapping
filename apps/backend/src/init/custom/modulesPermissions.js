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

import {
    RETROSPECTIVE_PROJECT_SHOW,
    RETROSPECTIVE_PROJECT_UPDATE,
    RETROSPECTIVE_PROJECT_CREATE,
    RETROSPECTIVE_PROJECT_DELETE
} from '../../modules/retrospective/permissions/RetrospectiveProject'

import {
    CATEGORY_SHOW,
    CATEGORY_UPDATE,
    CATEGORY_CREATE,
    CATEGORY_DELETE
} from '../../modules/retrospective/permissions/Category'



export default [
    BASE_SHOW,
    PROJECT_CREATE,
    PROJECT_SHOW,
    PROJECT_UPDATE,
    PROJECT_DELETE,
    RETROSPECTIVE_PROJECT_SHOW,
    RETROSPECTIVE_PROJECT_UPDATE,
    RETROSPECTIVE_PROJECT_CREATE,
    RETROSPECTIVE_PROJECT_DELETE,
    CATEGORY_SHOW,
    CATEGORY_UPDATE,
    CATEGORY_CREATE,
    CATEGORY_DELETE
]
