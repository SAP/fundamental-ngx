import { Component, ChangeDetectionStrategy, OnInit, ElementRef, Renderer2, Input } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/core/utils';
import { CSS_CLASS_NAME } from './constants';

/**
 * Fundamental input group addon body component
 *
 */
@Component({
    selector: 'fdp-input-group-addon-body',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupAddonBodyComponent implements OnInit {
    /**
     * content Density of element: 'cozy' | 'compact'
     */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        if (contentDensity === this._contentDensity) {
            return;
        }

        this._contentDensity = contentDensity;

        if (contentDensity === 'compact') {
            this._addClassNameToHostElement(CSS_CLASS_NAME.addonCompact);
        } else {
            this._removeClassNameFromHostElement(CSS_CLASS_NAME.addonCompact);
        }
    }

    /**
     * indicates if addon contains a button
     */
    @Input()
    set hasButton(hasButton: boolean) {
        if (hasButton) {
            this._addClassNameToHostElement(CSS_CLASS_NAME.addonButton);
        } else {
            this._removeClassNameFromHostElement(CSS_CLASS_NAME.addonButton);
        }
    }

    /** @hidden */
    private _contentDensity: ContentDensity;

    /**@hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    /**@hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CSS_CLASS_NAME.addon);
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _removeClassNameFromHostElement(className: string): void {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
}
