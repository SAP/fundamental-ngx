import { EntityServices, EntityCollectionService as NgrxEntityCollectionService } from '@ngrx/data';
import { fail } from 'assert';
import { Observable, of } from 'rxjs';
import { EntityMetaOptions, EntityMetaOptionsService } from '../utils/entity-options.service';
import { EntityCollectionService } from './entity-collection-service';
import { DefaultEntityCollectionService } from './entity-collection-service-base';
import { EntityCollectionsService } from './entity-collections-service';
import { BaseEntity } from './entity-server/interfaces';

class Advantage extends BaseEntity {
    constructor(public id: string, public title: string) {
        super();
    }
}

class Hero extends BaseEntity {
    id: string;
    name: string;
    advantages: Advantage[];
}

describe('EntityCollectionService', function () {
    let service: DefaultEntityCollectionService<Hero>;
    let entityServices: jasmine.SpyObj<EntityServices>;
    let entityMetaOptionsService: jasmine.SpyObj<EntityMetaOptionsService>;
    let ngrxHeroCollectionService: jasmine.SpyObj<NgrxEntityCollectionService<Hero>>;
    let entityCollectionsService: jasmine.SpyObj<EntityCollectionsService>;

    beforeEach(() => {
        ngrxHeroCollectionService = jasmine.createSpyObj<NgrxEntityCollectionService<Hero>>(
            'EntityCollectionService',
            ['add', 'delete', 'getAll', 'getByKey', 'getWithQuery', 'update', 'upsert'],
            ['collection$', 'entities$', 'count$']
        );

        entityServices = jasmine.createSpyObj<EntityServices>('EntityServices', ['getEntityCollectionService']);
        entityServices.getEntityCollectionService.and.returnValue(ngrxHeroCollectionService);

        entityMetaOptionsService = jasmine.createSpyObj<EntityMetaOptionsService>('EntityMetaOptionsService', [
            'getEntityMetadata'
        ]);
        entityMetaOptionsService.getEntityMetadata.and.callFake(
            <T extends BaseEntity>(entity: any): EntityMetaOptions<T> => {
                const result: EntityMetaOptions<Hero> = {
                    name: 'Hero',
                    chainingPolicy: {
                        fields: {
                            advantages: {
                                strategy: 'non-block',
                                type: Array(Advantage)
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
            expect(ngrxHeroCollectionService.getAll).toHaveBeenCalled();
        });
    });

    describe('#getWithQuery()', () => {
        it('should delegate request to the ngrx service', () => {
            const query = {};
            service.getWithQuery(query as any);
            expect(ngrxHeroCollectionService.getWithQuery).toHaveBeenCalledWith(query as any);
        });
    });

    describe('#getBeKy()', () => {
        it('should delegate request to the ngrx service', () => {
            service.getByKey('123');
            expect(ngrxHeroCollectionService.getByKey).toHaveBeenCalledWith('123');
        });

        it('should make subsequent call to retrieve sub entity data', (done) => {
            const hero: Hero = {
                id: '123',
                name: 'Hero',
                advantages: []
            };
            const advantages: Advantage[] = [new Advantage('1', 'smart'), new Advantage('1', 'quick')];

            const advantageCollectionService = jasmine.createSpyObj<EntityCollectionService<Advantage>>(
                'AdvantageCollectionService',
                ['getAll']
            );
            advantageCollectionService.getAll.and.callFake(() => {
                return of(advantages);
            });

            ngrxHeroCollectionService.getByKey.and.callFake(() => {
                return of(hero);
            });

            entityCollectionsService.getEntityCollectionService.and.returnValue(advantageCollectionService);

            service.getByKey('123').subscribe((result) => {
                expect(advantageCollectionService.getAll).toHaveBeenCalled();
                expect(result).toEqual({
                    ...hero,
                    advantages: advantages
                });
                done();
            }, fail);

            expect(ngrxHeroCollectionService.getByKey).toHaveBeenCalledWith('123');
        });
    });

    describe('#add()', () => {
        it('should delegate request to the ngrx service', () => {
            const entity = new Hero();
            service.add(entity);
            expect(ngrxHeroCollectionService.add).toHaveBeenCalledWith(entity);
        });
    });

    describe('#delete()', () => {
        it('should delegate request to the ngrx service', () => {
            const entity = new Hero();
            service.delete(entity);
            expect(ngrxHeroCollectionService.delete).toHaveBeenCalledWith(entity as any);
        });
    });

    describe('#update()', () => {
        it('should delegate request to the ngrx service', () => {
            const entity = new Hero();
            service.update(entity);
            expect(ngrxHeroCollectionService.update).toHaveBeenCalledWith(entity);
        });
    });

    describe('#upsert()', () => {
        it('should delegate request to the ngrx service', () => {
            const entity = new Hero();
            service.upsert(entity);
            expect(ngrxHeroCollectionService.upsert).toHaveBeenCalledWith(entity);
        });
    });

    describe('#count$', () => {
        it('should delegate to the appropriate ngrx service property', () => {
            (Object.getOwnPropertyDescriptor(ngrxHeroCollectionService, 'count$').get as jasmine.Spy).and.returnValue(
                'count observable'
            );
            expect(ngrxHeroCollectionService.count$).toBe('count observable' as any);
        });
    });

    describe('#collection$', () => {
        it('should delegate to the appropriate ngrx service property', () => {
            (Object.getOwnPropertyDescriptor(ngrxHeroCollectionService, 'collection$')
                .get as jasmine.Spy).and.returnValue('collection observable');
            expect(ngrxHeroCollectionService.collection$).toBe('collection observable' as any);
        });
    });

    describe('#entities$', () => {
        it('should delegate to the appropriate ngrx service property', () => {
            (Object.getOwnPropertyDescriptor(ngrxHeroCollectionService, 'entities$')
                .get as jasmine.Spy).and.returnValue('entities observable');
            expect(ngrxHeroCollectionService.entities$).toBe('entities observable' as any);
        });
    });
});
