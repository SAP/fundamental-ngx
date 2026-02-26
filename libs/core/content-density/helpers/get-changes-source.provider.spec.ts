import { signal, WritableSignal } from '@angular/core';
import { ContentDensityDefaultKeyword, ContentDensityGlobalKeyword } from '../content-density.types';
import { GlobalContentDensityService } from '../services/global-content-density.service';
import { ContentDensityMode } from '../types/content-density.mode';
import { getChangesSource } from './get-changes-source.provider';

describe('getChangesSource', () => {
    const createMockService = (density: ContentDensityMode): Partial<GlobalContentDensityService> => ({
        currentDensitySignal: signal(density)
    });

    describe('priority resolution', () => {
        it('should return defaultContentDensity when no sources provided', () => {
            const result = getChangesSource({
                defaultContentDensity: ContentDensityMode.COZY
            });

            expect(result()).toBe(ContentDensityMode.COZY);
        });

        it('should use service value when only service is provided', () => {
            const mockService = createMockService(ContentDensityMode.COMPACT);

            const result = getChangesSource({
                defaultContentDensity: ContentDensityMode.COZY,
                contentDensityService: mockService as GlobalContentDensityService
            });

            expect(result()).toBe(ContentDensityMode.COMPACT);
        });

        it('should use directive value over service (priority 2 > 3)', () => {
            const directive = signal(ContentDensityMode.CONDENSED);
            const mockService = createMockService(ContentDensityMode.COMPACT);

            const result = getChangesSource({
                defaultContentDensity: ContentDensityMode.COZY,
                contentDensityDirective: directive,
                contentDensityService: mockService as GlobalContentDensityService
            });

            expect(result()).toBe(ContentDensityMode.CONDENSED);
        });

        it('should use parent observer over directive and service (priority 1 > 2 > 3)', () => {
            const parentObserver = signal(ContentDensityMode.COMPACT);
            const directive = signal(ContentDensityMode.CONDENSED);
            const mockService = createMockService(ContentDensityMode.COZY);

            const result = getChangesSource({
                defaultContentDensity: ContentDensityMode.COZY,
                parentContentDensityObserver: parentObserver,
                contentDensityDirective: directive,
                contentDensityService: mockService as GlobalContentDensityService
            });

            expect(result()).toBe(ContentDensityMode.COMPACT);
        });
    });

    describe('special keyword resolution', () => {
        it('should resolve "default" keyword to defaultContentDensity', () => {
            const directive = signal(ContentDensityDefaultKeyword);

            const result = getChangesSource({
                defaultContentDensity: ContentDensityMode.COMPACT,
                contentDensityDirective: directive
            });

            expect(result()).toBe(ContentDensityMode.COMPACT);
        });

        it('should resolve "global" keyword to service value', () => {
            const directive = signal(ContentDensityGlobalKeyword);
            const mockService = createMockService(ContentDensityMode.CONDENSED);

            const result = getChangesSource({
                defaultContentDensity: ContentDensityMode.COZY,
                contentDensityDirective: directive,
                contentDensityService: mockService as GlobalContentDensityService
            });

            expect(result()).toBe(ContentDensityMode.CONDENSED);
        });

        it('should resolve "global" keyword to default when no service provided', () => {
            const directive = signal(ContentDensityGlobalKeyword);

            const result = getChangesSource({
                defaultContentDensity: ContentDensityMode.COMPACT,
                contentDensityDirective: directive
            });

            expect(result()).toBe(ContentDensityMode.COMPACT);
        });
    });

    describe('signal reactivity', () => {
        it('should update when directive signal changes', () => {
            const directive: WritableSignal<ContentDensityMode> = signal(ContentDensityMode.COZY);

            const result = getChangesSource({
                defaultContentDensity: ContentDensityMode.COZY,
                contentDensityDirective: directive
            });

            expect(result()).toBe(ContentDensityMode.COZY);

            directive.set(ContentDensityMode.COMPACT);
            expect(result()).toBe(ContentDensityMode.COMPACT);

            directive.set(ContentDensityMode.CONDENSED);
            expect(result()).toBe(ContentDensityMode.CONDENSED);
        });

        it('should update when parent observer signal changes', () => {
            const parentObserver: WritableSignal<ContentDensityMode> = signal(ContentDensityMode.COZY);

            const result = getChangesSource({
                defaultContentDensity: ContentDensityMode.COZY,
                parentContentDensityObserver: parentObserver
            });

            expect(result()).toBe(ContentDensityMode.COZY);

            parentObserver.set(ContentDensityMode.COMPACT);
            expect(result()).toBe(ContentDensityMode.COMPACT);
        });
    });
});
