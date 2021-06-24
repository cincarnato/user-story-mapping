import {mergeTypes, mergeResolvers} from 'merge-graphql-schemas';
import {securityResolvers,securityTypes} from '@dracul/user-backend'

import {types as customTypes,resolvers as customResolvers} from '@dracul/customize-backend'
import {types as notificationTypes,resolvers as notificationResolvers} from '@dracul/notification-backend'

//BASE RESOLVERS
import {resolvers as baseResolvers } from './modules/base/graphql'
import {resolvers as storymappingResolvers } from './modules/storymapping/graphql'
//BASE TYPEDEFS
import {types as baseTypes} from './modules/base/graphql'
import {types as storymappingTypes} from './modules/storymapping/graphql'


export const resolvers = mergeResolvers([
    baseResolvers,
    storymappingResolvers,
    securityResolvers,
    notificationResolvers,
    customResolvers
])

export const typeDefs = mergeTypes([
    baseTypes,
    storymappingTypes,
    securityTypes,
    notificationTypes,
    customTypes
])
