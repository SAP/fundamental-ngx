import { Pluralizer } from '@ngrx/data';

import { ENTITY_OPERATIONS } from '../../../domain/rest-resource';
import { DefaultHttpUrlGenerator } from './http-url-generator';

describe('HTTP URL Generator', () => {
    class MockPluralizer implements Pluralizer {
        pluralize(name: string): string {
            return name === 'hero' ? 'heroes' : name + 's';
        }
    }

    const pluralizer = new MockPluralizer();
    let urlGenerator: DefaultHttpUrlGenerator;

    beforeEach(() => {
        urlGenerator = new DefaultHttpUrlGenerator(pluralizer);
    });

    it('should be created', () => {
        expect(urlGenerator).toBeTruthy();
    });

    it('should generate entity url based on operation and entity meta options', () => {
        ENTITY_OPERATIONS.forEach((operation) => {
            expect(urlGenerator.entityResource('hero', 'api', operation)).toBe('api/hero/');
            expect(urlGenerator.entityResource('hero', 'api', operation, 'hero-custom-path')).toBe(
                'api/hero-custom-path/'
            );
            expect(urlGenerator.entityResource('hero', 'api', operation, { default: 'default-hero' })).toBe(
                'api/default-hero/'
            );
            expect(
                urlGenerator.entityResource('hero', 'api', operation, {
                    default: 'default-hero',
                    [operation]: `${operation}-hero`
                })
            ).toBe(`api/${operation}-hero/`.toLowerCase());
        });
    });

    it('should generate collection url based on operation and entity meta options', () => {
        ENTITY_OPERATIONS.forEach((operation) => {
            expect(urlGenerator.collectionResource('hero', 'api', operation)).toBe('api/heroes/');
            expect(urlGenerator.collectionResource('hero', 'api', operation, 'hero-custom-path')).toBe(
                'api/hero-custom-path/'
            );
            expect(urlGenerator.collectionResource('hero', 'api', operation, { default: 'default-hero' })).toBe(
                'api/default-hero/'
            );
            expect(
                urlGenerator.collectionResource('hero', 'api', operation, {
                    default: 'default-hero',
                    [operation]: `${operation}-hero`
                })
            ).toBe(`api/${operation}-hero/`.toLowerCase());
        });
    });
});
