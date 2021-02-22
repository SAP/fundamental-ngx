import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
    ]
})
export class SliderFormFieldExampleComponent {
    customForm = new FormGroup({
        value1: new FormControl(15),
        value2: new FormControl([15, 85])
    });

    get value1(): number {
        return this.customForm.controls['value1'].value;
    }

    get value2(): [number, number] {
        return this.customForm.controls['value2'].value;
    }
}
