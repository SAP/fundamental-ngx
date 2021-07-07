import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformFormGeneratorModule } from '../../../form/form-generator/fdp-form-generator.module';
import { WizardGeneratorService } from '../../wizard-generator.service';

import { WizardSummaryStepComponent } from './wizard-summary-step.component';

describe('WizardSummaryStepComponent', () => {
  let component: WizardSummaryStepComponent;
  let fixture: ComponentFixture<WizardSummaryStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [PlatformFormGeneratorModule],
        providers: [WizardGeneratorService],
        declarations: [ WizardSummaryStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardSummaryStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
