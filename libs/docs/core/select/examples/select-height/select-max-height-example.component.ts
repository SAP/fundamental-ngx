import { Component } from '@angular/core';
import { SelectModule } from '@fundamental-ngx/core/select';

@Component({
    selector: 'fd-select-max-height-example',
    templateUrl: './select-max-height-example.component.html',
    imports: [SelectModule]
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
