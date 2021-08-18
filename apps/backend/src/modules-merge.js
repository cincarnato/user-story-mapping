import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { securityResolvers, securityTypes } from '@dracul/user-backend'

import { types as customTypes, resolvers as customResolvers } from '@dracul/customize-backend'
import { types as notificationTypes, resolvers as notificationResolvers } from '@dracul/notification-backend'

//BASE RESOLVERS
import { resolvers as baseResolvers } from './modules/base/graphql'
import { resolvers as storymappingResolvers } from './modules/storymapping/graphql'
import { resolvers as retrospectiveResolvers } from './modules/retrospective/graphql'

//BASE TYPEDEFS
import { types as baseTypes } from './modules/base/graphql'
import { types as storymappingTypes } from './modules/storymapping/graphql'
import { types as retrospectiveTypes } from './modules/retrospective/graphql'


export const resolvers = mergeResolvers([
    baseResolvers,
    storymappingResolvers,
    retrospectiveResolvers,
    securityResolvers,
    notificationResolvers,
    customResolvers
])

export const typeDefs = mergeTypes([
    baseTypes,
    storymappingTypes,
    retrospectiveTypes,
    securityTypes,
    notificationTypes,
    customTypes
])
