Tramway Connection is a simple connection library for the tramway framework. It includes:

1. An adaptive Connection system
2. Models and Entities which are separate but when used together with Connections can speed up workflow.

# Installation:
1. `npm install tramway-core-connection`

# Example project
https://gitlab.com/tramwayjs/tramway-example

# Documentation

## Recommended Folder Structure
- config
- connections
- entities
- models

## Config
Here is where you can put all the parameters for your connection.

## Connections
Connections are your way to access data sets from a data source, be it a database or API

To create a connection, import the class and implement a derived class with the abstracted stubs to get the most out of it.
```
import {Connection} from 'tramway-core-connection';
```

| Function | Usage |
| ----- | ----- |
| ```constructor()``` | Handles database configuration |
| ```getItem(id: any, cb: function(Error, Object))``` | Passes the item gotten from the database configuration to the res in the callback |
| ```getItems(ids: any[], cb: function(Error, Object[]))``` | Passes an array of items for an array of ids. |
| ```findItems(conditions: string/Object, cb: function(Error, Object[]))``` | Returns an array of items for a query on specific conditions. This may be done by object or query string depending on your implementation |
| ```hasItem(id: any, cb: function(Error, boolean))``` | Checks if item exists |
| ```hasItems(ids : any[], cb: function(Error, boolean))``` | Checks if a set of items exists |
| ```countItems(conditions: any, cb: function(Error, number))``` | Gets a count of items that meet the conditions. |
| ```createItem(item: Entity/Object, cb: function(Error, Object))``` | Creates an object in the database from an `Entity` or standard object |
| ```updateItem(id: any, item: Entity/Object, cb: function(Error, Object))``` | Updates the item found with the given id |
| ```deleteItem(id: any, cb: function(Error, Object))``` | Removes an item from the datastore and returns it |
| ```deleteItems(ids : any[], cb: function(Error, Object[]))``` | Removes items from the datastore and returns them |
| ```query(query: string/Object, values: Object, cb: function(Error, Object[]))``` | Meant as an override based on your datastore because we can't always rely on simple CRUD |

## Models
Models allow you to link an entity to a connection and abstract many of the common methods by using the Connection's interface. Unless you need to change logic or add extra logic, a `Model`, given an `Entity` and `Connection`, the implementation can be as simple as the following.

```
import {Model} from 'tramway-core-connection';
import TestConnection from '../connections/TestConnection';
import TestEntity from '../entities/TestEntity';
export default class SampleModel extends Model {
    constructor(item) {
        if (!item || !item instanceof TestEntity) {
            item = new TestEntity();
        }
        super(new TestConnection(), item);
    }
    
    getId() {
        return this.entity.getId();
    }
    
    setId(id) {
        this.entity.setId(id);
        return this;
    }
```
### Summary of Model Spec

| Function | Usage |
| --- | --- |
| ```constructor(Connection, Entity)``` | Constructor takes a Connection and entity |
| ```getId()``` | Acts as an interfact to get the entity's id and needs to be implemented since it is entity-specific |
| ```setId(id)``` | Sets the id of internalized connection parameters to be for the given object |

### Exposed methods to use
All of these methods rely on the Connection's implementation and will just interact with the Connection.

| Function | Usage |
| --- | --- |
| ```updateEntity(Object)``` | Updates entity based on object given |
| ```exists(cb: function(Error, boolean))``` | Calls Connection's exist function |
| ```get(cb: function(Error, Object))``` | Gets entity with set id |
| ```getAll(cb: function(Error, Object[]))``` | Gets all objects from the entity's set |
| ```create(cb: function(Error, Object))``` | Creates an object in the entity's set and returns the persisted object |
| ```update(cb: function(Error, Object))``` | Updates the object with the set id with the updated entity |
| ```delete(cb: function(Error, Object))``` | Deletes the item with the Model's set id.|
| ```find(condtions: string/Object, cb: function(Error, Object[]))``` | Finds an object in the entity's set with given conditions - based on `Condition`'s `findItems` implementation. |
| ```getMany(ids: any[], cb: function(Error, Object[]))``` | Gets objects tied to a list of ids |
| ```count(conditions, cb: function(Error, number))``` | Gets a count of objects for given conditons |

## Entity
An entity is a simple class that contains the getters and setters for its properties. It also comes with validation and serialization.

| Function | Usage |
| --- | --- |
| ```constructor(obj: Object)``` | Converts a passed object into the proper attributes |
| ```hasAttribute(attribute: string): boolean``` | Checks if attribute is in the Entity |
| ```serialize(): string``` | Returns stringified JSON |
| ```unserialize(item): Entity``` | Sets own attributes based on serialized string |

To create an entity, extend the class.
```
import {Entity} from 'tramway-core-connection';
```