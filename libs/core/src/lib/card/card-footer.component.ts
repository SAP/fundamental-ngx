import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Renderer2, forwardRef } from '@angular/core';

import { CLASS_NAME, CARD_CHILD_TOKEN } from './constants';

@Component({
    selector: 'fd-card-footer',
    templateUrl: './card-footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: CARD_CHILD_TOKEN,
            useExisting: forwardRef(() => CardFooterComponent)
        }
    ]
})
export class CardFooterComponent implements OnInit {
    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.cardFooter);
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }
}
