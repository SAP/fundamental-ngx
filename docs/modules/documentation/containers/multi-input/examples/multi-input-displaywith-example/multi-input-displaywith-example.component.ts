import { Component } from '@angular/core';

@Component({
  selector: 'fd-multi-input-displaywith-example',
  templateUrl: './multi-input-displaywith-example.component.html',
  styleUrls: ['./multi-input-displaywith-example.component.scss']
})
export class MultiInputDisplaywithExampleComponent {
    values = [
        {name: 'Apple'},
        {name: 'Banana'},
        {name: 'Pineapple'},
        {name: 'Tomato'}
    ];

    selected = [];

    displayFunc(obj: any): string {
        return obj.name.toLocaleUpperCase();
    }
}
