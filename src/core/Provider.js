import {errors} from "tramway-core";
let {AbstractMethodError} = errors;

/**
 * @abstract
 * @export
 * @class Provider
 */
export default class Provider {

    /**
     * @param {number|string} id
     * @param {string} collection
     * @returns {Promise<Object>}
     * 
     * @memberOf Provider
     */
    async getOne(id, collection) {
        throw new AbstractMethodError();
    }

    /**
     * @param {string[] | number[]} ids
     * @param {string} collection
     * 
     * @memberOf Provider
     */
    async getMany(ids, collection) {
        throw new AbstractMethodError();
    }

    /**
     * @param {string} collection
     * 
     * @memberOf Provider
     */
    async get(collection) {
        throw new AbstractMethodError();
    }

    /**
     * @param {string | Object} conditions
     * @param {string} collection
     * 
     * @memberOf Provider
     */
    async find(conditions, collection) {
        throw new AbstractMethodError();
    }

    /**
     * @param {number|string} id
     * @param {string} collection
     * @returns {Promise<boolean>}
     * 
     * @memberOf Provider
     */
    async has(id, collection) {
        throw new AbstractMethodError();
    }

    /**
     * @param { string[] | number[] } ids
     * @param {string} collection
     * 
     * @memberOf Provider
     */
    async hasThese(ids, collection) {
        throw new AbstractMethodError();
    }

    /**
     * @param {string | Object} conditions
     * @param {string} collection
     * 
     * @memberOf Provider
     */
    async count(conditions, collection) {
        throw new AbstractMethodError();
    }

    /**
     * @param {Object} item
     * @param {string} collection
     * 
     * @memberOf Provider
     */
    async create(item, collection) {
        throw new AbstractMethodError();
    }

    /**
     * @param {number|string} id
     * @param {Object} item
     * @param {string} collection
     * 
     * @memberOf Provider
     */
    async update(id, item, collection) {
        throw new AbstractMethodError();
    }

    /**
     * @param {number|string} id
     * @param {string} collection
     * 
     * @memberOf Provider
     */
    async delete(id, collection) {
        throw new AbstractMethodError();
    }

    /**
     * @param { number[] | string[]} id
     * @param {string} collection
     * 
     * @memberOf Provider
     */
    async deleteMany(id, collection) {
        throw new AbstractMethodError();
    }

    /**
     * Recommended to use other functions first.
     * @param {string} query
     * @param {[] | Object} values
     * @param {string} collection
     * 
     * @memberOf Provider
     */
    async query(query, values, collection) {
        throw new AbstractMethodError();
    }

    /**
     * Create collection
     * @param {string} collection
     * 
     * @memberOf Provider
     */
    async createCollection(collection) {
        throw new AbstractMethodError();
    }

}