import { Component } from '@angular/core';

@Component({
    selector: 'fd-dynamic-page-basic-example',
    templateUrl: './dynamic-page-example.component.html',
    styles: [
            `
            .overlay {
                height: 100%;
                width: 100%;
                position: fixed;
                z-index: 10;
                top: 0;
                left: 0;
                background-color: rgb(255, 255, 255);
            }
            .fd-dynamic-page-section-example {
                min-height: 20vh
            }
        `
    ]
})
export class DynamicPageExampleComponent {
    visible = false;

    onCollapseChange(): void {
        console.log('collapse changed');
    }

    openPage(): void {
        this.visible = true;
    }

    closePage(): void {
        this.visible = false;
    }
}
