import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { EntityMetaOptions, EntityMetaOptionsService } from '../utils/entity-options.service';
import { DefaultEntityCollectionService } from './entity-collection-service-base';
import { EntityCollectionsService } from './entity-collections-service';
import { BaseEntity } from './entity-server/interfaces';

class SubEntity extends BaseEntity {
    id: string;
    title: string;
}

class Hero extends BaseEntity {
    id: string;
    name: string;
    childEntity: SubEntity;
}

describe('EntityCollectionService', function () {
    let service: DefaultEntityCollectionService<Hero>;
    let entityServices: jasmine.SpyObj<EntityServices>;
    let entityMetaOptionsService: jasmine.SpyObj<EntityMetaOptionsService>;
    let ngrxEntityCollectionService: jasmine.SpyObj<EntityCollectionService<Hero>>;
    let entityCollectionsService: jasmine.SpyObj<EntityCollectionsService>;

    beforeEach(() => {
        ngrxEntityCollectionService = jasmine.createSpyObj<EntityCollectionService<Hero>>(
            'EntityCollectionService',
            ['add', 'delete', 'getAll', 'getByKey', 'getWithQuery', 'update', 'upsert'],
            ['collection$', 'entities$', 'count$']
        );

        entityServices = jasmine.createSpyObj<EntityServices>('EntityServices', ['getEntityCollectionService']);
        entityServices.getEntityCollectionService.and.returnValue(ngrxEntityCollectionService);

        entityMetaOptionsService = jasmine.createSpyObj<EntityMetaOptionsService>('EntityMetaOptionsService', [
            'getEntityMetadata'
        ]);
        entityMetaOptionsService.getEntityMetadata.and.callFake(
            <T extends BaseEntity>(entity: any): EntityMetaOptions<T> => {
                const result: EntityMetaOptions<Hero> = {
                    name: 'Hero',
                    chainingPolicy: {
                        fields: {
                            childEntity: {
                                strategy: 'non-block',
                                type: SubEntity
                            }
                        }
                    }
                };
                return result as any;
            }
        );

        entityCollectionsService = jasmine.createSpyObj<EntityCollectionsService>('EntityCollectionsService', [
            'getEntityCollectionService'
        ]);

        service = new DefaultEntityCollectionService(
            Hero,
            entityServices,
            entityMetaOptionsService,
            entityCollectionsService
        );
    });

    it('Should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#getAll()', () => {
        it('should delegate request to the ngrx service', () => {
            service.getAll();
            expect(ngrxEntityCollectionService.getAll).toHaveBeenCalled();
        });
    });

    describe('#getWithQuery()', () => {
        it('should delegate request to the ngrx service', () => {
            const query = {};
            service.getWithQuery(query as any);
            expect(ngrxEntityCollectionService.getWithQuery).toHaveBeenCalledWith(query as any);
        });
    });

    describe('#getBeKy()', () => {
        it('should delegate request to the ngrx service', () => {
            service.getByKey('123');
            expect(ngrxEntityCollectionService.getByKey).toHaveBeenCalledWith('123');
        });
    });

    describe('#add()', () => {
        it('should delegate request to the ngrx service', () => {
            const entity = new Hero();
            service.add(entity);
            expect(ngrxEntityCollectionService.add).toHaveBeenCalledWith(entity);
        });
    });

    describe('#delete()', () => {
        it('should delegate request to the ngrx service', () => {
            const entity = new Hero();
            service.delete(entity);
            expect(ngrxEntityCollectionService.delete).toHaveBeenCalledWith(entity as any);
        });
    });

    describe('#update()', () => {
        it('should delegate request to the ngrx service', () => {
            const entity = new Hero();
            service.update(entity);
            expect(ngrxEntityCollectionService.update).toHaveBeenCalledWith(entity);
        });
    });

    describe('#upsert()', () => {
        it('should delegate request to the ngrx service', () => {
            const entity = new Hero();
            service.upsert(entity);
            expect(ngrxEntityCollectionService.upsert).toHaveBeenCalledWith(entity);
        });
    });

    describe('#count$', () => {
        it('should delegate to the appropriate ngrx service property', () => {
            (Object.getOwnPropertyDescriptor(ngrxEntityCollectionService, 'count$').get as jasmine.Spy).and.returnValue(
                'count observable'
            );
            expect(ngrxEntityCollectionService.count$).toBe('count observable' as any);
        });
    });

    describe('#collection$', () => {
        it('should delegate to the appropriate ngrx service property', () => {
            (Object.getOwnPropertyDescriptor(ngrxEntityCollectionService, 'collection$')
                .get as jasmine.Spy).and.returnValue('collection observable');
            expect(ngrxEntityCollectionService.collection$).toBe('collection observable' as any);
        });
    });

    describe('#entities$', () => {
        it('should delegate to the appropriate ngrx service property', () => {
            (Object.getOwnPropertyDescriptor(ngrxEntityCollectionService, 'entities$')
                .get as jasmine.Spy).and.returnValue('entities observable');
            expect(ngrxEntityCollectionService.entities$).toBe('entities observable' as any);
        });
    });
});
