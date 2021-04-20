import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DATA_PROVIDERS } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-multi-input-reactive-example',
    templateUrl: './platform-multi-input-reactive-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }]
})
export class PlatformMultiInputReactiveExampleComponent {
    _datasource = [
        { country: 'Alabama', city: 'Montgomery' },
        { country: 'Alaska', city: 'Juneau' },
        { country: 'Arizona', city: 'Phoenix' },
        { country: 'Arkansas', city: 'Little Rock' },
        { country: 'California', city: 'Sacramento' },
        { country: 'Colorado', city: 'Denver' },
        { country: 'Connecticut', city: 'Hartford' },
        { country: 'Kentucky', city: 'Frankfort' },
        { country: 'Delaware', city: 'Dover' },
        { country: 'Florida', city: 'Tallahassee' },
        { country: 'Georgia', city: 'Atlanta' },
        { country: 'Hawaii', city: 'Honolulu' },
        { country: 'Idaho', city: 'Boise' },
        { country: 'Illinois', city: 'Springfield' },
        { country: 'Indiana', city: 'Indianapolis' },
        { country: 'Iowa', city: 'Des Moines' },
        { country: 'Kansas', city: 'Topeka' },
        { country: 'Kentucky', city: 'Frankfort' },
        { country: 'Louisiana', city: 'Baton Rouge' },
        { country: 'Maine', city: 'Augusta' },
        { country: 'Maryland', city: 'Annapolis' },
        { country: 'Massachusetts', city: 'Boston' },
        { country: 'Michigan', city: 'Lansing' },
        { country: 'Minnesota', city: 'St. Paul' },
        { country: 'Mississippi', city: 'Jackson' },
        { country: 'Missouri', city: 'Jefferson City' },
        { country: 'Montana', city: 'Helena' },
        { country: 'Nebraska', city: 'Lincoln' },
        { country: 'Nevada', city: 'Carson City' },
        { country: 'New Hampshire', city: 'Concord' },
        { country: 'New Jersey', city: 'Trenton' },
        { country: 'New Mexico', city: 'Santa Fe' },
        { country: 'New York', city: 'Albany' },
        { country: 'North Carolina', city: 'Raleigh' },
        { country: 'North Dakota', city: 'Bismarck' },
        { country: 'Ohio', city: 'Columbus' },
        { country: 'Oklahoma', city: 'Oklahoma City' },
        { country: 'Oregon', city: 'Salem' },
        { country: 'Pennsylvania', city: 'Harrisburg' },
        { country: 'Rhode Island', city: 'Providence' },
        { country: 'South Carolina', city: 'Columbia' },
        { country: 'South Dakota', city: 'Pierre' },
        { country: 'Tennessee', city: 'Nashville' },
        { country: 'Texas', city: 'Austin' },
        { country: 'Utah', city: 'Salt Lake City' },
        { country: 'Vermont', city: 'Montpelier' },
        { country: 'Virginia', city: 'Richmond' },
        { country: 'Washington', city: 'Olympia' },
        { country: 'West Virginia', city: 'Charleston' },
        { country: 'Wisconsin', city: 'Madison' },
        { country: 'Wyoming', city: 'Cheyenne' }
    ];

    customForm = new FormGroup({
        item: new FormControl([])
    });
    submitted = false;

    get itemField(): AbstractControl {
        return this.customForm.controls['item'];
    }

    hasError(): boolean {
        return this.hasValue() && this.itemField.touched;
    }

    hasValue(): boolean {
        return this.itemField.value.length > 0;
    }

    onSubmit(): void {
        if (!this.hasError()) {
            return;
        }
        alert('form file Uploaded successfully');
    }
}
