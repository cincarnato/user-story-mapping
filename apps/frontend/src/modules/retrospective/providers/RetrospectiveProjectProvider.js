import graphqlClient from "../../../apollo";

class RetrospectiveProjectProvider {

    findRetrospectiveProject(id) {
        return graphqlClient.query({
            query: require('./gql/retrospectiveProjectFind.graphql'),
            variables: { id: id },
            fetchPolicy: "network-only"
        })
    }

    fetchRetrospectiveProjects() {
        return graphqlClient.query({ query: require('./gql/retrospectiveProjectFetch.graphql') })
    }

    paginateRetrospectiveProjects(pageNumber, itemsPerPage, search = null, orderBy = null, orderDesc = false) {
        return graphqlClient.query({
            query: require('./gql/retrospectiveProjectPaginate.graphql'),
            variables: { pageNumber, itemsPerPage, search, orderBy, orderDesc },
            fetchPolicy: "network-only"
        })
    }

    createRetrospectiveProject(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/retrospectiveProjectCreate.graphql'),
            variables: form
        })
    }

    updateRetrospectiveProject(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/retrospectiveProjectUpdate.graphql'),
            variables: form
        })
    }

    deleteRetrospectiveProject(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/retrospectiveProjectDelete.graphql'),
            variables: { id }
        })
    }

    saveOrUpdateCard(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/cardSaveOrUpdate.graphql'),
            variables: form
        })
    }

    categoryRemoveCardFromCategory(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/categoryRemoveCardFromCategory.graphql'),
            variables: form
        })
    }

    saveOrUpdateCategory(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/categorySaveOrUpdate.graphql'),
            variables: form
        })
    }

    deleteCategory(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/categoryDelete.graphql'),
            variables: id
        })
    }


}

export default new RetrospectiveProjectProvider()


