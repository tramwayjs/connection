Tramway Connection is a simple connection library for the tramway framework. It includes:

1. An adaptive Connection system
2. Repositories and Entities which are separate but when used together with Providers can speed up workflow.
3. Introduces async/await support to replace callbacks

# Installation:
1. `npm install tramway-core-connection`

# Example project
https://gitlab.com/tramwayjs/tramway-example

# Documentation

## Recommended Folder Structure
- config
- providers
- entities
- repositories
- factories

## Config
Here is where you can put all the parameters for your connection.

## Providers
Providers are your way to access data sets from a data source, be it a database or API

To create a provider, import the class and implement a derived class with the abstracted stubs to get the most out of it.
```
import {Provider} from 'tramway-core-connection';
```

| Function | Usage |
| ----- | ----- |
| ```constructor()``` | Handles database configuration |
| ```getOne(id: any, collection: string)``` | Returns item from the connection |
| ```getMany(ids: any[], collection: string)``` | Passes an array of items for an array of ids. |
| ```find(conditions: string/Object, collection: string)``` | Returns an array of items for a query on specific conditions. This may be done by object or query string depending on your implementation |
| ```has(id: any, collection: string)``` | Checks if item exists |
| ```hasThese(ids : any[], collection: string)``` | Checks if a set of items exists |
| ```count(conditions: any, collection: string)``` | Gets a count of items that meet the conditions. |
| ```create(item: Entity, collection: string): Entity``` | Creates an object in the database from an `Entity` or standard object |
| ```update(id: any, item: Entity, collection: string): Entity``` | Updates the item found with the given id |
| ```delete(id: any, collection: string)``` | Removes an item from the datastore and returns it |
| ```deleteMany(ids : any[], collection: string)``` | Removes items from the datastore and returns them |
| ```query(query: string/Object, values: Object, collection: string)``` | Meant as an override based on your datastore because we can't always rely on simple CRUD |
| ```createCollection(collection: string)``` | A method encompassing the steps to create a collection programatically |

## Repositories
Repositories allow you to interact with a given connection specifically for the purposes of handling a given entity. This usually implies persisting to a database but with the flexibility of Tramway, it can also mean local storage or via an API connection. The default `Repository` already links to a connection and utilizes the existing methods that were implemented when the `Provider` was implemented or imported. The following demonstrates how a Repository could be used with a Provider and Entity. It is recommended, however, to instantiate providers and repositories using `tramway-core-dependency-injector` such to make more efficient use of memory and simplify usage, in this case, no class would be required unless it was overriding default connection logic.

```
import {Repository} from 'tramway-core-connection';
import TestConnection from '../connections/TestConnection';
import TestEntity from '../entities/TestEntity';
export default class SampleRepository extends Repository {
    constructor(item, factory) {
        super(new TestConnection(), factory);
    }
```

Note, using dependency injection negates the need for the above code.

### Summary of Repository Spec

| Function | Usage |
| --- | --- |
| ```constructor(Provider, Factory, collection)``` | Constructor takes a Provider, Factory, and the name of the collection |

### Exposed methods to use
All of these methods rely on the Provider's implementation and will just interact with the Provider.

| Function | Usage |
| --- | --- |
| ```exists(id: string/int): boolean``` | Calls Provider's exist function |
| ```getOne(id: string/int): Entity``` | Gets entity with id |
| ```get(): Collection``` | Gets collection of all objects from the entity's set |
| ```create(entity: Entity)``` | Sends the entity to the provider to be created and returns the persisted result.|
| ```update(entity: Entity)``` | Updates the entity via the provider and returns the persisted result. |
| ```delete(id: string/int)``` | Deletes the item with the Model's set id.|
| ```find(condtions: string/Object): Collection``` | Finds a collection of objects in the entity's set with given conditions |
| ```getMany(ids: any[]): Collection``` | Gets objects tied to a list of ids |
| ```count(conditions): number``` | Gets a count of objects for given conditons |
| ```setup()``` | Handles programatic initialization of the data source |

## Factory

The factory facilitates the creation of standardized `Entity` and `Collection` objects and is primarily used by the `Repository`. Based on different use cases, it can be extended to support common formats like HATEAOS and decorate entities.

To create a factory, extend the class.
```
import {Factory} from 'tramway-core-connection';
```

| Function | Usage |
| --- | --- |
| ```create(item: Object): Entity``` | Creates entity from object |
| ```createCollection(items: Object[]): Collection``` | Returns collection of entities from array of objects. |

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

## Collection
A collection stores a group of entities in a Map to facilitate bulk operations and validation.

| Function | Usage |
| --- | --- |
| ```add(entity: Entity)``` | Adds entity to collection at its id as key |
| ```has(id)``` | Checks if entity with given id exists |
| ```get(id)``` | Gets entity with given id |
| ```forEach(cb: function(value: Entity, key: number/string, map: Map))``` | Iterates collection of entities |
| ```getSize(): number``` | Returns size of collection |
| ```isEmpty(): boolean``` | Checks if collection is empty |
| ```getEntities(): Iterator``` | Gets entities as an Iterator |

To create an collection, extend the class.
```
import {Collection} from 'tramway-core-connection';
```