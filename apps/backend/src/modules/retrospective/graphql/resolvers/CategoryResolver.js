
import { cardSaveOrUpdate, categoryRemoveCardFromCategory, saveOrUpdateCategory, deleteCategory } from '../../services/CategoryService'

import { AuthenticationError, ForbiddenError } from "apollo-server-express";

import {
    CATEGORY_SHOW,
    CATEGORY_UPDATE,
    CATEGORY_CREATE,
    CATEGORY_DELETE
} from "../../permissions/Category";

export default {
    Query: {

    },
    Mutation: {
        categorySaveOrUpdate: (_, { idRetrospectiveProject, input }, { user, rbac }) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, CATEGORY_CREATE)) throw new ForbiddenError("Not Authorized")
            return saveOrUpdateCategory(user, idRetrospectiveProject, input)
        },
        categoryDelete: (_, { id }, { user, rbac }) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, CATEGORY_UPDATE)) throw new ForbiddenError("Not Authorized")
            return deleteCategory(id)
        },
        cardSaveOrUpdate: (_, { idCategory, cardInput }, { user, rbac }) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, CATEGORY_UPDATE)) throw new ForbiddenError("Not Authorized")
            return cardSaveOrUpdate(user, idCategory, cardInput)
        },
        categoryRemoveCardFromCategory: (_, { idCategory, idCard }, { user, rbac }) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!rbac.isAllowed(user.id, CATEGORY_DELETE)) throw new ForbiddenError("Not Authorized")
            return categoryRemoveCardFromCategory(user, idCategory, idCard)
        },
    }

}

