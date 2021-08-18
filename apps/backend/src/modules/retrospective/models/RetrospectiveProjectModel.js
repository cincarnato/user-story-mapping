const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: { type: String, required: true },
    colour: { type: String },
    cards: [{
        title: String,
        colour: { type: String },
    }]
});

const RetrospectiveProjectSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    votesPerUser: { type: Number, required: true },
    categories: [categorySchema],

}, { timestamps: true });

RetrospectiveProjectSchema.plugin(mongoosePaginate);
RetrospectiveProjectSchema.plugin(uniqueValidator, { message: 'validation.unique' });

const RetrospectiveProject = mongoose.model('RetrospectiveProject', RetrospectiveProjectSchema);

module.exports = RetrospectiveProject;