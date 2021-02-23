import { of } from 'rxjs';
import { EntityCollectionService } from '@ngrx/data';

import { DefaultEntityStore } from './entity-store';

class User {
    constructor(public id: string | string, public name: string, public age: number) {}
}

class UserCollectionServiceMock implements Partial<EntityCollectionService<User>> {
    getAll() {
        return of([]);
    }

    getWithQuery(query: any) {
        return of([]);
    }

    getByKey(key: any) {
        return of(null);
    }

    add(entity: User) {
        return of(entity);
    }

    update(entity: User) {
        return of(entity);
    }

    delete(entityOrId: User | string | number) {
        return entityOrId instanceof User ? of(entityOrId.id) : of(entityOrId);
    }
}

describe('Default Entity Store', () => {
    let store: DefaultEntityStore<User>;
    let collectionService: EntityCollectionService<User>;

    beforeEach(() => {
        collectionService = new UserCollectionServiceMock() as EntityCollectionService<User>;
        store = new DefaultEntityStore(collectionService);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should delegate getAll to entityService.getAll() method', () => {
        const result = [];
        spyOn(collectionService, 'getAll').and.callFake(() => of(result));

        // check returned result
        store.getAll().subscribe((data) => expect(data).toBe(result));

        expect(collectionService.getAll).toHaveBeenCalled();
    });

    it('should delegate getBy to entityService.getByKey() method', () => {
        const id = '27';
        const result = new User(id, 'John', 35);

        spyOn(collectionService, 'getByKey').and.callFake(() => of(result));

        // check returned result
        store.getBy(id).subscribe((data) => expect(data).toBe(result));

        expect(collectionService.getByKey).toHaveBeenCalledOnceWith(id);
    });

    it('should delegate getWithQuery to entityService.getWithQuery() method', () => {
        const query = '?name=Sam';
        const result = [];

        // check returned result
        spyOn(collectionService, 'getWithQuery').and.callFake(() => of(result));

        store.getWithQuery(query).subscribe((data) => expect(data).toBe(result));

        expect(collectionService.getWithQuery).toHaveBeenCalledOnceWith(query);
    });

    it('should delegate save to entityService.update() method if entity id exists', () => {
        const user = new User('1', 'John', 35);

        // check returned result
        spyOn(collectionService, 'update').and.callFake(() => of(user));

        store.save(user).subscribe((data) => expect(data).toBe(user));

        expect(collectionService.update).toHaveBeenCalledOnceWith(user);
    });

    it("should delegate save to entityService.add() method if entity id doesn't exist", () => {
        const user = new User(undefined, 'John', 35);

        // check returned result
        spyOn(collectionService, 'add').and.callFake(() => of(user));

        store.save(user).subscribe((data) => expect(data).toBe(user));

        expect(collectionService.add).toHaveBeenCalledOnceWith(user);
    });

    it('should delegate delete to entityService.delete()', () => {
        const user = new User('1', 'John', 35);

        // check returned result
        spyOn(collectionService, 'delete').and.callFake(() => of(user.id));

        store.delete(user).subscribe((data) => expect(data).toBe(user));

        expect(collectionService.delete).toHaveBeenCalledOnceWith(user);
    });
});
