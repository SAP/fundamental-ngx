import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { SliderComponent } from '@fundamental-ngx/platform/slider';

@Component({
    selector: 'fdp-slider-form-field-example',
    templateUrl: './slider-form-field-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .slider-example .fd-container.fd-form-layout-grid-container .fd-row .fd-col {
                overflow: visible;
            }
        `
    ],
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, SliderComponent, JsonPipe]
})
export class SliderFormFieldExampleComponent {
    customForm = new FormGroup({
        value1: new FormControl(15),
        value2: new FormControl<[number, number]>([15, 85])
    });

    get value1(): number | null {
        return this.customForm.controls['value1'].value;
    }

    get value2(): [number, number] | null {
        return this.customForm.controls['value2'].value;
    }
}
