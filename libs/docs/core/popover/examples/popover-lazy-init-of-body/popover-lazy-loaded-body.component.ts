import { Component } from '@angular/core';

let componentConstructorCounter = 0;

@Component({
    selector: 'fd-popover-lazy-loaded-body',
    template: `
        <div style="width: 300px; height: 400px; border: 1px solid red">
            Component constructor counter: {{ componentConstructorCounter }}
        </div>
    `
})
export class PopoverLazyLoadedBodyComponent {
    componentConstructorCounter = ++componentConstructorCounter;
    constructor() {
        console.log('constructed');
    }

    ngAfterViewInit() {
        console.log('after view init');
    }
}
