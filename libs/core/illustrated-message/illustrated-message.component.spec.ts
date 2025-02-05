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

    type: IllustratedMessageType = 'scene';
    svgConfig: SvgConfig = {
        scene: { url: 'scene-url', id: 'scene-id' },
        dialog: { url: 'dialog-url', id: 'dialog-id' },
        spot: { url: 'spot-url', id: 'spot-id' },
        dot: { url: 'dot-url', id: 'dot-id' }
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

    it('Should add dialog type', () => {
        testComponent.type = 'dialog';
        fixture.detectChanges();
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--dialog')).toBe(
            true
        );
    });

    it('Should add spot type', () => {
        testComponent.type = 'spot';
        fixture.detectChanges();
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--spot')).toBe(
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
            scene: { url: 'new-scene-url', id: 'new-scene-id' },
            dialog: { url: 'new-dialog-url', id: 'new-dialog-id' },
            spot: { url: 'new-spot-url', id: 'new-spot-id' },
            dot: { url: 'new-dot-url', id: 'new-dot-id' }
        };
        fixture.detectChanges();
        const useElement = fixture.debugElement.query(By.css('use'));
        expect(useElement.nativeElement.getAttribute('href')).toBe('new-scene-url#new-scene-id');
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
