import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    AfterContentInit,
    ElementRef,
    Renderer2,
    ChangeDetectorRef
} from '@angular/core';
import { DynamicPageBaseActions } from './dynamic-page-base-actions';
import { CLASS_NAME } from '../../constants';


@Component({
    selector: 'fd-dynamic-page-layout-actions',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageLayoutActionsComponent extends DynamicPageBaseActions implements AfterContentInit {

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _changeDetRef: ChangeDetectorRef
    ) {
        super();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.addClassToToolbar(CLASS_NAME.dynamicPageLayoutActionsToolbar, this._elementRef);
        this.addClassToToolbar(CLASS_NAME.dynamicPageToolbar, this._elementRef);
    }
}
