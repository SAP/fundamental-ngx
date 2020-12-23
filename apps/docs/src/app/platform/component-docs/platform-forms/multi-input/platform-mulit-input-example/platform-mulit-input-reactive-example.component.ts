import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, RequiredValidator, ValidatorFn, Validators } from '@angular/forms';
import { MultiInputSelectionChangeEvent, Status } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-multi-input-reactive-example',
    templateUrl: './platform-mulit-input-reactive-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformMulitInputReactiveExampleComponent {
    _datasource = [
        { firstName: 'Alabama', lastName: 'Montgomery' },
        { firstName: 'Alaska', lastName: 'Juneau' },
        { firstName: 'Arizona', lastName: 'Phoenix' },
        { firstName: 'Arkansas', lastName: 'Little Rock' },
        { firstName: 'California', lastName: 'Sacramento' },
        { firstName: 'Colorado', lastName: 'Denver' },
        { firstName: 'Connecticut', lastName: 'Hartford' },
        { firstName: 'Kentucky', lastName: 'Frankfort' },
        { firstName: 'Delaware', lastName: 'Dover' },
        { firstName: 'Florida', lastName: 'Tallahassee' },
        { firstName: 'Georgia', lastName: 'Atlanta' },
        { firstName: 'Hawaii', lastName: 'Honolulu' },
        { firstName: 'Idaho', lastName: 'Boise' },
        { firstName: 'Illinois', lastName: 'Springfield' },
        { firstName: 'Indiana', lastName: 'Indianapolis' },
        { firstName: 'Iowa', lastName: 'Des Moines' },
        { firstName: 'Kansas', lastName: 'Topeka' },
        { firstName: 'Kentucky', lastName: 'Frankfort' },
        { firstName: 'Louisiana', lastName: 'Baton Rouge' },
        { firstName: 'Maine', lastName: 'Augusta' },
        { firstName: 'Maryland', lastName: 'Annapolis' },
        { firstName: 'Massachusetts', lastName: 'Boston' },
        { firstName: 'Michigan', lastName: 'Lansing' },
        { firstName: 'Minnesota', lastName: 'St. Paul' },
        { firstName: 'Mississippi', lastName: 'Jackson' },
        { firstName: 'Missouri', lastName: 'Jefferson City' },
        { firstName: 'Montana', lastName: 'Helena' },
        { firstName: 'Nebraska', lastName: 'Lincoln' },
        { firstName: 'Nevada', lastName: 'Carson City' },
        { firstName: 'New Hampshire', lastName: 'Concord' },
        { firstName: 'New Jersey', lastName: 'Trenton' },
        { firstName: 'New Mexico', lastName: 'Santa Fe' },
        { firstName: 'New York', lastName: 'Albany' },
        { firstName: 'North Carolina', lastName: 'Raleigh' },
        { firstName: 'North Dakota', lastName: 'Bismarck' },
        { firstName: 'Ohio', lastName: 'Columbus' },
        { firstName: 'Oklahoma', lastName: 'Oklahoma City' },
        { firstName: 'Oregon', lastName: 'Salem' },
        { firstName: 'Pennsylvania', lastName: 'Harrisburg' },
        { firstName: 'Rhode Island', lastName: 'Providence' },
        { firstName: 'South Carolina', lastName: 'Columbia' },
        { firstName: 'South Dakota', lastName: 'Pierre' },
        { firstName: 'Tennessee', lastName: 'Nashville' },
        { firstName: 'Texas', lastName: 'Austin' },
        { firstName: 'Utah', lastName: 'Salt Lake City' },
        { firstName: 'Vermont', lastName: 'Montpelier' },
        { firstName: 'Virginia', lastName: 'Richmond' },
        { firstName: 'Washington', lastName: 'Olympia' },
        { firstName: 'West Virginia', lastName: 'Charleston' },
        { firstName: 'Wisconsin', lastName: 'Madison' },
        { firstName: 'Wyoming', lastName: 'Cheyenne' }
    ];

    customForm = new FormGroup({});
    submitted = false;
    reactiveForm = new FormControl();

    hasError(): boolean {
        return this.hasValue() && this.reactiveForm.touched;
    }

    hasValue(): boolean {
        return !!this.reactiveForm.value?.length;
    }

    onSubmit(): void {
        if (!this.hasError()) {
            return;
        }
        alert('form file Uploaded successfully');
    }
}
