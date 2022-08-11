import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { CSS_CLASS_NAME } from './constants';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';

/**
 * Fundamental input group addon body component
 */
@Component({
    selector: 'fdp-input-group-addon-body',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        contentDensityObserverProviders({
            modifiers: {
                [ContentDensityMode.COMPACT]: CSS_CLASS_NAME.addonCompact
            }
        })
    ]
})
export class InputGroupAddonBodyComponent implements OnInit {
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
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        private contentDensityObserver: ContentDensityObserver
    ) {
        contentDensityObserver.subscribe();
    }

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CSS_CLASS_NAME.addon);
    }

    /** @hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    /** @hidden */
    private _removeClassNameFromHostElement(className: string): void {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
}
