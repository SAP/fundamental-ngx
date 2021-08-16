import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardCounterDirective } from '@fundamental-ngx/core/card';
import { ObjectStatus } from '@fundamental-ngx/core/object-status';

import { CLASS_NAME } from './constants';

@Component({
    template: `<span fd-card-counter [status]="status">1 of 10</span>`
})
class TestComponent {
    status: ObjectStatus = null;
}

describe('CardCounterComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, CardCounterDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);

        fixture.detectChanges();

        debugElement = fixture.debugElement.query(By.directive(CardCounterDirective));
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add className to host', () => {
        expect(debugElement.nativeElement.className.includes(CLASS_NAME.cardCounter)).toBeTrue();
    });

    describe('object status', () => {
        it('should add className to host', () => {
            expect(debugElement.nativeElement.className.includes('fd-object-status')).toBeTrue();
        });

        it('should add corresponding status modifier', () => {
            fixture.componentInstance.status = 'positive';
            fixture.detectChanges();
            expect(debugElement.nativeElement.className.includes('fd-object-status--positive')).toBeTrue();

            fixture.componentInstance.status = 'negative';
            fixture.detectChanges();
            expect(debugElement.nativeElement.className.includes('fd-object-status--negative')).toBeTrue();

            fixture.componentInstance.status = 'informative';
            fixture.detectChanges();
            expect(debugElement.nativeElement.className.includes('fd-object-status--informative')).toBeTrue();
        });
    });
});
