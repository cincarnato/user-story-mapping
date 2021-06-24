import ProjectManagementPage from '../pages/ProjectManagementPage'
import ProjectPage from '../pages/ProjectPage'

const routes = [
    {name: 'ProjectManagementPage', path: '/project-management', component: ProjectManagementPage},
    {name: 'ProjectPage', path: '/project/:id?', component: ProjectPage}
]

export default routes;
