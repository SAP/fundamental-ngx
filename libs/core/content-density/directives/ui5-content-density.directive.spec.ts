import { Component, ElementRef, Signal, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { GlobalContentDensityService } from '../services/global-content-density.service';
import { ContentDensityMode } from '../types/content-density.mode';
import { Ui5ContentDensityDirective } from './ui5-content-density.directive';

class MockContentDensityStorage implements ContentDensityStorage {
    readonly contentDensity: Signal<ContentDensityMode>;

    private _contentDensity: WritableSignal<ContentDensityMode> = signal(ContentDensityMode.COZY);

    constructor() {
        this.contentDensity = this._contentDensity.asReadonly();
    }

    setContentDensity(density: ContentDensityMode): void {
        this._contentDensity.set(density);
    }
}

@Component({
    selector: 'fd-test-host',
    template: '<div fdUi5ContentDensity></div>',
    imports: [Ui5ContentDensityDirective]
})
class TestHostComponent {
    constructor(readonly elementRef: ElementRef) {}
}

describe('Ui5ContentDensityDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: TestHostComponent;
    let mockStorage: MockContentDensityStorage;

    beforeEach(() => {
        mockStorage = new MockContentDensityStorage();

        TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [GlobalContentDensityService, { provide: ContentDensityStorage, useValue: mockStorage }]
        });

        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not have data-ui5-compact-size attribute when cozy', fakeAsync(() => {
        tick();
        const directiveElement = fixture.nativeElement.querySelector('[fdUi5ContentDensity]');
        expect(directiveElement.hasAttribute('data-ui5-compact-size')).toBe(false);
    }));

    it('should apply data-ui5-compact-size attribute when compact', fakeAsync(() => {
        mockStorage.setContentDensity(ContentDensityMode.COMPACT);
        tick();
        fixture.detectChanges();

        const directiveElement = fixture.nativeElement.querySelector('[fdUi5ContentDensity]');
        expect(directiveElement.hasAttribute('data-ui5-compact-size')).toBe(true);
    }));

    it('should apply data-ui5-compact-size attribute when condensed', fakeAsync(() => {
        mockStorage.setContentDensity(ContentDensityMode.CONDENSED);
        tick();
        fixture.detectChanges();

        const directiveElement = fixture.nativeElement.querySelector('[fdUi5ContentDensity]');
        expect(directiveElement.hasAttribute('data-ui5-compact-size')).toBe(true);
    }));

    it('should remove data-ui5-compact-size attribute when switching back to cozy', fakeAsync(() => {
        // Set to compact
        mockStorage.setContentDensity(ContentDensityMode.COMPACT);
        tick();
        fixture.detectChanges();

        const directiveElement = fixture.nativeElement.querySelector('[fdUi5ContentDensity]');
        expect(directiveElement.hasAttribute('data-ui5-compact-size')).toBe(true);

        // Set back to cozy
        mockStorage.setContentDensity(ContentDensityMode.COZY);
        tick();
        fixture.detectChanges();

        expect(directiveElement.hasAttribute('data-ui5-compact-size')).toBe(false);
    }));

    it('should work as a container for nested UI5 components', fakeAsync(() => {
        @Component({
            selector: 'fd-test-nested',
            template: `
                <div fdUi5ContentDensity>
                    <span class="ui5-component">UI5 Component</span>
                </div>
            `,
            imports: [Ui5ContentDensityDirective]
        })
        class TestNestedComponent {}

        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            imports: [TestNestedComponent],
            providers: [GlobalContentDensityService, { provide: ContentDensityStorage, useValue: mockStorage }]
        });

        const nestedFixture = TestBed.createComponent(TestNestedComponent);
        nestedFixture.detectChanges();
        tick();

        mockStorage.setContentDensity(ContentDensityMode.COMPACT);
        tick();
        nestedFixture.detectChanges();

        const container = nestedFixture.nativeElement.querySelector('[fdUi5ContentDensity]');
        expect(container.hasAttribute('data-ui5-compact-size')).toBe(true);

        // Verify the nested element is inside the container with the attribute
        const nestedElement = container.querySelector('.ui5-component');
        expect(nestedElement).toBeTruthy();
    }));
});
