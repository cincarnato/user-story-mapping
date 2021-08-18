import mongoose from 'mongoose';
import RetrospectiveProject from '../models/RetrospectiveProjectModel';

export const cardSaveOrUpdate = async function (authUser, idCategory, { id, title, colour }) {
    return new Promise(async (resolve, rejects) => {
        const doc = await RetrospectiveProject.findOne({ 'categories._id': idCategory });

        const category = doc.categories.id(idCategory);
        if (category) {
            // const cardIndex = doc.categories.findIndex(card => card.id === id);
            let card = category.cards.id(id);

            // Si la card existe en BD, la actualizo. Sino la creo
            if (card) {
                // card = { ...card, ...{ title: title, colour: colour } };
                card.title = title;
                card.colour = colour;
            } else {
                const _id = new mongoose.Types.ObjectId()
                card = { _id, title, colour };
                category.cards.push(card);
            }

            await doc.save();
            card.id = card._id;

            resolve(card);
        }
    })
}

export const categoryRemoveCardFromCategory = async function (authUser, idCategory, idCard) {
    return new Promise(async (resolve, rejects) => {
        const doc = await RetrospectiveProject.findOne({ 'categories._id': idCategory });

        const category = doc.categories.id(idCategory);

        // @todo: Por que id y no _id?
        const cardIndex = category.cards.findIndex(card => card.id === idCard);
        console.log('Card index:', cardIndex);
        console.log('category.cards:', category.cards);
        if (cardIndex > -1) {
            category.cards.splice(cardIndex, 1);
        }
        await doc.save(function (err) {
            err ? rejects(err) : resolve({ id: idCategory, success: true })
        });
    })
}

export const saveOrUpdateCategory = async function (authUser, idRetrospectiveProject, { id, title, colour, cards }) {
    return new Promise(async (resolve, rejects) => {
        const doc = await RetrospectiveProject.findOne({ _id: idRetrospectiveProject });

        let category = doc.categories.id(id);

        // Si la categoría existe en BD, la actualizo. Sino la creo
        console.log('Category: ', category);
        if (category) {
            category.title = title;
            category.colour = colour;
            category.cards = cards;
        } else {
            const _id = new mongoose.Types.ObjectId()
            category = { _id, title, colour, cards };
            doc.categories.push(category);
        }
        await doc.save();
        category.id = category._id;

        resolve(category);
    })

}

export const deleteCategory = async function (id) {
    return new Promise(async (resolve, rejects) => {
        const doc = await RetrospectiveProject.findOne({
            'categories._id': id
        });
        const categoryIndex = doc.categories.findIndex(category => category.id === id);

        // Si la categoría existe, la elimino
        if (categoryIndex > -1) {
            doc.categories.splice(categoryIndex, 1);
        }
        await doc.save(function (err) {
            err ? rejects(err) : resolve({ id: id, success: true })
        });

    })

}

