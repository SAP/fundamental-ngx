import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideContentDensity } from './provide-content-density';
import { contentDensityObserverProviders } from './providers/content-density-observer-providers';
import { ContentDensityObserver } from './services/content-density-observer.service';
import { GlobalContentDensityService } from './services/global-content-density.service';
import { ContentDensityMode } from './types/content-density.mode';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

/** A consumer that has its own observer but NO own GlobalContentDensityService provider.
 *  It must share the root service instance (the "correct" pattern). */
@Component({
    selector: 'fd-island-follower',
    template: '',
    providers: [contentDensityObserverProviders()]
})
class FollowerComponent {
    constructor(
        readonly observer: ContentDensityObserver,
        readonly service: GlobalContentDensityService
    ) {}
}

/** A consumer that calls provideContentDensity() on itself → creates its own island.
 *  This is the anti-pattern that caused s7. */
@Component({
    selector: 'fd-island-self',
    template: '',
    providers: [contentDensityObserverProviders(), ...provideContentDensity({ storage: 'memory' })]
})
class IslandComponent {
    constructor(
        readonly observer: ContentDensityObserver,
        readonly service: GlobalContentDensityService
    ) {}
}

/** Host that renders both a follower and an island as siblings under the root providers. */
@Component({
    selector: 'fd-island-host',
    template: `
        <fd-island-follower></fd-island-follower>
        <fd-island-self></fd-island-self>
    `,
    imports: [FollowerComponent, IslandComponent]
})
class IslandHostComponent {}

describe('ContentDensity — DI-island guard (issue #14355, facet s7)', () => {
    let fixture: ComponentFixture<IslandHostComponent>;
    let rootService: GlobalContentDensityService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [IslandHostComponent],
            providers: [provideContentDensity({ storage: 'memory' })]
        });
        fixture = TestBed.createComponent(IslandHostComponent);
        rootService = TestBed.inject(GlobalContentDensityService);
        fixture.detectChanges();
    });

    it('follower injects the SAME GlobalContentDensityService instance as the root', () => {
        const followerDE = fixture.debugElement.children[0]; // fd-island-follower
        const followerService = followerDE.injector.get(GlobalContentDensityService);

        // Not just equal — the identical object reference.
        // s7 bug: the island's own provider creates a NEW instance (this assertion fails).
        expect(followerService).toBe(rootService);
    });

    it('follower observer follows root updateContentDensity', fakeAsync(() => {
        rootService.updateContentDensity(ContentDensityMode.COMPACT);
        tick();
        fixture.detectChanges();

        const followerDE = fixture.debugElement.children[0];
        const followerObserver = followerDE.injector.get(ContentDensityObserver);

        expect(followerObserver.contentDensity()).toBe(ContentDensityMode.COMPACT);
    }));

    // -----------------------------------------------------------------------
    // Negative/documentation case: component WITH own provideContentDensity is detached
    // -----------------------------------------------------------------------

    it('island component gets a DIFFERENT GlobalContentDensityService instance (anti-pattern)', () => {
        const islandDE = fixture.debugElement.children[1]; // fd-island-self
        const islandService = islandDE.injector.get(GlobalContentDensityService);

        // The island has its own provider → a new instance, NOT the root.
        expect(islandService).not.toBe(rootService);
    });

    it('island observer does NOT follow root updateContentDensity (detached)', fakeAsync(() => {
        // Island starts at default cozy (its own private service)
        const islandDE = fixture.debugElement.children[1];
        const islandObserver = islandDE.injector.get(ContentDensityObserver);

        expect(islandObserver.contentDensity()).toBe(ContentDensityMode.COZY);

        // Root switches to compact
        rootService.updateContentDensity(ContentDensityMode.COMPACT);
        tick();
        fixture.detectChanges();

        // Island is unaffected — it listens to its own private service
        expect(islandObserver.contentDensity()).toBe(ContentDensityMode.COZY);
    }));
});
