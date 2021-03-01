import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardSubtitleDirective } from './card-subtitle.directive';
import { CLASS_NAME } from './constants';

@Component({
    template: `<span fd-card-subtitle>Subtitle</span>`
})
class TestComponent {}

describe('CardSubtitleComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, CardSubtitleDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);

        fixture.detectChanges();

        debugElement = fixture.debugElement.query(By.directive(CardSubtitleDirective));
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add className to host', () => {
        expect(debugElement.classes[CLASS_NAME.cardSubtitle]).toBeTrue();
    });
});
