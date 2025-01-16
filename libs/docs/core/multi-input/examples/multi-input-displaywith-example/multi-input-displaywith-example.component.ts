import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';

@Component({
    selector: 'fd-multi-input-displaywith-example',
    templateUrl: './multi-input-displaywith-example.component.html',
    imports: [MultiInputComponent, FormsModule, JsonPipe]
})
export class MultiInputDisplaywithExampleComponent {
    values = [
        { name: 'Apple', value: 'apple_value' },
        { name: 'Banana', value: 'banana_value' },
        { name: 'Pineapple', value: 'pineapple_value' },
        { name: 'Tomato', value: 'tomato_value' },
        { name: 'Kiwi', value: 'kiwi_value' },
        { name: 'Strawberry', value: 'strawberry_value' },
        { name: 'Blueberry', value: 'blueberry_value' },
        { name: 'Orange', value: 'orange_value' }
    ];

    selected = [];

    displayFunc(obj: any): string {
        return obj.name.toLocaleUpperCase();
    }

    valueFunc(obj: any): string {
        return obj.value;
    }
}
