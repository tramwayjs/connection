import Provider from './Provider';
import Entity from './Entity';
import {services, errors} from "tramway-core";
import Collection from './Collection';
let {TypeEnforcementService} = services;
let {AbstractMethodError} = errors;

/**
 * @export
 * @class Repository
 */
export default class Repository {
    /**
     * Creates an instance of Repository.
     * 
     * @param {Provider} provider
     * 
     * @memberOf Repository
     */
    constructor(provider, factory) {
        this.provider = provider;
        this.factory = factory;
    }

    /**
     * @param {String|Number} id
     * @returns {boolean}
     * 
     * @memberOf Repository
     */
    async exists(id) {
        return await this.provider.has(id);
    }

    /**
     * @param {String|Number} id
     * @returns {Entity}
     * 
     * @memberOf Repository
     */
    async getOne(id) {
        let item = await this.provider.getOne(id);
        return this.factory.create(item);
    }

    /**
     * @returns {Collection}
     * 
     * @memberOf Repository
     */
    async get() {
        let items = await this.provider.get();
        return this.factory.createCollection(items);
    }

    /**
     * @param {Entity} entity
     * @returns
     * 
     * @memberOf Repository
     */
    async create(entity) {
        return await this.provider.create(entity);
    }

    /**
     * @param {Entity} entity
     * @returns
     * 
     * @memberOf Repository
     */
    async update(entity) {
        return await this.provider.update(entity.getId(), entity);
    }

    /**
     * @param {String|Number} id
     * @returns
     * 
     * @memberOf Repository
     */
    async delete(id) {
        return await this.provider.delete(id);
    }

    /**
     * @param {string | Object} conditions
     * @returns {Collection}
     * 
     * @memberOf Repository
     */
    async find(conditions) {
        let items = await this.provider.find(conditions);
        return this.factory.createCollection(items);
    }

    /**
     * @param {number[] | stringp[]} ids
     * @returns {Collection}
     * 
     * @memberOf Repository
     */
    async getMany(ids) {
        let items = await this.provider.getMany(ids);
        return this.factory.createCollection(items);
    }

    /**
     * @param {string | Object} conditions
     * 
     * @memberOf Repository
     */
    async count(conditions) {
        return await this.provider.count(conditions);
    }
}