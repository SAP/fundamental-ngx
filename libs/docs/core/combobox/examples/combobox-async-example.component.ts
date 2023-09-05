import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { Observable } from 'rxjs';

@Component({
    selector: 'fd-combobox-async-example',
    templateUrl: './combobox-async-example.component.html',
    standalone: true,
    imports: [ComboboxModule, FormsModule, AsyncPipe]
})
export class ComboboxAsyncExampleComponent implements OnInit {
    searchTerm = '';

    dropdownValues: Observable<string[]>;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.dropdownValues = this.http.get<any[]>('./assets/search-input-values.json');
    }
}
