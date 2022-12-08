import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'fd-combobox-async-example',
    templateUrl: './combobox-async-example.component.html'
})
export class ComboboxAsyncExampleComponent implements OnInit {
    searchTerm = '';

    dropdownValues: Observable<string[]>;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.dropdownValues = this.http.get<any[]>('./assets/search-input-values.json');
    }
}
