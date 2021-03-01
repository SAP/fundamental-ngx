import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';

import { WizardModule } from '../wizard.module';
import { WizardStepIndicatorComponent } from './wizard-step-indicator.component';

@Component({
    selector: 'fd-test-indicator',
    template: ` <fd-wizard-step-indicator glyph="accept"></fd-wizard-step-indicator> `
})
class TestWrapperComponent {}

describe('WizardStepIndicatorComponent', () => {
    let component: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [WizardModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Add icon class with glyph on input', () => {
        const indicator = fixture.debugElement.nativeElement.querySelector('.fd-wizard__icon');
        expect(indicator.className).toContain('fd-wizard__icon sap-icon--accept');
    });
});
