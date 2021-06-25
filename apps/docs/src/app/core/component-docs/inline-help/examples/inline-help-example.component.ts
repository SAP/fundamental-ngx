import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
    selector: 'fd-inline-help-example',
    templateUrl: './inline-help-example.component.html',
    styles: [
        `
            .fd-inline-help-example>input {
                max-width: 300px;
            }

            .fd-inline-help-example {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `
    ]
})
export class InlineHelpExampleComponent {

    constructor(private _render: Renderer2, private _elementRef: ElementRef) {}
    _showHint(): void {
        console.log(' this._elementRef.nativeElement.querySelector(fd-icon)...',
  this._elementRef.nativeElement.querySelector('fd-icon'));
        this._elementRef.nativeElement.querySelector('fd-icon').onmouseover();
    }
}
