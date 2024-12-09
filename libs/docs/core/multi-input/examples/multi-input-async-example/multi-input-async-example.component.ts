import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';
import { Observable, Subject, of } from 'rxjs';
import { delay, startWith, switchMap } from 'rxjs/operators';

@Component({
    selector: 'fd-multi-input-async-example',
    templateUrl: './multi-input-async-example.component.html',
    imports: [MultiInputComponent, FormsModule, AsyncPipe, JsonPipe]
})
export class MultiInputAsyncExampleComponent {
    readonly searchValue$ = new Subject<string>();
    readonly dropdownValues$: Observable<OptionItem[]>;
    selected = [];

    displayFn = (v: OptionItem): string => v.label;
    valueFn = (v: OptionItem): string => v.value;

    constructor() {
        this.dropdownValues$ = this.searchValue$.pipe(
            startWith(''),
            switchMap((searchQuery) => this.serverRequest(searchQuery))
        );
    }

    /**
     * Server request emulation
     */
    private serverRequest(searchQuery: string): Observable<OptionItem[]> {
        const preparedQuery = searchQuery.trim().toLowerCase();
        const result = MOCK_DATA.filter((item) => item.value.toLowerCase().startsWith(preparedQuery)).slice(0, 5);

        return of(result).pipe(delay(Math.random() * 1000 + 500));
    }
}

interface OptionItem {
    label: string;
    value: string;
}

const MOCK_DATA: OptionItem[] = [
    { label: 'Apple', value: 'apple_value' },
    { label: 'Watermelon', value: 'watermelon_value' },
    { label: 'Orange', value: 'orange_value' },
    { label: 'Pear', value: 'pear_value' },
    { label: 'Cherry', value: 'cherry_value' },
    { label: 'Strawberry', value: 'strawberry_value' },
    { label: 'Nectarine', value: 'nectarine_value' },
    { label: 'Grape', value: 'grape_value' },
    { label: 'Mango', value: 'mango_value' },
    { label: 'Blueberry', value: 'blueberry_value' },
    { label: 'Pomegranate', value: 'pomegranate_value' },
    { label: 'Carambola', value: 'carambola_value' },
    { label: 'Plum', value: 'plum_value' },
    { label: 'Banana', value: 'banana_value' },
    { label: 'Raspberry', value: 'raspberry_value' },
    { label: 'Mandarin', value: 'mandarin_value' },
    { label: 'Jackfruit', value: 'jackfruit_value' },
    { label: 'Papaya', value: 'papaya_value' },
    { label: 'Kiwi', value: 'kiwi_value' },
    { label: 'Pineapple', value: 'pineapple_value' },
    { label: 'Lime', value: 'lime_value' },
    { label: 'Lemon', value: 'lemon_value' },
    { label: 'Apricot', value: 'apricot_value' },
    { label: 'Grapefruit', value: 'grapefruit_value' },
    { label: 'Melon', value: 'melon_value' },
    { label: 'Coconut', value: 'coconut_value' },
    { label: 'Avocado', value: 'avocado_value' },
    { label: 'Peach', value: 'peach_value' }
];
