import { Component } from '@angular/core';

@Component({
    selector: 'fd-tile-generic-example',
    templateUrl: './tile-generic-example.component.html'
})
export class TileGenericExampleComponent {
    window: any;

    constructor() {
        this.window = window;
    }

}
