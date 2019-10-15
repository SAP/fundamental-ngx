import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fd-select-basic-example',
    templateUrl: './select-basic-example.component.html',
    styleUrls: ['select-basic-example.component.scss']
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
