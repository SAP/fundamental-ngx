import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fd-search-input-async-example',
    templateUrl: './search-input-async-example.component.html'
})
export class SearchInputAsyncExampleComponent implements OnInit {

    searchTerm: string = '';

    dropdownValues: Observable<string[]>;

    getDropdownValues(): Observable<string[]> {
        return this.http.get<any[]>('./assets/search-input-values.json').pipe(
            map(data => {
                data.forEach(fruitObject => {
                    if (fruitObject.alertMessage) {
                        fruitObject.callback = () => {
                            alert(fruitObject.alertMessage);
                        };
                    }
                });
                return data;
            })
        );
    }

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.dropdownValues = this.getDropdownValues();
    }

    exampleSearchFunction = () => {
        alert('Search Function Called with search term: ' + this.searchTerm);
    }

}
