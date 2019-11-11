import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-select-types-example',
    templateUrl: './select-types-example.component.html',
    styleUrls: ['./select-types-example.component.scss']
})
export class SelectTypesExampleComponent implements OnInit {

    selectValue: string;

    options: string[] = [
        'Tomato',
        'Pineapple',
        'Apple'
    ];

    constructor() { }

    ngOnInit() {
    }

}
