import { Component, HostBinding, Input } from '@angular/core';

let layoutGridBlockIndex = 0;
const BACKGROUND_COLORS = ['#30c5d2', '#32b5c8', '#3694b5', '#3a73a2', '#3f528f', '#43317c', '#471069'];

@Component({
    selector: 'example-layout-grid-block',
    template: '<ng-content></ng-content>',
    styles: [
        `
            :host {
                color: white;
                height: 4rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `
    ]
})
export class ExampleLayoutGridBlockComponent {
    @Input()
    size: number;

    @HostBinding('style.backgroundColor')
    backgroundColor = BACKGROUND_COLORS[layoutGridBlockIndex++ % BACKGROUND_COLORS.length];
}
