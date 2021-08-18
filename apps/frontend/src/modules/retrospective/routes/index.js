import RetrospectiveProjectManagementPage from '../pages/RetrospectiveProjectManagementPage'
import RetrospectiveProjectPage from '../pages/RetrospectiveProjectPage'

const routes = [
     { name: 'RetrospectiveProjectManagementPage', path: '/retrospective-project', component: RetrospectiveProjectManagementPage },
     { name: 'RetrospectiveProjectPage', path: '/retrospective-project/:id?', component: RetrospectiveProjectPage }
]

export default routes;
