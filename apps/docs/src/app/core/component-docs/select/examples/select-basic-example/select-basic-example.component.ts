import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-select-basic-example',
    templateUrl: './select-basic-example.component.html',
    styles: ['.fd-select-example {margin-top: 16px;}']
})
export class SelectBasicExampleComponent implements OnInit {

    selectOneValue: string;

    selectTwoValue: string;

    selectThreeValue: string;

    constructor() {
    }

    ngOnInit() {
    }

}
