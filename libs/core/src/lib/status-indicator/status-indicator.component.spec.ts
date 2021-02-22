import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { LablePosition, StatusIndicatorComponent } from './status-indicator.component';

@Component({
    selector: 'fd-test-status-indicator',
    template: `
        <fd-status-indicator
            id="status_icon_24"
            [status]="status"
            [fillPercentage]="fillPercentage"
            [path]="euroImage"
            viewBox="0 0 24 31"
        >
        </fd-status-indicator>
    `
})
class TestStatusIndicatorComponent {
    @ViewChild(StatusIndicatorComponent, { static: true, read: ElementRef })
    StatusInidcatorElementRef: ElementRef;

    status: 'negative' | 'critical' | 'positive';
    fillPercentage: number;
    size: string;
    hasLabel: boolean;
    labelPosition: LablePosition;
    statusLabel: string;
    euroImage = [
        'M13,0.5c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S19.6,0.5,13,0.5z M16.4,10.1L15.9,12h-5.3v0.3H16l-0.5,1.9h-4.6c0.5,1.3,1.6,2,3.1,2c0.8,0,1.5-0.2,2.2-0.7l0.7-0.6v2.7l-0.1,0.1c-0.9,0.4-1.8,0.6-2.6,0.6c-1.6,0-2.9-0.3-3.8-1c-0.9-0.7-1.5-1.7-2-3H6.4l0.5-1.9h1V12H6.4l0.5-1.9h1.3C8.6,8.9,9.3,8,10.3,7.3c1-0.8,2.3-1.1,3.8-1.1c1.1,0,2,0.2,2.8,0.7L17.3,7l-0.6,2.3l-0.5-0.4c-0.4-0.2-0.9-0.4-1.4-0.5c-0.6-0.1-1.1-0.1-1.7,0c-0.6,0.1-1,0.3-1.5,0.7c-0.3,0.3-0.6,0.6-0.7,1H16.4z'
    ];
}

describe('StatusIndicatorComponent', () => {
    let statusIndicatorElementRef: ElementRef;
    let testComponent: TestStatusIndicatorComponent;
    let fixture: ComponentFixture<TestStatusIndicatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatusIndicatorComponent, TestStatusIndicatorComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestStatusIndicatorComponent);
        statusIndicatorElementRef = fixture.componentInstance.StatusInidcatorElementRef;
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(testComponent).toBeTruthy();
        expect(statusIndicatorElementRef).toBeTruthy();
    });

    it('Should add status', () => {
        testComponent.status = 'positive';
        fixture.detectChanges();
        expect(statusIndicatorElementRef.nativeElement.querySelectorAll('fd-status-indicator--positive')).toBeTruthy();
    });

    it('Should add fill Percentage', () => {
        testComponent.status = 'positive';
        testComponent.fillPercentage = 50;
        fixture.detectChanges();
        const indicator = statusIndicatorElementRef.nativeElement.querySelectorAll('stop')[0];
        expect(indicator.getAttribute('offset')).toEqual('0.5');
    });
    it('Should add size ', () => {
        testComponent.status = 'positive';
        testComponent.fillPercentage = 50;
        testComponent.size = 'xl';
        fixture.detectChanges();
        expect(statusIndicatorElementRef.nativeElement.querySelectorAll('fd-status-indicator--xl')).toBeTruthy();
    });
    it('Should add label ', () => {
        testComponent.status = 'positive';
        testComponent.fillPercentage = 50;
        testComponent.size = 'xl';
        testComponent.hasLabel = true;
        testComponent.labelPosition = 'right';
        testComponent.statusLabel = '35%';
        fixture.detectChanges();
        expect(statusIndicatorElementRef.nativeElement.querySelectorAll('fd-status-indicator--htext')).toBeTruthy();
    });
    it('Should add label ', () => {
        testComponent.status = 'positive';
        testComponent.fillPercentage = 50;
        testComponent.size = 'xl';
        testComponent.hasLabel = true;
        testComponent.labelPosition = 'bottom';
        testComponent.statusLabel = '35%';
        fixture.detectChanges();
        expect(
            statusIndicatorElementRef.nativeElement.querySelectorAll('fd-status-indicator--positive__text')
        ).toBeTruthy();
    });
});
