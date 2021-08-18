import mongodb from './mongo-db';
import { retrospectiveProjectAddCardToCategory } from './modules/retrospective/services/RetrospectiveProjectService';

mongodb();

function exec() {
    retrospectiveProjectAddCardToCategory(null, "6107fae1b9102a2e1f522529", { title: "Tarjeta 1", colour: "green" })
        .then((doc) => {
            console.log('Operacion exitosa');
            console.log(doc);
        })
        .catch((error) => {
            console.error(error);
        }
        );
}

exec();