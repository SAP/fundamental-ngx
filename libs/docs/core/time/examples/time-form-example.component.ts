import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { NgIf } from '@angular/common';
import { TimeModule } from '@fundamental-ngx/core/time';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-time-form-example',
    styleUrls: ['time-form-example.component.scss'],
    templateUrl: './time-form-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, FormLabelModule, TimeModule, NgIf]
})
export class TimeFormExampleComponent {
    customForm = new FormGroup({
        time: new FormControl<FdDate | null>(null)
    });
}
