import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-object-page-example',
    templateUrl: './object-page-example.component.html',
    styles: [
        `
            /* All classes below are for the fullscreen functionality */
            .example-overlay {
                height: 100%;
                width: 0;
                position: fixed;
                z-index: 1001;
                top: 0;
                left: 0;
                background-color: rgb(255, 255, 255);
                overflow-x: hidden;
            }
            .example-overlay-content {
                position: relative;
                width: 100%;
            }
            .example-button {
                display: flex;
                justify-content: flex-end;
                padding: 3px 1rem;
                background: #394a5d;
            }
        `
    ]
})
export class ObjectPageExampleComponent {
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    fullscreen = false;

    onCollapseChange(): void {
        console.log('collapse changed');
    }

    openPage(): void {
        this.fullscreen = true;
        this.overlay.nativeElement.style.width = '100%';
    }

    closePage(): void {
        this.fullscreen = false;
        this.overlay.nativeElement.style.width = '0%';
    }
}
