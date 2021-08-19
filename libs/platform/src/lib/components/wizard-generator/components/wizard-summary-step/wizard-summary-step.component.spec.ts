import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlatformWizardGeneratorModule, WizardGeneratorService, WizardSummaryStepComponent } from '@fundamental-ngx/platform';

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
