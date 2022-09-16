import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-search-example',
    templateUrl: './search-example.component.html'
})
export class SearchExampleComponent implements OnInit {
    myForm: FormGroup;
    formValue: any;
    searchOne = '';
    searchTwo = 'Search value';

    constructor(private _fb: FormBuilder) {}

    ngOnInit(): void {
        this.myForm = this._fb.group({
            search: ''
        });
    }

    onSubmit(): void {
        this.formValue = this.myForm.value;
    }
}
