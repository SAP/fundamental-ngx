import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProgressIndicatorComponent } from './progress-indicator.component';

@Component({
    template: `
        <fd-progress-indicator
            #indicatorRef
            [valueText]="valueText"
            [valueMin]="valueMin"
            [valueMax]="valueMax"
            [valueNow]="valueNow"
        >
        </fd-progress-indicator>
    `
})
class TestProgressIndicatorComponent {
    @ViewChild('indicatorRef', { read: ElementRef })
    progressIndicatorElementRef: ElementRef;

    @ViewChild(ProgressIndicatorComponent)
    progressIndicatorComponent: ProgressIndicatorComponent;

    valueText;
    valueMin;
    valueMax;
    valueNow;
}

describe('ProgressIndicatorComponent', () => {
    let progressIndicatorElementRef: ElementRef;
    let progressIndicatorComponent: ProgressIndicatorComponent;
    let testComponent: TestProgressIndicatorComponent;
    let fixture: ComponentFixture<TestProgressIndicatorComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProgressIndicatorComponent, TestProgressIndicatorComponent]
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
        testComponent.valueMin = 0;
        testComponent.valueMax = 100;
        testComponent.valueNow = 42;
        fixture.detectChanges();
        const progressBar = progressIndicatorElementRef.nativeElement.querySelector(
            '.fd-progress-indicator__progress-bar'
        );
        expect(progressBar.style.width).toBe('42%');
    });
});
