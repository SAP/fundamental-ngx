import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlatformWizardGeneratorModule } from '../../wizard-generator.module';
import { WizardGeneratorService } from '../../wizard-generator.service';
import { WizardSummaryStepComponent } from './wizard-summary-step.component';

describe('WizardSummaryStepComponent', () => {
    let component: WizardSummaryStepComponent;
    let fixture: ComponentFixture<WizardSummaryStepComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformWizardGeneratorModule],
            providers: [WizardGeneratorService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardSummaryStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
