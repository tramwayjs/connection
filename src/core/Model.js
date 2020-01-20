import Connection from './Connection';
import Entity from './Entity';
import {services, errors} from "tramway-core";
let {TypeEnforcementService} = services;
let {AbstractMethodError} = errors;

/**
 * @export
 * @class Model
 * @deprecated Use Repository instead
 */
export default class Model {
    /**
     * Creates an instance of Model.
     * 
     * @param {Connection} connection
     * @param {Entity} entity
     * 
     * @memberOf Model
     * @deprecated Use Repository instead
     */
    constructor(connection, entity) {
        this.connection = TypeEnforcementService.enforceInstance(connection, Connection);
        this.entity = TypeEnforcementService.enforceInstance(entity, Entity);
    }

    /**
     * @abstract
     * @memberOf Model
     * @deprecated Use Repository instead
     */
    getId() {
        throw new AbstractMethodError();
    }

    /**
     * @abstract
     * @params {number|string|[]} value
     * @memberOf Model
     * @deprecated Use Repository instead
     */
    setId(value) {
        throw new AbstractMethodError();
    }


    /**
     * @param {Object} item
     * @returns {Model}
     * 
     * @memberOf Model
     * @deprecated Use Repository instead
     */
    updateEntity(item) {
        this.entity = new this.entity.constructor(item);
        return this;
    }

    /**
     * @param {function(Error, boolean)} cb
     * @returns
     * 
     * @memberOf Model
     * @deprecated Use Repository instead
     */
    exists(cb) {
        return this.connection.hasItem(this.getId(), cb);
    }

    /**
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Model
     * @deprecated Use Repository instead
     */
    get(cb) {
        return this.connection.getItem(this.getId(), cb);
    }

    /**
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Model
     * @deprecated Use Repository instead
     */
    getAll(cb) {
        return this.connection.getAllItems(cb);
    }

    /**
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Model
     * @deprecated Use Repository instead
     */
    create(cb) {
        return this.connection.createItem(this.entity, cb);
    }

    /**
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Model
     * @deprecated Use Repository instead
     */
    update(cb) {
        return this.connection.updateItem(this.getId(), this.entity, cb);
    }

    /**
     * @param {function(Error, Object)} cb
     * @returns
     * 
     * @memberOf Model
     * @deprecated Use Repository instead
     */
    delete(cb) {
        return this.connection.deleteItem(this.getId(), cb);
    }

    /**
     * @param {string | Object} conditions
     * @param {function(Error, Object[]} cb
     * @returns
     * 
     * @memberOf Model
     * @deprecated Use Repository instead
     */
    find(conditions, cb) {
        return this.connection.findItems(conditions, cb);
    }

    /**
     * @param {number[] | stringp[]} ids
     * @param {function(Error, Object[]} cb
     * @returns
     * 
     * @memberOf Model
     * @deprecated Use Repository instead
     */
    getMany(ids, cb) {
        return this.connection.getItems(ids, cb);
    }

    /**
     * @param {string | Object} conditions
     * @param {function(Error, number)} cb
     * 
     * @memberOf Model
     * @deprecated Use Repository instead
     */
    count(conditions, cb) {
        this.connection.countItems(conditions, cb);
    }
}