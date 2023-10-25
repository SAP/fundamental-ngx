import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardNextStepComponent } from './wizard-next-step.component';

describe('WizardNextStepComponent', () => {
    let component: WizardNextStepComponent;
    let fixture: ComponentFixture<WizardNextStepComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WizardNextStepComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardNextStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
