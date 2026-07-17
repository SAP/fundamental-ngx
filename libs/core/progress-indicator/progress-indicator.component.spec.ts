import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Component, ElementRef, ViewChild, input } from '@angular/core';
import { ProgressIndicatorComponent } from './progress-indicator.component';

@Component({
    template: `
        <fd-progress-indicator
            #indicatorRef
            [valueText]="valueText()"
            [valueMin]="valueMin()"
            [valueMax]="valueMax()"
            [valueNow]="valueNow()"
        >
        </fd-progress-indicator>
    `,
    standalone: true,
    imports: [ProgressIndicatorComponent]
})
class TestProgressIndicatorComponent {
    @ViewChild('indicatorRef', { read: ElementRef })
    progressIndicatorElementRef: ElementRef;

    @ViewChild(ProgressIndicatorComponent)
    progressIndicatorComponent: ProgressIndicatorComponent;

    readonly valueText = input(undefined);
    readonly valueMin = input(undefined);
    readonly valueMax = input(undefined);
    readonly valueNow = input(undefined);
}

describe('ProgressIndicatorComponent', () => {
    let progressIndicatorElementRef: ElementRef;
    let progressIndicatorComponent: ProgressIndicatorComponent;
    let testComponent: TestProgressIndicatorComponent;
    let fixture: ComponentFixture<TestProgressIndicatorComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestProgressIndicatorComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestProgressIndicatorComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        progressIndicatorElementRef = fixture.componentInstance.progressIndicatorElementRef;
        progressIndicatorComponent = fixture.componentInstance.progressIndicatorComponent;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(testComponent).toBeTruthy();
        expect(progressIndicatorElementRef).toBeTruthy();
        expect(progressIndicatorComponent).toBeTruthy();
    });

    it('should calculate the progress bar width', () => {
        fixture.componentRef.setInput('valueMin', 0);
        fixture.componentRef.setInput('valueMax', 100);
        fixture.componentRef.setInput('valueNow', 42);
        fixture.detectChanges();
        const progressBar = progressIndicatorElementRef.nativeElement.querySelector(
            '.fd-progress-indicator__progress-bar'
        );
        expect(progressBar.style.width).toBe('42%');
    });
});
