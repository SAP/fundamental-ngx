import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardStepIndicatorComponent } from './wizard-step-indicator.component';

describe('WizardStepIndicatorComponent', () => {
    let component: WizardStepIndicatorComponent;
    let fixture: ComponentFixture<WizardStepIndicatorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WizardStepIndicatorComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardStepIndicatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
