import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'fd-multi-input-async-example',
    templateUrl: './multi-input-async-example.component.html'
})
export class MultiInputAsyncExampleComponent implements OnInit {

    selected = [];

    dropdownValues;

    getDropdownValues(): Observable<string[]> {
        return this.http.get<string[]>('./assets/multi-input-values.json');
    }

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.dropdownValues = this.getDropdownValues();
    }

}
