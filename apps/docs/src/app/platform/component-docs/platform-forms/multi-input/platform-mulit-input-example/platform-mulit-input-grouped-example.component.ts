import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-multi-input-grouped-example',
    templateUrl: './platform-mulit-input-grouped-example.component.html'
})
export class PlatformMulitInputGroupedExampleComponent {
    list_elements = [
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        { name: 'Pineapple', type: 'Fruits' },
        { name: 'Strawberry', type: 'Fruits' },
        { name: 'Broccoli', type: 'Vegetables' },
        { name: 'Carrot', type: 'Vegetables' },
        { name: 'Jalapeño', type: 'Vegetables' },
        { name: 'Spinach', type: 'Vegetables' }
    ];
}
