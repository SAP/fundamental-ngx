import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IllustratedMessageFigcaptionComponent } from './components/illustrated-message-figcaption/illustrated-message-figcaption.component';
import { IllustratedMessageTextDirective } from './directives/illustrated-message-text/illustrated-message-text.directive';
import { IllustratedMessageTitleDirective } from './directives/illustrated-message-title/illustrated-message-title.directive';
import { IllustratedMessageComponent, IllustratedMessageType, SvgConfig } from './illustrated-message.component';

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
