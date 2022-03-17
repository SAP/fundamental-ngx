import { Component } from '@angular/core';

@Component({
    selector: 'fd-popover-dynamic-container-height-example',
    templateUrl: './popover-dynamic-container-height-example.component.html',
    styles: [
        `
            .fd-docs-flex-display-helper {
                display: flex;
                align-items: center;
                justify-content: space-around;
                flex-flow: row wrap;
                width: 100%;
            }
        `
    ]
})
export class PopoverDynamicContainerHeightExampleComponent {
    showOverflowContainer = false;

    overflowContainerTimeout: any;

    list1 = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];

    resetOverflowContainer(): void {
        clearTimeout(this.overflowContainerTimeout);
        this.showOverflowContainer = false;
        this.overflowContainerTimeout = setTimeout(() => {
            this.showOverflowContainer = true;
        }, 2000);
    }
}
