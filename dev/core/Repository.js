import Provider from './Provider';
import Entity from './Entity';
import Collection from './Collection';

/**
 * @export
 * @class Repository
 */
export default class Repository {
    /**
     * Creates an instance of Repository.
     * 
     * @param {Provider} provider
     * @param {Factory} factory
     * @param {string} collection The name of the collection or table
     * 
     * @memberOf Repository
     */
    constructor(provider, factory, collection) {
        this.provider = provider;
        this.factory = factory;
        this.collection = collection;
    }

    /**
     * @param {String|Number} id
     * @returns {boolean}
     * 
     * @memberOf Repository
     */
    async exists(id) {
        return await this.provider.has(id, this.collection);
    }

    /**
     * @param {String|Number} id
     * @returns {Entity}
     * 
     * @memberOf Repository
     */
    async getOne(id) {
        let item = await this.provider.getOne(id, this.collection);
        return this.factory.create(item);
    }

    /**
     * @returns {Collection}
     * 
     * @memberOf Repository
     */
    async get() {
        let items = await this.provider.get(this.collection);
        return this.factory.createCollection(items);
    }

    /**
     * @param {Entity} entity
     * @returns
     * 
     * @memberOf Repository
     */
    async create(entity) {
        entity = this.factory.create(entity);
        return await this.provider.create(entity, this.collection);
    }

    /**
     * @param {Entity} entity
     * @returns
     * 
     * @memberOf Repository
     */
    async update(entity) {
        entity = this.factory.create(entity);
        return await this.provider.update(entity.getId(), entity, this.collection);
    }

    /**
     * @param {String|Number} id
     * @returns
     * 
     * @memberOf Repository
     */
    async delete(id) {
        return await this.provider.delete(id, this.collection);
    }

    /**
     * @param {string | Object} conditions
     * @returns {Collection}
     * 
     * @memberOf Repository
     */
    async find(conditions) {
        let items = await this.provider.find(conditions, this.collection);
        return this.factory.createCollection(items);
    }

    /**
     * @param {number[] | stringp[]} ids
     * @returns {Collection}
     * 
     * @memberOf Repository
     */
    async getMany(ids) {
        let items = await this.provider.getMany(ids, this.collection);
        return this.factory.createCollection(items);
    }

    /**
     * @param {string | Object} conditions
     * 
     * @memberOf Repository
     */
    async count(conditions) {
        return await this.provider.count(conditions, this.collection);
    }

    async setup() {
        return await this.provider.createCollection(this.collection);
    }
}