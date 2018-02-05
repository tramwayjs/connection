Tramway Connection is a simple connection library for the tramway framework. It includes:

1. An adaptive Connection system
2. Repositories and Entities which are separate but when used together with Connections can speed up workflow.

# Installation:
1. `npm install tramway-core-connection`

# Example project
https://gitlab.com/tramwayjs/tramway-example

# Documentation

## Recommended Folder Structure
- config
- connections
- entities
- repositories

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

## Repositories
Repositories allow you to interact with a given connection specifically for the purposes of handling a given entity. This usually implies persisting to a database but with the flexibility of Tramway, it can also mean local storage or via an API connection. The default `Repository` already links to a connection and utilizes the existing methods that were implemented when the `Connection` was implemented or imported. The following demonstrates how a Repository could be used with a Connection and Entity. It is recommended, however, to instantiate connections and repositories using `tramway-core-dependency-injector` such to make more efficient use of memory and simplify usage, in this case, no class would be required unless it was overriding default connection logic.

```
import {Repository} from 'tramway-core-connection';
import TestConnection from '../connections/TestConnection';
import TestEntity from '../entities/TestEntity';
export default class SampleRepository extends Repository {
    constructor(item) {
        super(new TestConnection());
    }
```
### Summary of Repository Spec

| Function | Usage |
| --- | --- |
| ```constructor(Connection)``` | Constructor takes a Connection |

### Exposed methods to use
All of these methods rely on the Connection's implementation and will just interact with the Connection.

| Function | Usage |
| --- | --- |
| ```exists(id: string/int, cb: function(Error, boolean))``` | Calls Connection's exist function |
| ```get(cb: function(Error, Object))``` | Gets entity with set id |
| ```getAll(cb: function(Error, Object[]))``` | Gets all objects from the entity's set |
| ```create(entity: Entity, cb: function(Error, Object))``` | Sends the entity to the connection to be created and returns the persisted result.|
| ```update(entity: Entity, cb: function(Error, Object))``` | Updates the entity via the connection and returns the persisted result. |
| ```delete(id: string/int, cb: function(Error, Object))``` | Deletes the item with the Model's set id.|
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