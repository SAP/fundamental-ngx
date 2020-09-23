import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardCounterDirective } from './card-counter.directive';
import { CLASS_NAME } from './constants';

@Component({
    template: `<span fd-card-counter>1 of 10</span>`
})
class TestComponent {}

describe('CardCounterComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
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
        expect(debugElement.classes[CLASS_NAME.cardCounter]).toBeTrue();
    });
});
