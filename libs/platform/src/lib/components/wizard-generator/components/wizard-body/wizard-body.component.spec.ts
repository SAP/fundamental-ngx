import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformFormGeneratorModule } from '../../../form/form-generator/fdp-form-generator.module';
import { WizardGeneratorService } from '../../wizard-generator.service';

import { WizardBodyComponent } from './wizard-body.component';

describe('WizardBodyComponent', () => {
  let component: WizardBodyComponent;
  let fixture: ComponentFixture<WizardBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [PlatformFormGeneratorModule],
        providers: [WizardGeneratorService],
        declarations: [ WizardBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
