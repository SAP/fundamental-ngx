import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { Update } from '@ngrx/entity';
import { DefaultDataServiceConfig, DataServiceError, Pluralizer } from '@ngrx/data';

import { EntityOperationComplexPath } from '../../../../domain/rest-resource';
import { EntityRestServerServiceFactory, EntityRestServerService } from './entity-rest-server';
import { HttpUrlGenerator, DefaultHttpUrlGenerator } from '../http-url-generator';
import {
    EntityMetaOptionsService,
    EntityResourceMetaOptions,
    EntityMetaOptions
} from '../../utils/entity-options.service';
import { Entity } from './interfaces';

class Hero extends Entity {
    id!: number;
    name!: string;
    version?: number;
}

class MockPluralizer extends Pluralizer {
    pluralize(name: string): string {
        name = name.toLowerCase();
        return name === 'hero' ? 'heroes' : name + 's';
    }
}

class EmptyEntityMetaOptionsService implements EntityMetaOptionsService {
    getEntityMetadata = () => null;
    getEntityResourceMetadata = () => null;
}

describe('EntityRestServerServiceFactory', () => {
    let http: any;
    let httpUrlGenerator: HttpUrlGenerator;
    let entityMetaOptionsService: EntityMetaOptionsService;

    beforeEach(() => {
        httpUrlGenerator = new DefaultHttpUrlGenerator(new MockPluralizer());

        entityMetaOptionsService = new EmptyEntityMetaOptionsService();

        spyOn(entityMetaOptionsService, 'getEntityResourceMetadata').and.callFake(
            (entityName: any): EntityResourceMetaOptions => {
                return {
                    path: {
                        getAll: 'heroes'
                    }
                };
            }
        );
        spyOn(entityMetaOptionsService, 'getEntityMetadata').and.callFake(
            (entityName: any): EntityMetaOptions => {
                return { name: 'Hero' };
            }
        );

        http = {
            get: jasmine.createSpy('get'),
            delete: jasmine.createSpy('delete'),
            post: jasmine.createSpy('post'),
            put: jasmine.createSpy('put')
        };
        http.get.and.returnValue(of([]));
    });

    describe('(no config)', () => {
        it('can create factory', () => {
            const factory = new EntityRestServerServiceFactory(http, httpUrlGenerator, entityMetaOptionsService);
            const heroDS = factory.create<Hero>('Hero');
            expect(heroDS.name).toBe('Hero EntityRestServerService');
        });

        it('should produce hero data service that gets all heroes with expected URL', () => {
            const factory = new EntityRestServerServiceFactory(http, httpUrlGenerator, entityMetaOptionsService);
            const heroDS = factory.create<Hero>('Hero');
            heroDS.getAll();
            expect(http.get).toHaveBeenCalledWith('api/heroes/', undefined);
        });
    });

    describe('(with config)', () => {
        it('can create factory', () => {
            const config: DefaultDataServiceConfig = { root: 'api' };
            const factory = new EntityRestServerServiceFactory(
                http,
                httpUrlGenerator,
                entityMetaOptionsService,
                config
            );
            const heroDS = factory.create<Hero>('Hero');
            expect(heroDS.name).toBe('Hero EntityRestServerService');
        });
    });
});

describe('EntityRestServerService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let httpUrlGenerator: HttpUrlGenerator;
    let service: EntityRestServerService<Hero>;
    let entityMetaOptionsService: EntityMetaOptionsService;
    let heroResourceMetaOptions: EntityResourceMetaOptions;
    let heroEntityMetaOptions: EntityMetaOptions;
    const defaultHeroUrl = 'api/hero/';
    const defaultHeroesUrl = 'api/heroes/';

    //// HttpClient testing boilerplate
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);

        httpUrlGenerator = new DefaultHttpUrlGenerator(new MockPluralizer());

        heroResourceMetaOptions = {
            root: 'api',
            // we need to keep this object for right reference
            // so we can override path options during testing
            path: {}
        };
        heroEntityMetaOptions = {
            name: 'Hero'
        };

        entityMetaOptionsService = new EmptyEntityMetaOptionsService();

        spyOn(entityMetaOptionsService, 'getEntityResourceMetadata').and.callFake(
            (entityName: any): EntityResourceMetaOptions => {
                return heroResourceMetaOptions;
            }
        );
        spyOn(entityMetaOptionsService, 'getEntityMetadata').and.callFake(
            (entityName: any): EntityMetaOptions => {
                return heroEntityMetaOptions;
            }
        );

        service = new EntityRestServerService('Hero', httpClient, httpUrlGenerator, entityMetaOptionsService);
    });

    afterEach(() => {
        // After every test, assert that there are no pending requests.
        httpTestingController.verify();
    });
    ///////////////////

    describe('property inspection', () => {
        // Test wrapper exposes protected properties
        class HeroRestServerService extends EntityRestServerService<Hero> {
            properties = {
                entityMetaOptions: this.entityMetaOptions,
                entityResourceMetaOptions: this.entityResourceMetaOptions,
                getDelay: this.getDelay,
                saveDelay: this.saveDelay,
                timeout: this.timeout
            };
        }

        // tslint:disable-next-line:no-shadowed-variable
        let service: HeroRestServerService;

        beforeEach(() => {
            // use test wrapper class to get to protected properties
            service = new HeroRestServerService('Hero', httpClient, httpUrlGenerator, entityMetaOptionsService);
        });

        it('has expected name', () => {
            expect(service.name).toBe('Hero EntityRestServerService');
        });

        it('has expected single-entity url', () => {
            expect(service.properties.entityMetaOptions).toBe(heroEntityMetaOptions);
        });

        it('has expected multiple-entities url', () => {
            expect(service.properties.entityResourceMetaOptions).toBe(heroResourceMetaOptions);
        });
    });

    describe('#getAll', () => {
        let expectedHeroes: Hero[];

        beforeEach(() => {
            expectedHeroes = [
                { id: 1, name: 'A' },
                { id: 2, name: 'B' }
            ] as Hero[];
        });

        it('should return expected heroes (called once)', () => {
            service.getAll().subscribe((heroes) => expect(heroes).toEqual(expectedHeroes), fail);

            // HeroService should have made one request to GET heroes from expected URL
            const req = httpTestingController.expectOne('api/heroes/');
            expect(req.request.method).toEqual('GET');

            expect(req.request.body).toBeNull();

            // Respond with the mock heroes
            req.flush(expectedHeroes);
        });

        it('should use method and url from ResourceMetaOptions', () => {
            (<EntityOperationComplexPath>heroResourceMetaOptions.path).getAll = ['POST', 'heroes-collection'];

            service.getAll().subscribe((heroes) => expect(heroes).toEqual(expectedHeroes), fail);

            // HeroService should have made one request to GET heroes from expected URL
            const req = httpTestingController.expectOne('api/heroes-collection/');
            expect(req.request.method).toEqual('POST');

            // Respond with the mock heroes
            req.flush(expectedHeroes);
        });

        it('should be OK returning no heroes', () => {
            service.getAll().subscribe((heroes) => expect(heroes.length).toEqual(0), fail);

            const req = httpTestingController.expectOne('api/heroes/');
            req.flush([]); // Respond with no heroes
        });

        it('should return expected heroes (called multiple times)', () => {
            service.getAll().subscribe();
            service.getAll().subscribe();
            service.getAll().subscribe((heroes) => expect(heroes).toEqual(expectedHeroes), fail);

            const requests = httpTestingController.match('api/heroes/');
            expect(requests.length).toEqual(3);

            // Respond to each request with different mock hero results
            requests[0].flush([]);
            requests[1].flush([{ id: 1, name: 'bob' }]);
            requests[2].flush(expectedHeroes);
        });

        it('should turn 404 into Observable<DataServiceError>', () => {
            const msg = 'deliberate 404 error';

            service.getAll().subscribe(
                (heroes) => fail('getAll succeeded when expected it to fail with a 404'),
                (err) => {
                    expect(err).toBeDefined();
                    expect(err instanceof DataServiceError).toBe(true);
                    expect(err.error.status).toEqual(404);
                    expect(err.message).toEqual(msg);
                }
            );

            const req = httpTestingController.expectOne('api/heroes/');

            const errorEvent = {
                // Source of the service's not-so-friendly user-facing message
                message: msg,

                // The rest of this is optional and not used. Just showing that you could.
                filename: 'EntityRestServerService.ts',
                lineno: 42,
                colno: 21
            } as ErrorEvent;

            req.error(errorEvent, { status: 404, statusText: 'Not Found' });
        });
    });

    describe('#getById', () => {
        let expectedHero: Hero;
        const heroUrlId1 = defaultHeroUrl + '1';

        it('should return expected hero when id is found', () => {
            expectedHero = { id: 1, name: 'A' };

            service.getById(1).subscribe((hero) => expect(hero).toEqual(expectedHero), fail);

            // One request to GET hero from expected URL
            const req = httpTestingController.expectOne(heroUrlId1);

            expect(req.request.body).toBeNull();

            // Respond with the expected hero
            req.flush(expectedHero);
        });

        it('should use method and url from ResourceMetaOptions', () => {
            (<EntityOperationComplexPath>heroResourceMetaOptions.path).getById = ['POST', 'get-hero-by-id'];

            service.getById(1).subscribe();

            // HeroService should have made one request to GET heroes from expected URL
            const req = httpTestingController.expectOne('api/get-hero-by-id/1');
            expect(req.request.method).toEqual('POST');

            // Respond with the mock heroes
            req.flush(null);
        });

        it('should turn 404 when id not found', () => {
            service.getById(1).subscribe(
                (heroes) => fail('getById succeeded when expected it to fail with a 404'),
                (err) => {
                    expect(err instanceof DataServiceError).toBe(true);
                }
            );

            const req = httpTestingController.expectOne(heroUrlId1);
            const errorEvent = { message: 'boom!' } as ErrorEvent;
            req.error(errorEvent, { status: 404, statusText: 'Not Found' });
        });

        it('should throw when no id given', () => {
            service.getById(undefined as any).subscribe(
                (heroes) => fail('getById succeeded when expected it to fail'),
                (err) => {
                    expect(err.error).toMatch(/No "Hero" key/);
                }
            );
        });
    });

    describe('#getWithQuery', () => {
        let expectedHeroes: Hero[];

        beforeEach(() => {
            expectedHeroes = [
                { id: 1, name: 'BA' },
                { id: 2, name: 'BB' }
            ] as Hero[];
        });

        it('should return expected selected heroes w/ object params', () => {
            service.getWithQuery({ name: 'B' }).subscribe((heroes) => expect(heroes).toEqual(expectedHeroes), fail);

            // HeroService should have made one request to GET heroes
            // from expected URL with query params
            const req = httpTestingController.expectOne(defaultHeroesUrl + '?name=B');
            expect(req.request.method).toEqual('GET');

            expect(req.request.body).toBeNull();

            // Respond with the mock heroes
            req.flush(expectedHeroes);
        });

        it('should return expected selected heroes w/ string params', () => {
            service.getWithQuery('name=B').subscribe((heroes) => expect(heroes).toEqual(expectedHeroes), fail);

            // HeroService should have made one request to GET heroes
            // from expected URL with query params
            const req = httpTestingController.expectOne(defaultHeroesUrl + '?name=B');
            expect(req.request.method).toEqual('GET');

            // Respond with the mock heroes
            req.flush(expectedHeroes);
        });

        it('should use method and url from ResourceMetaOptions', () => {
            (<EntityOperationComplexPath>heroResourceMetaOptions.path).getAll = ['POST', 'get-hero-with-params'];

            service.getWithQuery('name=B').subscribe((heroes) => expect(heroes).toEqual(expectedHeroes), fail);

            // HeroService should have made one request to GET heroes from expected URL
            const req = httpTestingController.expectOne('api/get-hero-with-params/?name=B');
            expect(req.request.method).toEqual('POST');

            // Respond with the mock heroes
            req.flush(expectedHeroes);
        });

        it('should be OK returning no heroes', () => {
            service.getWithQuery({ name: 'B' }).subscribe((heroes) => expect(heroes.length).toEqual(0), fail);

            const req = httpTestingController.expectOne(defaultHeroesUrl + '?name=B');
            req.flush([]); // Respond with no heroes
        });

        it('should turn 404 into Observable<DataServiceError>', () => {
            const msg = 'deliberate 404 error';

            service.getWithQuery({ name: 'B' }).subscribe(
                (heroes) => fail('getWithQuery succeeded when expected it to fail with a 404'),
                (err) => {
                    expect(err).toBeDefined();
                    expect(err instanceof DataServiceError).toBe(true);
                    expect(err.error.status).toEqual(404);
                    expect(err.message).toEqual(msg);
                }
            );

            const req = httpTestingController.expectOne(defaultHeroesUrl + '?name=B');

            const errorEvent = { message: msg } as ErrorEvent;

            req.error(errorEvent, { status: 404, statusText: 'Not Found' });
        });
    });

    describe('#add', () => {
        let expectedHero: Hero;

        it('should return expected hero with id', () => {
            expectedHero = { id: 42, name: 'A' };
            const heroData: Hero = { id: undefined, name: 'A' } as any;

            service.add(heroData).subscribe((hero) => expect(hero).toEqual(expectedHero), fail);

            // One request to POST hero from expected URL
            const req = httpTestingController.expectOne((r) => r.method === 'POST' && r.url === defaultHeroUrl);

            expect(req.request.body).toEqual(heroData);

            // Respond with the expected hero
            req.flush(expectedHero);
        });

        it('should use method and url from ResourceMetaOptions', () => {
            (<EntityOperationComplexPath>heroResourceMetaOptions.path).add = ['PUT', 'add-hero'];

            expectedHero = { id: 27, name: 'A' };
            const heroData: Hero = { id: undefined, name: 'A' } as any;

            service.add(heroData).subscribe((hero) => expect(hero).toEqual(expectedHero), fail);

            // HeroService should have made one request to GET heroes from expected URL
            const req = httpTestingController.expectOne('api/add-hero/');
            expect(req.request.method).toEqual('PUT');

            // Respond with the expected hero
            req.flush(expectedHero);
        });

        it('should throw when no entity given', () => {
            service.add(undefined as any).subscribe(
                (heroes) => fail('add succeeded when expected it to fail'),
                (err) => {
                    expect(err.error).toMatch(/No "Hero" entity/);
                }
            );
        });
    });

    describe('#delete', () => {
        const heroUrlId1 = defaultHeroUrl + '1';

        it('should delete by hero id', () => {
            service.delete(1).subscribe((result) => expect(result).toEqual(1), fail);

            // One request to DELETE hero from expected URL
            const req = httpTestingController.expectOne((r) => r.method === 'DELETE' && r.url === heroUrlId1);

            expect(req.request.body).toBeNull();

            // Respond with empty nonsense object
            req.flush({});
        });

        it('should use method and url from ResourceMetaOptions', () => {
            (<EntityOperationComplexPath>heroResourceMetaOptions.path).delete = ['POST', 'delete-hero'];

            service.delete(1).subscribe((result) => expect(result).toEqual(1), fail);

            // One request to DELETE hero from configured URL and method
            const req = httpTestingController.expectOne((r) => r.method === 'POST' && r.url === 'api/delete-hero/1');

            expect(req.request.body).toBeNull();

            // Respond with empty nonsense object
            req.flush({});
        });

        it('should return successfully when id not found and delete404OK is true (default)', () => {
            service.delete(1).subscribe((result) => expect(result).toEqual(1), fail);

            // One request to DELETE hero from expected URL
            const req = httpTestingController.expectOne((r) => r.method === 'DELETE' && r.url === heroUrlId1);

            // Respond with empty nonsense object
            req.flush({});
        });

        it('should return 404 when id not found and delete404OK is false', () => {
            service = new EntityRestServerService('Hero', httpClient, httpUrlGenerator, entityMetaOptionsService, {
                delete404OK: false
            });
            service.delete(1).subscribe(
                (heroes) => fail('delete succeeded when expected it to fail with a 404'),
                (err) => {
                    expect(err instanceof DataServiceError).toBe(true);
                }
            );

            const req = httpTestingController.expectOne(heroUrlId1);
            const errorEvent = { message: 'boom!' } as ErrorEvent;
            req.error(errorEvent, { status: 404, statusText: 'Not Found' });
        });

        it('should throw when no id given', () => {
            service.delete(undefined as any).subscribe(
                (heroes) => fail('delete succeeded when expected it to fail'),
                (err) => {
                    expect(err.error).toMatch(/No "Hero" key/);
                }
            );
        });
    });

    describe('#update', () => {
        const heroUrlId1 = defaultHeroUrl + '1';

        it('should return expected hero with id', () => {
            // Call service.update with an Update<T> arg
            const updateArg: Update<Hero> = {
                id: 1,
                changes: { id: 1, name: 'B' }
            };

            // The server makes the update AND updates the version concurrency property.
            const expectedHero: Hero = { id: 1, name: 'B', version: 2 };

            service.update(updateArg).subscribe((updated) => expect(updated).toEqual(expectedHero), fail);

            // One request to PUT hero from expected URL
            const req = httpTestingController.expectOne((r) => r.method === 'PUT' && r.url === heroUrlId1);

            expect(req.request.body).toEqual(updateArg.changes);

            // Respond with the expected hero
            req.flush(expectedHero);
        });

        it('should use method and url from ResourceMetaOptions', () => {
            (<EntityOperationComplexPath>heroResourceMetaOptions.path).update = ['POST', 'update-hero'];

            // Call service.update with an Update<T> arg
            const updateArg: Update<Hero> = {
                id: 1,
                changes: { id: 1, name: 'B' }
            };

            // The server makes the update AND updates the version concurrency property.
            const expectedHero: Hero = { id: 1, name: 'B', version: 2 };

            service.update(updateArg).subscribe((updated) => expect(updated).toEqual(expectedHero), fail);

            // One request to DELETE hero from configured URL and method
            const req = httpTestingController.expectOne((r) => r.method === 'POST' && r.url === 'api/update-hero/1');

            expect(req.request.body).toEqual(updateArg.changes);

            // Respond with the expected hero
            req.flush(expectedHero);
        });

        it('should return 404 when id not found', () => {
            service.update({ id: 1, changes: { id: 1, name: 'B' } }).subscribe(
                (update) => fail('update succeeded when expected it to fail with a 404'),
                (err) => {
                    expect(err instanceof DataServiceError).toBe(true);
                }
            );

            const req = httpTestingController.expectOne(heroUrlId1);
            const errorEvent = { message: 'boom!' } as ErrorEvent;
            req.error(errorEvent, { status: 404, statusText: 'Not Found' });
        });

        it('should throw when no update given', () => {
            service.update(undefined as any).subscribe(
                (heroes) => fail('update succeeded when expected it to fail'),
                (err) => {
                    expect(err.error).toMatch(/No "Hero" update data/);
                }
            );
        });
    });

    describe('#upsert', () => {
        let expectedHero: Hero;

        it('should return expected hero with id', () => {
            expectedHero = { id: 42, name: 'A' };
            const heroData: Hero = { id: undefined, name: 'A' } as any;

            service.upsert(heroData).subscribe((hero) => expect(hero).toEqual(expectedHero), fail);

            // One request to POST hero from expected URL
            const req = httpTestingController.expectOne((r) => r.method === 'POST' && r.url === defaultHeroUrl);

            expect(req.request.body).toEqual(heroData);

            // Respond with the expected hero
            req.flush(expectedHero);
        });

        it('should use method and url from ResourceMetaOptions', () => {
            (<EntityOperationComplexPath>heroResourceMetaOptions.path).upsert = ['PUT', 'upsert-hero'];

            expectedHero = { id: 27, name: 'A' };
            const heroData: Hero = { id: undefined, name: 'A' } as any;

            service.upsert(heroData).subscribe((hero) => expect(hero).toEqual(expectedHero), fail);

            // One request to POST hero from expected URL
            const req = httpTestingController.expectOne((r) => r.method === 'PUT' && r.url === 'api/upsert-hero/');

            expect(req.request.body).toEqual(heroData);

            // Respond with the expected hero
            req.flush(expectedHero);
        });

        it('should throw when no entity given', () => {
            service.upsert(undefined as any).subscribe(
                (heroes) => fail('add succeeded when expected it to fail'),
                (err) => {
                    expect(err.error).toMatch(/No "Hero" entity/);
                }
            );
        });
    });
});
