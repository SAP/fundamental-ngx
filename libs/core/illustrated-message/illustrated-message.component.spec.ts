import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IllustratedMessageComponent, IllustratedMessageType, SvgConfig } from './illustrated-message.component';

// Mock component for testing
@Component({
    template: `
        <figure
            fd-illustrated-message
            [type]="type"
            [svgConfig]="svgConfig"
            [svgAriaLabel]="svgAriaLabel"
            [noSvg]="noSvg"
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
    imports: [IllustratedMessageComponent]
})
class TestIllustratedMessageComponent {
    @ViewChild(IllustratedMessageComponent, { static: true, read: ElementRef })
    illustratedMessageElementRef: ElementRef;

    type: IllustratedMessageType = 'large';
    svgConfig: SvgConfig = {
        large: { url: 'large-url', id: 'large-id' },
        medium: { url: 'medium-url', id: 'medium-id' },
        small: { url: 'small-url', id: 'small-id' },
        xsmall: { url: 'xsmall-url', id: 'xsmall-id' }
    };
    svgAriaLabel = 'Illustrated Message';
    noSvg = false;
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

    it('Should have assigned class', () => {
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message')).toBe(true);
    });

    it('Should add medium type', () => {
        testComponent.type = 'medium';
        fixture.detectChanges();
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--medium')).toBe(
            true
        );
    });

    it('Should add small type', () => {
        testComponent.type = 'small';
        fixture.detectChanges();
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--small')).toBe(
            true
        );
    });

    it('Should add base type', () => {
        testComponent.type = 'base';
        fixture.detectChanges();
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--base')).toBe(
            true
        );
    });

    it('Should update href when svgConfig changes', () => {
        testComponent.svgConfig = {
            large: { url: 'new-large-url', id: 'new-large-id' },
            medium: { url: 'new-medium-url', id: 'new-medium-id' },
            small: { url: 'new-small-url', id: 'new-small-id' },
            xsmall: { url: 'new-xsmall-url', id: 'new-xsmall-id' }
        };
        fixture.detectChanges();
        const useElement = fixture.debugElement.query(By.css('use'));
        expect(useElement.nativeElement.getAttribute('href')).toBe('new-large-url#new-large-id');
    });

    it('Should add aria-label to svg', () => {
        const svgElement = fixture.debugElement.query(By.css('svg'));
        expect(svgElement.nativeElement.getAttribute('aria-label')).toBe('Illustrated Message');
    });

    it('Should handle noSvg input and remove illustration', () => {
        testComponent.noSvg = true;
        fixture.detectChanges();
        const svgElement = fixture.debugElement.query(By.css('svg'));
        expect(svgElement).toBeNull();
    });
});
