import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'fd-combobox-async-example',
    templateUrl: './combobox-async-example.component.html',
    imports: [ComboboxComponent, FormsModule, AsyncPipe]
})
export class ComboboxAsyncExampleComponent implements OnInit {
    searchTerm = '';
    data = [
        'Apple',
        'Pineapple',
        'Tomato',
        'Grapes',
        'Pumpkin',
        'Banana',
        'Kiwi',
        'Raspberries',
        'Watermelons',
        'Nectarines',
        'Oranges'
    ];

    dropdownValues: Observable<string[]>;

    ngOnInit(): void {
        this.dropdownValues = of(this.data);
    }
}
