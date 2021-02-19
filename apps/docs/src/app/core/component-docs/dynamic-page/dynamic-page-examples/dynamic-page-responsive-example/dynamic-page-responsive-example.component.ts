import { Component } from '@angular/core';

@Component({
    selector: 'fd-dynamic-page-responsive-example',
    templateUrl: './dynamic-page-responsive-example.component.html',
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
                overflow-x: hidden;
            }
            .fd-dynamic-page-section-example {
                min-height: 20vh
            }
        `
    ]
})
export class DynamicPageResponsiveExampleComponent {
    visible = false;

    pageTitle = 'Balenciaga Tripple S Trainers';

    compact = true;

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
