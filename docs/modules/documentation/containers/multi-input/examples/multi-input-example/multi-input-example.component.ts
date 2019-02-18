import { Component } from '@angular/core';

@Component({
    selector: 'app-multi-input-example',
    templateUrl: './multi-input-example.component.html',
    styleUrls: ['./multi-input-example.component.scss']
})
export class MultiInputExampleComponent {

    values = ['Apple', 'Banana', 'Pineapple', 'Tomato'];

    selected = [];

}
