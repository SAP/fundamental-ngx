import { EntityCollectionServiceFactory } from '@ngrx/data';

import { EntityMetaOptionsService, EntityResourceMetaOptions, EntityMetaOptions } from '../../entity-options.service';
import {
    DefaultEntityStoreBuilder,
    DefaultEntityStoreBuilderFactory
} from './entity-store-builder';
import { DefaultEntityStore } from './entity-store';

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

describe('Default DefaultEntityStoreBuilderFactory', () => {
    let entityStoreBuilderFactory: DefaultEntityStoreBuilderFactory;
    let entityServiceFactory: EntityCollectionServiceFactory;
    let entityMetaOptionsService: EntityMetaOptionsService;

    beforeEach(() => {
        entityServiceFactory = new EntityCollectionServiceFactoryMock();
        entityMetaOptionsService = new EntityMetaOptionsServiceMock();
        entityStoreBuilderFactory = new DefaultEntityStoreBuilderFactory(
            entityServiceFactory,
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
    let entityMetaOptionsService: EntityMetaOptionsService;

    beforeEach(() => {
        entityServiceFactory = new EntityCollectionServiceFactoryMock();
        entityMetaOptionsService = new EntityMetaOptionsServiceMock();
        builder = new DefaultEntityStoreBuilder(User, entityServiceFactory, entityMetaOptionsService);
    });

    it('should be created', () => {
        expect(builder).toBeTruthy();
    });

    it('should create new store', () => {
        spyOn(entityServiceFactory, 'create');
        spyOn(entityMetaOptionsService, 'getEntityMetadata').and.returnValue({ name: 'User' });
        spyOn(builder, 'reset');

        const store = builder.create();

        expect(store instanceof DefaultEntityStore).toBeTruthy();

        expect(entityServiceFactory.create).toHaveBeenCalledOnceWith('User');

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

    it('should has "isTransient" method defined', () => {
        const returnedValue = builder.isTransient();
        // return builder instance
        expect(returnedValue instanceof DefaultEntityStoreBuilder).toBeTruthy();
    });
});
