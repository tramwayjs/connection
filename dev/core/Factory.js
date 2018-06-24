import {errors} from "tramway-core";
import Entity from "./Entity";
import Collection from "./Collection";
const {AbstractMethodError} = errors;

export default class Factory {
    /**
     * 
     * @param {*} item 
     * @returns {Entity}
     */
    create(item) {
        throw new AbstractMethodError();
    }

    createCollection(items) {
        let collection = new Collection();
        items.forEach(item => collection.add(this.create(item)));
        return collection;
    }
}