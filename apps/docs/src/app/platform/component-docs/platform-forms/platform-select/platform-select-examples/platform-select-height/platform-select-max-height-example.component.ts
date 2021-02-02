import { Component } from '@angular/core';

@Component({
    selector: 'fdp-select-max-height-example',
    templateUrl: './platform-select-max-height-example.component.html'
})
export class PlatformSelectMaxHeightExampleComponent {
    selectedValue: string;

    options: string[] = ['Apple', 'Apricot', 'Avocado', 'Banana', 'Blueberry', 'Bing Cherry', 'Mango', 'Mandarin', 'Melon'];
}
