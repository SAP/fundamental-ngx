import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IllustratedMessageComponent, IllustratedMessageType } from './illustrated-message.component';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    template: `
        <figure fd-illustrated-message [type]="type">
            <figcaption fd-illustrated-message-figcaption>
                <h3 fd-illustrated-message-title>Unable to load data</h3>
                <p fd-illustrated-message-text>
                    Check your internet connection. If that's not it, try refreshing the page. If that still doesn't
                    help, check with your administrator.
                </p>
            </figcaption>
        </figure>
    `
})
class TestIllustratedMessageComponent {
    @ViewChild(IllustratedMessageComponent, { static: true, read: ElementRef })
    illustratedMessageElementRef: ElementRef;

    type: IllustratedMessageType = 'scene';
}

describe('IllustratedMessageComponent', () => {
    let illustratedMessageElementRef: ElementRef;
    let testComponent: TestIllustratedMessageComponent;
    let fixture: ComponentFixture<TestIllustratedMessageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [IllustratedMessageComponent, TestIllustratedMessageComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestIllustratedMessageComponent);
        illustratedMessageElementRef = fixture.componentInstance.illustratedMessageElementRef;
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(testComponent).toBeTruthy();
        expect(illustratedMessageElementRef).toBeTruthy();
    });

    it('Should have scene type by default', () => {
        expect(illustratedMessageElementRef.nativeElement.classList.contains('fd-illustrated-message--scene')).toBe(
            true
        );
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
});
