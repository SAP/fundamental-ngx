import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeDocsComponent implements OnInit {

    value: any = 'helloooooo';

    constructor() {}

    ngOnInit() {}

    onLoad(event) {}
    onError(event) {}

    changeValue() {
        if (this.value === 'helloooooo') {
            this.value = 'joohhhnnnnnn';
        } else {
            this.value = 'helloooooo';
        }
    }
}
