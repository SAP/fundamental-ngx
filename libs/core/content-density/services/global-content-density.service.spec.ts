import { signal, Signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { ContentDensityMode } from '../types/content-density.mode';
import { GlobalContentDensityService } from './global-content-density.service';

class MockContentDensityStorage implements ContentDensityStorage {
    readonly contentDensity: Signal<ContentDensityMode>;

    private _contentDensity: WritableSignal<ContentDensityMode> = signal(ContentDensityMode.COZY);

    constructor() {
        this.contentDensity = this._contentDensity.asReadonly();
    }

    setContentDensity(density: ContentDensityMode): void {
        this._contentDensity.set(density);
    }

    // Helper for tests
    setDensityDirectly(density: ContentDensityMode): void {
        this._contentDensity.set(density);
    }
}

describe('GlobalContentDensityService', () => {
    let service: GlobalContentDensityService;
    let mockStorage: MockContentDensityStorage;

    beforeEach(() => {
        mockStorage = new MockContentDensityStorage();

        TestBed.configureTestingModule({
            providers: [GlobalContentDensityService, { provide: ContentDensityStorage, useValue: mockStorage }]
        });

        service = TestBed.inject(GlobalContentDensityService);
    });

    describe('initialization', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should initialize with default content density from storage', () => {
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COZY);
        });

        it('should initialize with compact density when storage provides compact', () => {
            // Create new instance with compact default
            const compactStorage = new MockContentDensityStorage();
            compactStorage.setDensityDirectly(ContentDensityMode.COMPACT);

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [GlobalContentDensityService, { provide: ContentDensityStorage, useValue: compactStorage }]
            });

            const compactService = TestBed.inject(GlobalContentDensityService);
            expect(compactService.currentDensitySignal()).toBe(ContentDensityMode.COMPACT);
        });
    });

    describe('currentDensitySignal', () => {
        it('should return a signal with the current density', () => {
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COZY);
        });

        it('should be callable as a signal', () => {
            const density = service.currentDensitySignal;
            expect(typeof density).toBe('function');
            expect(density()).toBe(ContentDensityMode.COZY);
        });

        it('should update when storage changes', () => {
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COZY);
            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COMPACT);
        });
    });

    describe('currentContentDensity (deprecated getter)', () => {
        it('should return the current density from signal', () => {
            expect(service.currentContentDensity).toBe(ContentDensityMode.COZY);
        });

        it('should return the same value as currentDensitySignal', () => {
            expect(service.currentContentDensity).toBe(service.currentDensitySignal());
        });
    });

    describe('contentDensityListener (deprecated)', () => {
        it('should return an observable', () => {
            const listener = service.contentDensityListener();
            expect(listener).toBeTruthy();
            expect(typeof listener.subscribe).toBe('function');
        });
    });

    describe('updateContentDensity', () => {
        it('should update content density', () => {
            service.updateContentDensity(ContentDensityMode.COMPACT);
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COMPACT);
        });

        it('should update to condensed density', () => {
            service.updateContentDensity(ContentDensityMode.CONDENSED);
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.CONDENSED);
        });

        it('should update to cozy density', () => {
            // First set to compact
            service.updateContentDensity(ContentDensityMode.COMPACT);
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COMPACT);

            // Then set back to cozy
            service.updateContentDensity(ContentDensityMode.COZY);
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COZY);
        });
    });

    describe('reactive updates', () => {
        it('should update signal when storage changes', () => {
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COZY);
            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COMPACT);
        });

        it('should reflect multiple changes', () => {
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COZY);

            service.updateContentDensity(ContentDensityMode.COMPACT);
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COMPACT);

            service.updateContentDensity(ContentDensityMode.CONDENSED);
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.CONDENSED);

            service.updateContentDensity(ContentDensityMode.COZY);
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COZY);
        });
    });
});
