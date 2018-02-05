import Connection from './Connection';
import Entity from './Entity';
import {services, errors} from "tramway-core";
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
     * @param {Connection} connection
     * 
     * @memberOf Repository
     */
    constructor(connection) {
        this.connection = TypeEnforcementService.enforceInstance(connection, Connection);
    }

    /**
     * @param {String|Number} id
     * @param {function(Error, boolean)} cb
     * @returns
     * 
     * @memberOf Repository
     */
    exists(id, cb) {
        return this.connection.hasItem(id, cb);
    }

    /**
     * @param {String|Number} id
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Repository
     */
    get(id, cb) {
        return this.connection.getItem(id, cb);
    }

    /**
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Repository
     */
    getAll(cb) {
        return this.connection.getAllItems(cb);
    }

    /**
     * @param {Entity} entity
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Repository
     */
    create(entity, cb) {
        return this.connection.createItem(entity, cb);
    }

    /**
     * @param {Entity} entity
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Repository
     */
    update(entity, cb) {
        return this.connection.updateItem(entity.getId(), entity, cb);
    }

    /**
     * @param {String|Number} id
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Repository
     */
    delete(id, cb) {
        return this.connection.deleteItem(id, cb);
    }

    /**
     * @param {string | Object} conditions
     * @param {function(Error, Object[]} cb
     * @returns
     * 
     * @memberOf Repository
     */
    find(conditions, cb) {
        return this.connection.findItems(conditions, cb);
    }

    /**
     * @param {number[] | stringp[]} ids
     * @param {function(Error, Object[]} cb
     * @returns
     * 
     * @memberOf Repository
     */
    getMany(ids, cb) {
        return this.connection.getItems(ids, cb);
    }

    /**
     * @param {string | Object} conditions
     * @param {function(Error, number)} cb
     * 
     * @memberOf Repository
     */
    count(conditions, cb) {
        this.connection.countItems(conditions, cb);
    }
}