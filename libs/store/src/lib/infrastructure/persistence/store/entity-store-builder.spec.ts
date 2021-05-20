import {
    EntityMetaOptionsService,
    EntityResourceMetaOptions,
    EntityMetaOptions
} from '../utils/entity-options.service';
import { DefaultEntityStoreBuilder, DefaultEntityStoreBuilderFactory } from './entity-store-builder';
import { DefaultEntityStore } from './entity-store';
import { BaseEntity, EntityBaseType, IdentityKey } from './entity-server/interfaces';
import { EntityType } from '../../../domain/decorators';
import { EntityCollectionsService } from './entity-collections-service';
import { EntityCollectionService } from './entity-collection-service';
import { EntityDTOType } from '../../../domain/entity';
import { Type } from '../../../domain/utility';

class ChildEntity extends BaseEntity<{ name: string }> {
    name: 'child entity';

    get identity(): IdentityKey {
        return this.value.name;
    }
}

class User extends BaseEntity<{}> {
    id: string;
    name: string;
    age: number;
    child: ChildEntity;

    get identity(): IdentityKey {
        return this.id;
    }
}

class EntityMetaOptionsServiceMock implements EntityMetaOptionsService {
    getEntityResourceMetadata<T>(entity: string | EntityType<T>): EntityResourceMetaOptions {
        throw new Error('Method not implemented.');
    }
    getEntityMetadata<T>(entity: string | EntityType<T>): EntityMetaOptions<T> {
        throw new Error('Method not implemented.');
    }

    getEntityTypeByName(entityName: string): EntityBaseType {
        throw new Error('Method not implemented.');
    }
}

class EntityCollectionsServiceMock implements EntityCollectionsService {
    getEntityCollectionService<T extends BaseEntity<EntityDTOType<T>>>(
        entityType: Type<T>
    ): EntityCollectionService<EntityDTOType<T>> {
        throw new Error('Method not implemented.');
    }
    registerEntityCollectionService<T extends BaseEntity<EntityDTOType<T>>>(
        entityType: Type<T>,
        entityCollectionService: EntityCollectionService<EntityDTOType<T>>
    ): void {
        throw new Error('Method not implemented.');
    }
}

describe('Default DefaultEntityStoreBuilderFactory', () => {
    let entityStoreBuilderFactory: DefaultEntityStoreBuilderFactory;
    let entityCollectionsService: EntityCollectionsService;
    let entityMetaOptionsService: EntityMetaOptionsService;

    beforeEach(() => {
        entityCollectionsService = new EntityCollectionsServiceMock();
        entityMetaOptionsService = new EntityMetaOptionsServiceMock();
        spyOn(entityMetaOptionsService, 'getEntityMetadata').and.returnValue({
            name: 'User'
        });
        entityStoreBuilderFactory = new DefaultEntityStoreBuilderFactory(entityCollectionsService);
    });

    it('should be created', () => {
        expect(entityStoreBuilderFactory).toBeTruthy();
    });

    it('should create new store builder by "create" method', () => {
        const userStoreBuilder = entityStoreBuilderFactory.create(User);

        expect(userStoreBuilder).toBeTruthy();
    });
});

describe('Default EntityStoreBuilder', () => {
    let builder: DefaultEntityStoreBuilder<User>;
    let entityCollectionsService: EntityCollectionsService;
    let entityMetaOptionsService: EntityMetaOptionsService;

    beforeEach(() => {
        entityCollectionsService = new EntityCollectionsServiceMock();
        entityMetaOptionsService = new EntityMetaOptionsServiceMock();
        builder = new DefaultEntityStoreBuilder(User, entityCollectionsService);
    });

    it('should be created', () => {
        expect(builder).toBeTruthy();
    });

    it('should create new store', () => {
        spyOn(entityCollectionsService, 'getEntityCollectionService');
        spyOn(entityMetaOptionsService, 'getEntityMetadata').and.returnValue({ name: 'User' });
        spyOn(builder, 'reset');

        const store = builder.create();

        expect(store instanceof DefaultEntityStore).toBeTruthy();

        expect(entityCollectionsService.getEntityCollectionService).toHaveBeenCalledOnceWith(User);

        expect(builder.reset).toHaveBeenCalled();
    });

    it('should has "useCachePolicy" method defined', () => {
        const returnedValue = builder.useCachePolicy({ strategy: null });
        // return builder instance
        expect(returnedValue instanceof DefaultEntityStoreBuilder).toBeTruthy();
    });

    it('should has "useFetchPolicy" method defined', () => {
        const returnedValue = builder.useFetchPolicy({ strategy: null });
        // return builder instance
        expect(returnedValue instanceof DefaultEntityStoreBuilder).toBeTruthy();
    });

    it('should has "withChainingStrategy" method defined', () => {
        const returnedValue = builder.withChainingStrategy({ child: 'non-block' });
        // return builder instance
        expect(returnedValue instanceof DefaultEntityStoreBuilder).toBeTruthy();
    });
});
