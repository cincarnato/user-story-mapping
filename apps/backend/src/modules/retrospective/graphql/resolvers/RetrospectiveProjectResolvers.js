
import { createRetrospectiveProject, updateRetrospectiveProject, deleteRetrospectiveProject, findRetrospectiveProject, fetchRetrospectiveProjects, paginateRetrospectiveProjects, categoryAddCardToCategory, categoryRemoveCardFromCategory, createCategory, deleteCategory } from '../../services/RetrospectiveProjectService'

import { AuthenticationError, ForbiddenError } from "apollo-server-express";

import {
    RETROSPECTIVE_PROJECT_SHOW,
    RETROSPECTIVE_PROJECT_UPDATE,
    RETROSPECTIVE_PROJECT_CREATE,
    RETROSPECTIVE_PROJECT_DELETE
} from "../../permissions/RetrospectiveProject";

export default {
    Query: {
        retrospectiveProjectFind: (_, { id }, { user, rbac }) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, RETROSPECTIVE_PROJECT_SHOW)) throw new ForbiddenError("Not Authorized")
            return findRetrospectiveProject(id)
        },
        retrospectiveProjectFetch: (_, { }, { user, rbac }) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, RETROSPECTIVE_PROJECT_SHOW)) throw new ForbiddenError("Not Authorized")
            return fetchRetrospectiveProjects()
        },
        retrospectiveProjectPaginate: (_, { pageNumber, itemsPerPage, search, orderBy, orderDesc }, { user, rbac }) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, RETROSPECTIVE_PROJECT_SHOW)) throw new ForbiddenError("Not Authorized")
            return paginateRetrospectiveProjects(pageNumber, itemsPerPage, search, orderBy, orderDesc)
        },

    },
    Mutation: {
        retrospectiveProjectCreate: (_, { input }, { user, rbac }) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, RETROSPECTIVE_PROJECT_CREATE)) throw new ForbiddenError("Not Authorized")
            return createRetrospectiveProject(user, input)
        },
        retrospectiveProjectUpdate: (_, { id, input }, { user, rbac }) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, RETROSPECTIVE_PROJECT_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateRetrospectiveProject(user, id, input)
        },
        retrospectiveProjectDelete: (_, { id }, { user, rbac }) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, RETROSPECTIVE_PROJECT_DELETE)) throw new ForbiddenError("Not Authorized")
            return deleteRetrospectiveProject(id)
        },
    }

}

