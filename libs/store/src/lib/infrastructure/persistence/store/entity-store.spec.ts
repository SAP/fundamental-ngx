import { of } from 'rxjs';

import { Type } from '../../../domain/utility';
import { IdentityKey, BaseEntity } from '../../../domain/entity';
import { QueryBuilder } from '../query/query-builder';
import { DefaultEntityStore } from './entity-store';
import { EntityCollectionService } from './entity-collection-service';

class UserDTO {
    id: IdentityKey;
    name: string;
    age: number;
}
class User extends BaseEntity<UserDTO> {
    get identity(): IdentityKey {
        return this.value.id;
    }
}

class UserCollectionServiceMock implements Partial<EntityCollectionService<UserDTO>> {
    getAll() {
        return of([]);
    }

    getWithQuery(query: any) {
        return of([]);
    }

    getByKey(key: any) {
        return of(null);
    }

    add(entity: UserDTO) {
        return of(entity);
    }

    update(entity: UserDTO) {
        return of(entity);
    }

    delete(entityOrId: UserDTO | string | number) {
        return entityOrId instanceof Object ? of(entityOrId.id) : of(entityOrId);
    }
}

class QueryBuilderMock extends QueryBuilder<User> {}

describe('Default Entity Store', () => {
    let entity: Type<User>;
    let store: DefaultEntityStore<User>;
    let collectionService: EntityCollectionService<UserDTO>;
    let queryBuilder: QueryBuilder<User>;

    beforeEach(() => {
        entity = User;
        collectionService = new UserCollectionServiceMock() as EntityCollectionService<UserDTO>;
        queryBuilder = new QueryBuilderMock(null);
        store = new DefaultEntityStore(entity, collectionService, queryBuilder);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should delegate getBy to entityService.getByKey() method', () => {
        const dto: UserDTO = { id: '27', name: 'John', age: 35 };
        const result: User = new User(dto);

        spyOn(collectionService, 'getByKey').and.callFake(() => of(dto as any));

        // check returned result
        store.get('27').subscribe((data) => {
            expect(data.value).toEqual(result.value);
        });

        expect(collectionService.getByKey).toHaveBeenCalledOnceWith('27');
    });

    it('should delegate save to entityService.update() method if entity id exists', () => {
        const userDto: UserDTO = { id: '27', name: 'John', age: 35 };
        const user: User = new User(userDto);

        // check returned result
        spyOn(collectionService, 'update').and.callFake(() => of(userDto));

        store.save(user).subscribe((data) => {
            expect(data).toBeInstanceOf(User);
            expect(data.value).toEqual(userDto);
        });

        expect(collectionService.update).toHaveBeenCalledOnceWith(userDto);
    });

    it("should delegate save to entityService.add() method if entity id doesn't exist", () => {
        const userDto: UserDTO = { id: undefined, name: 'John', age: 35 };
        const user = new User(userDto);

        // check returned result
        spyOn(collectionService, 'add').and.callFake(() => of(userDto));

        store.save(user).subscribe((data) => {
            expect(data).toBeInstanceOf(User);
            expect(data.value).toEqual(userDto)
        });

        expect(collectionService.add).toHaveBeenCalledOnceWith(userDto);
    });

    it('should delegate delete to entityService.delete()', () => {
        const userDto: UserDTO = { id: '27', name: 'John', age: 35 };
        const user = new User(userDto);

        // check returned result
        spyOn(collectionService, 'delete').and.callFake(() => of(user.identity));

        store.delete(user).subscribe((data) => {
            expect(data).toBe(user);
        });

        expect(collectionService.delete).toHaveBeenCalledOnceWith(userDto);
    });

    it('should has queryBuilder reference', () => {
        expect(store.queryBuilder instanceof QueryBuilder).toBeTrue();
    });

    it('should create a new instance by `createEntityInstance`', () => {
        const userInstance = store.createEntityInstance();
        expect(userInstance instanceof User).toBeTrue();
    });
});
