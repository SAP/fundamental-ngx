import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IllustratedMessageFigcaptionComponent } from './components/illustrated-message-figcaption/illustrated-message-figcaption.component';
import { IllustratedMessageTextDirective } from './directives/illustrated-message-text/illustrated-message-text.directive';
import { IllustratedMessageTitleDirective } from './directives/illustrated-message-title/illustrated-message-title.directive';
import {
    IllustratedMessageComponent,
    IllustratedMessageType,
    IllustratedMessageTypes,
    SvgConfig
} from './illustrated-message.component';

@Component({
    template: `<figure fd-illustrated-message [svgConfig]="svgConfig"></figure>`,
    standalone: true,
    imports: [IllustratedMessageComponent]
})
class HiddenContainerTestComponent {
    readonly svgConfig: SvgConfig = {
        large: { url: 'large-url', id: 'large-id' },
        medium: { url: 'medium-url', id: 'medium-id' },
        small: { url: 'small-url', id: 'small-id' },
        xsmall: { url: 'xsmall-url', id: 'xsmall-id' }
    };
}

/**
 * Mock component for testing illustrated message with signals
 */
@Component({
    template: `
        <figure
            fd-illustrated-message
            [type]="type()"
            [svgConfig]="svgConfig()"
            [svgAriaLabel]="svgAriaLabel()"
            [noSvg]="noSvg()"
        >
            <figcaption fd-illustrated-message-figcaption>
                <h3 fd-illustrated-message-title>Unable to load data</h3>
                <p fd-illustrated-message-text>
                    Check your internet connection. If that's not it, try refreshing the page. If that still doesn't
                    help, check with your administrator.
                </p>
            </figcaption>
        </figure>
    `,
    standalone: true,
    imports: [
        IllustratedMessageComponent,
        IllustratedMessageFigcaptionComponent,
        IllustratedMessageTitleDirective,
        IllustratedMessageTextDirective
    ]
})
class TestIllustratedMessageComponent {
    @ViewChild(IllustratedMessageComponent, { static: true, read: ElementRef })
    illustratedMessageElementRef: ElementRef;

    readonly type = signal<IllustratedMessageType>('large');
    readonly svgConfig = signal<SvgConfig>({
        large: { url: 'large-url', id: 'large-id' },
        medium: { url: 'medium-url', id: 'medium-id' },
        small: { url: 'small-url', id: 'small-id' },
        xsmall: { url: 'xsmall-url', id: 'xsmall-id' }
    });
    readonly svgAriaLabel = signal('Illustrated Message');
    readonly noSvg = signal(false);
}

describe('IllustratedMessageComponent', () => {
    let illustratedMessageElementRef: ElementRef;
    let testComponent: TestIllustratedMessageComponent;
    let fixture: ComponentFixture<TestIllustratedMessageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestIllustratedMessageComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestIllustratedMessageComponent);
        illustratedMessageElementRef = fixture.componentInstance.illustratedMessageElementRef;
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should have assigned class', () => {
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message')).toBe(true);
    });

    it('should add large type class', () => {
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--large')).toBe(
            true
        );
    });

    it('should add medium type class', () => {
        testComponent.type.set('medium');
        fixture.detectChanges();
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--medium')).toBe(
            true
        );
    });

    it('should add small type class', () => {
        testComponent.type.set('small');
        fixture.detectChanges();
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--small')).toBe(
            true
        );
    });

    it('should add base type class modifier', () => {
        testComponent.type.set('base');
        fixture.detectChanges();
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--base')).toBe(
            true
        );
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message')).toBe(true);
    });

    it('should update href when svgConfig changes', () => {
        testComponent.svgConfig.set({
            large: { url: 'new-large-url', id: 'new-large-id' },
            medium: { url: 'new-medium-url', id: 'new-medium-id' },
            small: { url: 'new-small-url', id: 'new-small-id' },
            xsmall: { url: 'new-xsmall-url', id: 'new-xsmall-id' }
        });
        fixture.detectChanges();
        const useElement = fixture.debugElement.query(By.css('use'));
        expect(useElement.nativeElement.getAttribute('href')).toBe('new-large-url#new-large-id');
    });

    it('should add aria-label to svg', () => {
        const svgElement = fixture.debugElement.query(By.css('svg'));
        expect(svgElement.nativeElement.getAttribute('aria-label')).toBe('Illustrated Message');
    });

    it('should handle noSvg input and remove illustration', () => {
        testComponent.noSvg.set(true);
        fixture.detectChanges();
        const svgElement = fixture.debugElement.query(By.css('svg'));
        expect(svgElement).toBeNull();
    });

    it('should update aria-label when changed', () => {
        testComponent.svgAriaLabel.set('New Label');
        fixture.detectChanges();
        const svgElement = fixture.debugElement.query(By.css('svg'));
        expect(svgElement.nativeElement.getAttribute('aria-label')).toBe('New Label');
    });

    it('should normalize legacy type names', () => {
        testComponent.type.set('scene');
        fixture.detectChanges();
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--large')).toBe(
            true
        );

        testComponent.type.set('dialog');
        fixture.detectChanges();
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--medium')).toBe(
            true
        );

        testComponent.type.set('spot');
        fixture.detectChanges();
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--small')).toBe(
            true
        );

        testComponent.type.set('dot');
        fixture.detectChanges();
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--xsmall')).toBe(
            true
        );
    });

    it('should support legacy svgConfig keys', () => {
        testComponent.svgConfig.set({
            scene: { url: 'scene-url', id: 'scene-id' },
            dialog: { url: 'dialog-url', id: 'dialog-id' },
            spot: { url: 'spot-url', id: 'spot-id' },
            dot: { url: 'dot-url', id: 'dot-id' }
        });
        fixture.detectChanges();
        const useElement = fixture.debugElement.query(By.css('use'));
        expect(useElement.nativeElement.getAttribute('href')).toBe('scene-url#scene-id');
    });

    it('should handle inline SVG content', fakeAsync(() => {
        const inlineSvg = '<svg><circle cx="50" cy="50" r="40"/></svg>';

        // Set explicit type to avoid relying on width measurement
        testComponent.type.set('large');

        testComponent.svgConfig.set({
            large: { file: inlineSvg } as any
        });

        fixture.detectChanges();

        // Advance time to allow setTimeout in effect to complete
        tick();

        // Trigger another change detection after async operations
        fixture.detectChanges();

        // Query from the component's root element
        const container = fixture.nativeElement.querySelector('.fd-illustrated-message__container');
        expect(container).toBeTruthy();

        const inlineSvgDiv = container.querySelector('div[style*="display"]');
        expect(inlineSvgDiv).toBeTruthy();
        expect(inlineSvgDiv.innerHTML).toContain('circle');
    }));
});

describe('IllustratedMessageComponent - hidden container (tab switch scenario)', () => {
    let resizeCallback: ResizeObserverCallback;
    let fixture: ComponentFixture<HiddenContainerTestComponent>;
    let illustratedEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        (window as any).ResizeObserver = jest.fn((cb: ResizeObserverCallback) => {
            resizeCallback = cb;
            return { observe: jest.fn(), disconnect: jest.fn() };
        });

        TestBed.configureTestingModule({
            imports: [HiddenContainerTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HiddenContainerTestComponent);
        illustratedEl = fixture.debugElement.query(By.directive(IllustratedMessageComponent)).nativeElement;
        Object.defineProperty(illustratedEl, 'offsetWidth', { get: () => 0, configurable: true });
    });

    afterEach(() => {
        delete (window as any).ResizeObserver;
    });

    it('should render with base type when initially hidden (offsetWidth = 0)', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(illustratedEl.classList.contains('fd-illustrated-message--base')).toBe(true);
    }));

    it('should update to the correct type when the element becomes visible', fakeAsync(() => {
        fixture.detectChanges();
        tick(); // flush afterNextRender — ResizeObserver.observe() is now called, resizeCallback is captured
        fixture.detectChanges();

        expect(illustratedEl.classList.contains('fd-illustrated-message--base')).toBe(true);

        // Simulate tab becoming active: element now has a real width (>= 682px → large)
        Object.defineProperty(illustratedEl, 'offsetWidth', { get: () => 700, configurable: true });
        resizeCallback([], {} as ResizeObserver);
        fixture.detectChanges();

        expect(illustratedEl.classList.contains('fd-illustrated-message--large')).toBe(true);
        expect(illustratedEl.classList.contains('fd-illustrated-message--base')).toBe(false);
    }));

    it('should select the correct breakpoint type based on element width when becoming visible', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const cases: Array<[number, IllustratedMessageType]> = [
            [700, IllustratedMessageTypes.LARGE], // >= 682
            [500, IllustratedMessageTypes.MEDIUM], // 361–681
            [300, IllustratedMessageTypes.SMALL], // 261–360
            [200, IllustratedMessageTypes.EXTRA_SMALL] // 161–260
        ];

        for (const [width, expectedType] of cases) {
            Object.defineProperty(illustratedEl, 'offsetWidth', { get: () => width, configurable: true });
            resizeCallback([], {} as ResizeObserver);
            fixture.detectChanges();

            expect(illustratedEl.classList.contains(`fd-illustrated-message--${expectedType}`)).toBe(true);
        }
    }));
});
