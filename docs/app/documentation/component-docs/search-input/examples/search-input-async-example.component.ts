import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'fd-search-input-async-example',
    templateUrl: './search-input-async-example.component.html'
})
export class SearchInputAsyncExampleComponent implements OnInit {

    searchTerm: string = '';

    dropdownValues: Observable<string[]>;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.dropdownValues = this.http.get<any[]>('./assets/search-input-values.json');
    }

}
