import { EntityServices, EntityCollectionService as NgrxEntityCollectionService } from '@ngrx/data';
import { fail } from 'assert';
import { of, Subject } from 'rxjs';

import { IdentityKey, BaseEntity } from '../../../domain/entity';
import { EntityMetaOptions, EntityMetaOptionsService } from '../utils/entity-options.service';
import { EntityCollectionService } from './entity-collection-service';
import { DefaultEntityCollectionService } from './entity-collection-service-base';
import { EntityCollectionsService } from './entity-collections-service';

describe('EntityCollectionService', () => {
    let service: DefaultEntityCollectionService<HeroDTO>;
    let entityServices: jasmine.SpyObj<EntityServices>;
    let entityMetaOptionsService: jasmine.SpyObj<EntityMetaOptionsService>;
    let ngrxHeroCollectionService: jasmine.SpyObj<NgrxEntityCollectionService<HeroDTO>>;
    let entityCollectionsService: jasmine.SpyObj<EntityCollectionsService>;
    let entityMetaOptions: EntityMetaOptions<Hero>;

    class AdvantageDTO {
        id: string; 
        title: string;
    }
    class Advantage extends BaseEntity<AdvantageDTO> {
        constructor(public id: string, public title: string) {
            super({ id, title });
        }

        get identity(): IdentityKey {
            return this.id;
        }
    }

    interface UserDTO {
        id: string; 
        name: string;
    }

    class User extends BaseEntity<UserDTO> {
        constructor(public id: string, public name: string) {
            super({ id, name });
        }

        get identity(): IdentityKey {
            return this.id;
        }
    }

    interface HeroDTO {
        id: string;
        name: string;
        advantages: Advantage[];
        owner: User;
        ownerId: string;
    }

    class Hero extends BaseEntity<HeroDTO> {
        id: string;
        name: string;
        advantages: Advantage[];
        owner: User;
        ownerId: string;

        get identity(): IdentityKey {
            return this.value.id;
        }
    }

    beforeEach(() => {
        ngrxHeroCollectionService = jasmine.createSpyObj<NgrxEntityCollectionService<HeroDTO>>(
            'EntityCollectionService',
            ['add', 'delete', 'getAll', 'getByKey', 'getWithQuery', 'update', 'upsert'],
            ['collection$', 'entities$', 'count$', 'loading$', 'loaded$', 'errors$']
        );

        Object.defineProperty(ngrxHeroCollectionService, 'errors$', {
            value: of(null)
        });

        entityServices = jasmine.createSpyObj<EntityServices>('EntityServices', ['getEntityCollectionService']);
        entityServices.getEntityCollectionService.and.returnValue(ngrxHeroCollectionService);

        entityMetaOptions = {
            name: 'Hero'
        };
        entityMetaOptionsService = jasmine.createSpyObj<EntityMetaOptionsService>('EntityMetaOptionsService', [
            'getEntityMetadata'
        ]);
        entityMetaOptionsService.getEntityMetadata.and.returnValue(entityMetaOptions as any);

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

    describe('#add()', () => {
        it('should delegate request to the ngrx service', () => {
            const entity = new Hero({} as HeroDTO);
            service.add(entity);
            expect(ngrxHeroCollectionService.add).toHaveBeenCalledWith(entity);
        });
    });

    describe('#delete()', () => {
        it('should delegate request to the ngrx service', () => {
            const entity = new Hero({} as HeroDTO);
            service.delete(entity);
            expect(ngrxHeroCollectionService.delete).toHaveBeenCalledWith(entity as any);
        });
    });

    describe('#update()', () => {
        it('should delegate request to the ngrx service', () => {
            const entity = new Hero({} as HeroDTO);
            service.update(entity);
            expect(ngrxHeroCollectionService.update).toHaveBeenCalledWith(entity);
        });
    });

    describe('#upsert()', () => {
        it('should delegate request to the ngrx service', () => {
            const entity = new Hero({} as HeroDTO);
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

    describe('#getBeKy()', () => {
        it('should delegate request to the ngrx service using "block" strategy', () => {
            service.getByKey('123');
            expect(ngrxHeroCollectionService.getByKey).toHaveBeenCalledWith('123');
        });

        describe('requests chaining', () => {
            describe('"strategy" option', () => {
                let hero: Hero;
                let owner: User;
                let userCollectionService: jasmine.SpyObj<EntityCollectionService<User>>;
                let heroSubject: Subject<Hero>;
                let ownerSubject: Subject<User>;

                beforeEach(() => {
                    hero = {
                        id: '123',
                        name: 'Hero',
                        advantages: [],
                        owner: null,
                        ownerId: '456'
                    } as Hero;
                    owner = new User('456', 'Lord');
                    heroSubject = new Subject<Hero>();

                    userCollectionService = jasmine.createSpyObj<EntityCollectionService<User>>(
                        'UserCollectionService',
                        ['getByKey']
                    );
                    ownerSubject = new Subject<User>();
                    userCollectionService.getByKey.and.callFake(() => {
                        return ownerSubject.asObservable();
                    });
                    entityCollectionsService.getEntityCollectionService.and.returnValue(userCollectionService);

                    ngrxHeroCollectionService.getByKey.and.callFake(() => {
                        return heroSubject.asObservable();
                    });
                });

                afterEach(() => {
                    heroSubject.complete();
                    ownerSubject.complete();
                });

                it('should call chaining even without subscribing to result', () => {
                    // Override Entity Meta Options adding chainingPolicy options
                    entityMetaOptions.chainingPolicy = {
                        fields: {
                            owner: {
                                strategy: 'block',
                                type: User
                            }
                        }
                    };

                    service.getByKey('123');

                    heroSubject.next(hero);

                    expect(userCollectionService.getByKey).toHaveBeenCalledTimes(1);
                });

                describe('"non-block"', () => {
                    it("should return primary entity once it's ready and push sub entity as the next update", () => {
                        // Override Entity Meta Options adding chainingPolicy options
                        entityMetaOptions.chainingPolicy = {
                            fields: {
                                owner: {
                                    strategy: 'non-block', // Non-block strategy
                                    type: User
                                }
                            }
                        };

                        const results: HeroDTO[] = [];

                        service.getByKey('123').subscribe((result) => {
                            results.push(result);
                        }, fail);

                        expect(results.length).toEqual(0);

                        heroSubject.next(hero);

                        expect(results.length).toEqual(1);
                        expect(results[0]).toEqual(hero);

                        ownerSubject.next(owner);

                        expect(results.length).toEqual(2);
                        expect(results[1]).toEqual({
                            ...hero,
                            owner: owner
                        });
                    });

                    it('should forgive sub entity error', () => {
                        // Override Entity Meta Options adding chainingPolicy options
                        entityMetaOptions.chainingPolicy = {
                            fields: {
                                owner: {
                                    strategy: 'non-block',
                                    type: User
                                }
                            }
                        };

                        const results: HeroDTO[] = [];

                        service.getByKey('123').subscribe((result) => {
                            results.push(result);
                        }, fail);

                        expect(results.length).toEqual(0);

                        heroSubject.next(hero);

                        expect(results.length).toEqual(1);
                        expect(results[0]).toEqual(hero);

                        ownerSubject.error('Get Owner Error!');

                        expect(results.length).toEqual(1);
                        expect(results[0]).toEqual(hero);
                    });
                });

                describe('"block"', () => {
                    it('should wait for sub entity response and return entity including sub data', () => {
                        // Override Entity Meta Options adding chainingPolicy options
                        entityMetaOptions.chainingPolicy = {
                            fields: {
                                owner: {
                                    strategy: 'block', // Non-block strategy
                                    type: User
                                }
                            }
                        };

                        const results: HeroDTO[] = [];

                        service.getByKey('123').subscribe((result) => {
                            results.push(result);
                        }, fail);

                        expect(results.length).toEqual(0);

                        heroSubject.next(hero);

                        // No results cause waiting for "owner" response
                        expect(results.length).toEqual(0);

                        // "owner" response
                        ownerSubject.next(owner);

                        // one event and hero is already extended by owner
                        expect(results.length).toEqual(1);
                        expect(results[0]).toEqual({
                            ...hero,
                            owner: owner
                        });
                    });

                    it('should fail when sub entity throws error', (done) => {
                        // Override Entity Meta Options adding chainingPolicy options
                        entityMetaOptions.chainingPolicy = {
                            fields: {
                                owner: {
                                    strategy: 'block',
                                    type: User
                                }
                            }
                        };

                        const results: HeroDTO[] = [];

                        service.getByKey('123').subscribe({
                            next: (result) => {
                                results.push(result);
                            },
                            error: (error) => {
                                expect(error).toBe('Get Owner Error!');
                                done();
                            }
                        });

                        heroSubject.next(hero);

                        ownerSubject.error('Get Owner Error!');
                    });
                });
            });

            describe('"type" option', () => {
                describe('for collection', () => {
                    it('should make sub call to retrieve sub entity as collection', () => {
                        const hero: Hero = {
                            id: '123',
                            name: 'Hero',
                            advantages: [],
                            owner: null,
                            ownerId: '456'
                        } as Hero;
                        const advantages: Advantage[] = [new Advantage('1', 'smart'), new Advantage('1', 'quick')];

                        const advantageCollectionService = jasmine.createSpyObj<EntityCollectionService<Advantage>>(
                            'AdvantageCollectionService',
                            ['getAll']
                        );
                        advantageCollectionService.getAll.and.callFake(() => {
                            return of(advantages);
                        });
                        entityCollectionsService.getEntityCollectionService.and.returnValue(advantageCollectionService);

                        ngrxHeroCollectionService.getByKey.and.callFake(() => {
                            return of(hero);
                        });

                        // Override Entity Meta Options adding chainingPolicy options
                        entityMetaOptions.chainingPolicy = {
                            fields: {
                                advantages: {
                                    strategy: 'block',
                                    type: Array(Advantage)
                                }
                            }
                        };

                        const results = [];
                        service.getByKey('123').subscribe((result) => {
                            results.push(result);
                        });

                        expect(results.length).toEqual(1);

                        // "Hero" model should be extended by "advantages" collection
                        expect(results[0]).toEqual({
                            ...hero,
                            advantages: advantages
                        });
                    });
                });

                describe('for single entity', () => {
                    let hero: Hero;
                    let owner: User;
                    let userCollectionService: jasmine.SpyObj<EntityCollectionService<User>>;

                    beforeEach(() => {
                        hero = {
                            id: '123',
                            name: 'Hero',
                            advantages: [],
                            owner: null,
                            ownerId: '456'
                        } as Hero;
                        owner = new User('456', 'Lord');

                        userCollectionService = jasmine.createSpyObj<EntityCollectionService<User>>(
                            'UserCollectionService',
                            ['getByKey']
                        );
                        userCollectionService.getByKey.and.callFake(() => {
                            return of(owner);
                        });
                        entityCollectionsService.getEntityCollectionService.and.returnValue(userCollectionService);

                        ngrxHeroCollectionService.getByKey.and.callFake(() => {
                            return of(hero);
                        });
                    });

                    it('should make subsequent call to retrieve sub entity as single object', () => {
                        // Override Entity Meta Options adding chainingPolicy options
                        entityMetaOptions.chainingPolicy = {
                            fields: {
                                owner: {
                                    strategy: 'block',
                                    type: User,
                                    key: 'ownerId'
                                }
                            }
                        };

                        const results = [];

                        service.getByKey('123').subscribe((result) => {
                            results.push(result);
                        }, fail);

                        expect(results.length).toEqual(1);

                        // "Hero" model should be extended by "owner" model
                        expect(results[0]).toEqual({
                            ...hero,
                            owner: owner
                        });
                    });
                });
            });

            describe('"key" option', () => {
                let hero: Hero;
                let owner: User;
                let userCollectionService: jasmine.SpyObj<EntityCollectionService<User>>;

                beforeEach(() => {
                    hero = {
                        id: '123',
                        name: 'Hero',
                        advantages: [],
                        owner: null,
                        ownerId: '456'
                    } as Hero;
                    owner = new User('456', 'Lord');

                    userCollectionService = jasmine.createSpyObj<EntityCollectionService<User>>(
                        'UserCollectionService',
                        ['getByKey']
                    );
                    userCollectionService.getByKey.and.callFake(() => {
                        return of(owner);
                    });
                    entityCollectionsService.getEntityCollectionService.and.returnValue(userCollectionService);

                    ngrxHeroCollectionService.getByKey.and.callFake(() => {
                        return of(hero);
                    });
                });

                it('should be able to handle it as a string', () => {
                    // Override Entity Meta Options adding chainingPolicy options
                    entityMetaOptions.chainingPolicy = {
                        fields: {
                            owner: {
                                strategy: 'block',
                                type: User,
                                key: 'ownerId'
                            }
                        }
                    };

                    service.getByKey('123').subscribe();

                    expect(userCollectionService.getByKey).toHaveBeenCalledOnceWith('456');
                });

                it('should be able to handle it as a function', () => {
                    // Override Entity Meta Options adding chainingPolicy options
                    entityMetaOptions.chainingPolicy = {
                        fields: {
                            owner: {
                                strategy: 'block',
                                type: User,
                                key: (entity: Hero) => entity.ownerId
                            }
                        }
                    };

                    service.getByKey('123').subscribe();

                    expect(userCollectionService.getByKey).toHaveBeenCalledOnceWith('456');
                });
            });
        });
    });
});
