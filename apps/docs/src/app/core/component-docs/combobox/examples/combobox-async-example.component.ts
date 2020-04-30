import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'fd-combobox-async-example',
    templateUrl: './combobox-async-example.component.html'
})
export class ComboboxAsyncExampleComponent implements OnInit {
    searchTerm: string = '';

    dropdownValues: Observable<string[]>;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.dropdownValues = this.http.get<any[]>('./assets/search-input-values.json');
    }
}
