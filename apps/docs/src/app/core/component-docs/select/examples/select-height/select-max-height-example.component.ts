import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-max-height-example',
    templateUrl: './select-max-height-example.component.html'
})
export class SelectMaxHeightExampleComponent {
    selectedValue: string;

    options: string[] = [
        'Apple',
        'Apricot',
        'Avocado',
        'Banana',
        'Blueberry',
        'Bing Cherry',
        'Mango',
        'Mandarin',
        'Melon'
    ];
}
