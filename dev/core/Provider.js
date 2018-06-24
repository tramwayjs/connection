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
     * @returns {Promise<Object>}
     * 
     * @memberOf Provider
     */
    async getOne(id) {
        throw new AbstractMethodError();
    }

    /**
     * @param {string[] | number[]} ids
     * 
     * @memberOf Provider
     */
    async getMany(ids) {
        throw new AbstractMethodError();
    }

    /**
     * @memberOf Provider
     */
    async get() {
        throw new AbstractMethodError();
    }

    /**
     * @param {string | Object} conditions
     * 
     * @memberOf Provider
     */
    async find(conditions) {
        throw new AbstractMethodError();
    }

    /**
     * @param {number|string} id
     * @returns {Promise<boolean>}
     * 
     * @memberOf Provider
     */
    async has(id) {
        throw new AbstractMethodError();
    }

    /**
     * @param { string[] | number[] } ids
     * 
     * @memberOf Provider
     */
    async hasThese(ids) {
        throw new AbstractMethodError();
    }

    /**
     * @param {string | Object} conditions
     * 
     * @memberOf Provider
     */
    async count(conditions) {
        throw new AbstractMethodError();
    }

    /**
     * @param {Object} item
     * 
     * @memberOf Provider
     */
    async create(item) {
        throw new AbstractMethodError();
    }

    /**
     * @param {number|string} id
     * @param {Object} item
     * 
     * @memberOf Provider
     */
    async update(id, item) {
        throw new AbstractMethodError();
    }

    /**
     * @param {number|string} id
     * 
     * @memberOf Provider
     */
    async delete(id) {
        throw new AbstractMethodError();
    }

    /**
     * @param { number[] | string[]} id
     * 
     * @memberOf Provider
     */
    async deleteMany(id) {
        throw new AbstractMethodError();
    }

    /**
     * Recommended to use other functions first.
     * @param {string} query
     * @param {[] | Object} values
     * 
     * @memberOf Provider
     */
    async query(query, values) {
        throw new AbstractMethodError();
    }

}