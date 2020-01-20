import Entity from "./Entity";

export default class Collection {
    constructor() {
        this.items = new Map();
    }

    /**
     * 
     * @param {Entity} entity 
     * @returns {Collection}
     */
    add(entity) {
        this.items.set(entity.getId(), entity);
        return this;
    }

    /**
     * 
     * @param {string|number} id 
     * @returns {boolean}
     */
    has(id) {
        return this.items.has(id);
    }

    /**
     * 
     * @param {string|number} id 
     * @returns {Entity}
     */
    get(id) {
        return this.items.get(id);
    }

    /**
     * 
     * @param {function (Entity, number|string, Map<int|string, Entity>)} cb 
     * @returns {Collection}
     */
    forEach(cb) {
        this.items.forEach(cb);
        return this;
    }

    /**
     * @returns {number}
     */
    getSize() {
        return this.items.size;
    }

    /**
     * @returns {boolean}
     */
    isEmpty() {
        return 0 === this.items.size;
    }

    /**
     * @returns {Iterator}
     */
    getEntities() {
        return this.items.values();
    }
}