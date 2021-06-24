const mongoose = require('mongoose');

const softDelete = require('mongoose-softdelete')

const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({

    title: { type: String, required: true, unique: true },
    description: { type: String, required: false, unique: false },
    activities: [{
        title: { type: String },
        roles: [{ type: String }],
        tasks: [{
            title: String,
            subtasks: [{ title: String }]
        }]
    }]


}, { timestamps: true });


ProjectSchema.plugin(softDelete);

ProjectSchema.plugin(mongoosePaginate);
ProjectSchema.plugin(uniqueValidator, { message: 'validation.unique' });

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;