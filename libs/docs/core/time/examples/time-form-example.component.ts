import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { TimeModule } from '@fundamental-ngx/core/time';

@Component({
    selector: 'fd-time-form-example',
    styleUrls: ['time-form-example.component.scss'],
    templateUrl: './time-form-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [FormsModule, ReactiveFormsModule, FormLabelComponent, TimeModule]
})
export class TimeFormExampleComponent {
    customForm = new FormGroup({
        time: new FormControl<FdDate | null>(null)
    });
}
