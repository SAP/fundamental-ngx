import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGeneratorComponent } from './form-generator.component';
import { PlatformInputModule } from '../../input/fdp-input.module';
import { FdpFormGroupModule } from '../../form-group/fdp-form.module';
import { PlatformButtonModule } from '../../../button/button.module';
import { PlatformCheckboxGroupModule } from '../../checkbox-group/checkbox-group.module';
import { PlatformSelectModule } from '../../select';
import { PlatformRadioGroupModule } from '../../radio-group/radio-group.module';
import { PlatformTextAreaModule } from '../../text-area/text-area.module';
import { PlatformDatePickerModule } from '../../date-picker/date-picker.module';
import { PlatformSwitchModule } from '../../switch/switch.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FormGeneratorComponent', () => {
  let component: FormGeneratorComponent;
  let fixture: ComponentFixture<FormGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            FdpFormGroupModule,
            PlatformInputModule,
            FormsModule,
            ReactiveFormsModule,
            PlatformButtonModule,
            PlatformCheckboxGroupModule,
            PlatformSelectModule,
            PlatformRadioGroupModule,
            PlatformTextAreaModule,
            PlatformInputModule,
            PlatformDatePickerModule,
            PlatformSwitchModule],
      declarations: [ FormGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
