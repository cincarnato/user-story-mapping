import graphqlClient from "../../../apollo";

class ProjectProvider {

    findProject(id) {
        return graphqlClient.query({
            query: require('./gql/projectFind.graphql'),
            variables: {id:id}
        })
    }

    fetchProjects() {
        return graphqlClient.query({query: require('./gql/projectFetch.graphql')})
    }
    
    paginateProjects(pageNumber, itemsPerPage, search = null,  orderBy = null, orderDesc = false) {
        return graphqlClient.query({
            query: require('./gql/projectPaginate.graphql'),
            variables: {pageNumber, itemsPerPage, search, orderBy, orderDesc},
            fetchPolicy: "network-only"
        })
    }
    
    

    createProject(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/projectCreate.graphql'),
            variables: form
        })
    }
    
    updateProject({ id, title, description, activities}) {
        return graphqlClient.mutate({
            mutation: require('./gql/projectUpdate.graphql'),
            variables: { id, title, description, activities}
        })
    }
    
    deleteProject(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/projectDelete.graphql'),
            variables: {id}
        })
    }

}

export default new ProjectProvider()


