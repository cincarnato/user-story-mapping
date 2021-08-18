import RetrospectiveProject from './../models/RetrospectiveProjectModel'
import { UserInputError } from 'apollo-server-express'

export const findRetrospectiveProject = async function (id) {
    return new Promise((resolve, reject) => {
        RetrospectiveProject.findOne({ _id: id }).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const fetchRetrospectiveProjects = async function () {
    return new Promise((resolve, reject) => {
        RetrospectiveProject.find({}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const paginateRetrospectiveProjects = function (pageNumber = 1, itemsPerPage = 5, search = null, orderBy = null, orderDesc = false) {

    function qs(search) {
        let qs = {}
        if (search) {
            qs = {
                $or: [
                    { name: { $regex: search, $options: 'i' } }
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

    let query = qs(search)
    let populate = null
    let sort = getSort(orderBy, orderDesc)
    let params = { page: pageNumber, limit: itemsPerPage, populate, sort }

    return new Promise((resolve, reject) => {
        RetrospectiveProject.paginate(query, params).then(result => {
            resolve({ items: result.docs, totalItems: result.totalDocs, page: result.page })
        }
        ).catch(err => reject(err))
    })
}





export const createRetrospectiveProject = async function (authUser, { title, description, votesPerUser, categories }) {

    const doc = new RetrospectiveProject({
        title, description, votesPerUser, categories
    })
    doc.id = doc._id;
    doc.categories = [
        {
            title: 'Lo bueno',
            colour: 'green',
            cards: []
        },
        {
            title: 'Lo malo',
            colour: 'yellow',
            cards: []
        },
        {
            title: 'A mejorar',
            colour: 'blue',
            cards: []
        },
        {
            title: 'Libre',
            colour: 'light-blue',
            cards: []
        }
    ];

    return new Promise((resolve, rejects) => {
        doc.save((error => {

            if (error) {
                if (error.name == "ValidationError") {
                    rejects(new UserInputError(error.message, { inputErrors: error.errors }));
                }
                rejects(error)
            }

            resolve(doc)
        }))
    })
}

export const updateRetrospectiveProject = async function (authUser, id, { title, description, votesPerUser, categories }) {
    return new Promise((resolve, rejects) => {
        RetrospectiveProject.findOneAndUpdate({ _id: id },
            { title, description, votesPerUser, categories },
            { new: true, runValidators: true, context: 'query' },
            (error, doc) => {

                if (error) {
                    if (error.name == "ValidationError") {
                        rejects(new UserInputError(error.message, { inputErrors: error.errors }));
                    }
                    rejects(error)
                }

                resolve(doc)
            })
    })
}

export const deleteRetrospectiveProject = function (id) {
    return new Promise((resolve, rejects) => {
        findRetrospectiveProject(id).then((doc) => {
            doc.delete(function (err) {
                err ? rejects(err) : resolve({ id: id, success: true })
            });
        })
    })
}

export const createCategory = async function (authUser, { title, colour }) {

    const doc = new RetrospectiveProject({
        title, colour
    })
    doc.id = doc._id;

    return new Promise((resolve, rejects) => {
        doc.save((error => {

            if (error) {
                if (error.name == "ValidationError") {
                    rejects(new UserInputError(error.message, { inputErrors: error.errors }));
                }
                rejects(error)
            }

            resolve(doc)
        }))
    })
}

export const deleteCategory = function (id) {
    return new Promise((resolve, rejects) => {
        findRetrospectiveProject(id).then((doc) => {
            doc.delete(function (err) {
                err ? rejects(err) : resolve({ id: id, success: true })
            });
        })
    })
}

