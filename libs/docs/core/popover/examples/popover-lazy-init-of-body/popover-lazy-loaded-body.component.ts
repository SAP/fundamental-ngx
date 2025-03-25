import { AfterViewInit, Component } from '@angular/core';

let componentConstructorCounter = 0;

@Component({
    selector: 'fd-popover-lazy-loaded-body',
    template: `
        <div [style.width.px]="300" [style.height.px]="400" [style.border]="'1px solid red'">
            Component constructor counter: {{ componentConstructorCounter }}
        </div>
    `,
    standalone: true
})
export class PopoverLazyLoadedBodyComponent implements AfterViewInit {
    componentConstructorCounter = ++componentConstructorCounter;
    constructor() {
        console.log('constructed');
    }

    ngAfterViewInit() {
        console.log('after view init');
    }
}
