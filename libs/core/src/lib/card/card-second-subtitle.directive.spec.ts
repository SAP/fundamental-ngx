import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardSecondSubtitleDirective } from './card-second-subtitle.directive';
import { CLASS_NAME } from './constants';

@Component({
    template: `<span fd-card-second-subtitle>Second subtitle</span>`
})
class TestComponent {}

describe('CardSecondSubtitleComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, CardSecondSubtitleDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);

        fixture.detectChanges();

        debugElement = fixture.debugElement.query(By.directive(CardSecondSubtitleDirective));
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add className to host', () => {
        expect(debugElement.classes[CLASS_NAME.cardSecondSubtitle]).toBeTrue();
    });
});
