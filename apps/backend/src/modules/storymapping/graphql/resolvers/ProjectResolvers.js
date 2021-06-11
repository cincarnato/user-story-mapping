
import { createProject, updateProject, deleteProject,  findProject, fetchProjects, paginateProjects} from '../../services/ProjectService'

import {AuthenticationError, ForbiddenError} from "apollo-server-express";

import {

    PROJECT_SHOW,
    PROJECT_UPDATE,
    PROJECT_CREATE,
    PROJECT_DELETE
} from "../../permissions/Project";

export default {
    Query: {
        projectFind: (_, {id}, {user,rbac}) => {
            /* if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PROJECT_SHOW)) throw new ForbiddenError("Not Authorized") */
            return findProject(id)
        },
        projectFetch: (_, {}, {user,rbac}) => {
            /* if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PROJECT_SHOW)) throw new ForbiddenError("Not Authorized") */
            return fetchProjects()
        },
        projectPaginate: (_, {pageNumber, itemsPerPage, search, orderBy, orderDesc}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PROJECT_SHOW)) throw new ForbiddenError("Not Authorized")
            return paginateProjects(pageNumber, itemsPerPage, search, orderBy, orderDesc)
        },
        
    },
    Mutation: {
        projectCreate: (_, {input}, {user,rbac}) => {
            /* if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PROJECT_CREATE)) throw new ForbiddenError("Not Authorized") */
            return createProject(user, input)
        },
        projectUpdate: (_, {id, input}, {user,rbac}) => {
            /* if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PROJECT_UPDATE)) throw new ForbiddenError("Not Authorized") */
            return updateProject(user, id, input)
        },
        projectDelete: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, PROJECT_DELETE)) throw new ForbiddenError("Not Authorized")
            return deleteProject(id)
        }
    }

}

