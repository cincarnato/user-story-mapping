import Project from './../models/ProjectModel'
import {UserInputError} from 'apollo-server-express'

export const findProject = async function (id) {
    return new Promise((resolve, reject) => {
        Project.findOne({_id: id}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const fetchProjects = async function () {
    return new Promise((resolve, reject) => {
        Project.find({}).isDeleted(false).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const paginateProjects = function ( pageNumber = 1, itemsPerPage = 5, search = null, orderBy = null, orderDesc = false) {

    function qs(search) {
        let qs = {}
        if (search) {
            qs = {
                $or: [
                    {title: {$regex: search, $options: 'i'}},
                    {description: {$regex: search, $options: 'i'}}
                ]
            }
        }
        return qs
    }
    
     function getSort(orderBy, orderDesc) {
        if (orderBy) {
            return (orderDesc ? '-' : '') + orderBy
        } else {
            return null
        }
    }

    let query = {deleted: false, ...qs(search)}
    let populate = null
    let sort = getSort(orderBy, orderDesc)
    let params = {page: pageNumber, limit: itemsPerPage, populate, sort}

    return new Promise((resolve, reject) => {
        Project.paginate(query, params).then(result => {
                resolve({items: result.docs, totalItems: result.totalDocs, page: result.page})
            }
        ).catch(err => reject(err))
    })
}





export const createProject = async function (authUser, {title, description, activities}) {
    
    const doc = new Project({
        title, description, activities
    })
    doc.id = doc._id;
    return new Promise((resolve, rejects) => {
        doc.save((error => {
        
            if (error) {
                if (error.name == "ValidationError") {
                    return rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                }
                return rejects(error)
            }    
        
            resolve(doc)
        }))
    })
}

export const updateProject = async function (authUser, id, {title, description, activities}) {
    return new Promise((resolve, rejects) => {
        Project.findOneAndUpdate({_id: id},
        {title, description, activities}, 
        {new: true, runValidators: true, context: 'query'},
        (error,doc) => {
            
            if (error) {
                if (error.name == "ValidationError") {
                    rejects(new UserInputError(error.message, {inputErrors: error.errors}));
                }
                rejects(error)
            } 
        
            setTimeout(() => resolve(doc), 1000 )
        })
    })
}

export const deleteProject = function (id) {
    return new Promise((resolve, rejects) => {
        findProject(id).then((doc) => {
            doc.softdelete(function (err) {
                err ? rejects(err) : resolve({id: id, success: true})
            });
        })
    })
}

