import Entity from "./Entity";

export default class Collection {
    static from(items = []) {
        let collection = new Collection();
        items.forEach(item => collection.add(item));
        return collection;
    }

    constructor() {
        this.items = new Map();
        this.index = [];
    }

    /**
     * 
     * @param {Entity} entity 
     * @returns {Collection}
     */
    add(entity) {
        this.items.set(entity.getId(), entity);
        this.index.push(entity.getId());
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

    getFirst() {
        const [id] = this.index;
        return this.get(id);
    }

    getLast() {
        const id = this.index[this.index.length - 1];
        return this.get(id);
    }

    getIds() {
        return this.index;
    }
}