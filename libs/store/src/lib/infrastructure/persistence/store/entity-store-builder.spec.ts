import { EntityCollectionServiceFactory } from '@ngrx/data';

import {
    EntityMetaOptionsService,
    EntityResourceMetaOptions,
    EntityMetaOptions
} from '../utils/entity-options.service';
import { DefaultEntityStoreBuilder, DefaultEntityStoreBuilderFactory } from './entity-store-builder';
import { DefaultEntityStore } from './entity-store';
import { QueryAdapterFactory } from '../query/query-adapter';

class User {
    constructor(public id: string | string, public name: string, public age: number) {}
}

class EntityMetaOptionsServiceMock implements EntityMetaOptionsService {
    getEntityMetadata(): EntityMetaOptions {
        return null;
    }

    getEntityResourceMetadata(): EntityResourceMetaOptions {
        return null;
    }
}

class EntityCollectionServiceFactoryMock implements EntityCollectionServiceFactory {
    entityCollectionServiceElementsFactory = null;

    create() {
        return null;
    }
}

class QueryAdapterFactoryMock extends QueryAdapterFactory {
    create() {
        return null;
    }
}

describe('Default DefaultEntityStoreBuilderFactory', () => {
    let entityStoreBuilderFactory: DefaultEntityStoreBuilderFactory;
    let entityServiceFactory: EntityCollectionServiceFactory;
    let queryAdapterFactory: QueryAdapterFactory;
    let entityMetaOptionsService: EntityMetaOptionsService;

    beforeEach(() => {
        entityServiceFactory = new EntityCollectionServiceFactoryMock();
        queryAdapterFactory = new QueryAdapterFactoryMock();
        entityMetaOptionsService = new EntityMetaOptionsServiceMock();
        entityStoreBuilderFactory = new DefaultEntityStoreBuilderFactory(
            entityServiceFactory,
            queryAdapterFactory,
            entityMetaOptionsService
        );
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
    let entityServiceFactory: EntityCollectionServiceFactory;
    let queryAdapterFactory: QueryAdapterFactory;
    let entityMetaOptionsService: EntityMetaOptionsService;

    beforeEach(() => {
        entityServiceFactory = new EntityCollectionServiceFactoryMock();
        queryAdapterFactory = new QueryAdapterFactoryMock();
        entityMetaOptionsService = new EntityMetaOptionsServiceMock();
        builder = new DefaultEntityStoreBuilder(
            User,
            entityServiceFactory,
            queryAdapterFactory,
            entityMetaOptionsService
        );
    });

    it('should be created', () => {
        expect(builder).toBeTruthy();
    });

    it('should create new store', () => {
        spyOn(entityServiceFactory, 'create');
        spyOn(queryAdapterFactory, 'create');
        spyOn(entityMetaOptionsService, 'getEntityMetadata').and.returnValue({ name: 'User' });
        spyOn(builder, 'reset');

        const store = builder.create();

        expect(store instanceof DefaultEntityStore).toBeTruthy();

        expect(entityServiceFactory.create).toHaveBeenCalledOnceWith('User');

        expect(queryAdapterFactory.create).toHaveBeenCalled();

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
});
