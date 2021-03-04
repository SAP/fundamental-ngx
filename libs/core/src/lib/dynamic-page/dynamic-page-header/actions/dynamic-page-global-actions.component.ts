import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    AfterContentInit,
    ElementRef,
    Renderer2,
    ChangeDetectorRef, ContentChild
} from '@angular/core';
import { DynamicPageBaseActions } from './dynamic-page-base-actions';
import { CLASS_NAME, DynamicPageResponsiveSize } from '../../constants';
import { ToolbarComponent } from '../../../toolbar/toolbar.component';

@Component({
    selector: 'fd-dynamic-page-global-actions',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageGlobalActionsComponent extends DynamicPageBaseActions implements AfterContentInit {

    /** @hidden */
    @ContentChild(ToolbarComponent)
    _toolbarComponent: ToolbarComponent;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _changeDetRef: ChangeDetectorRef
    ) {
        super();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.addClassToToolbar(CLASS_NAME.dynamicPageToolbar, this._elementRef);
    }

    /** @hidden */
    _setSize(size: DynamicPageResponsiveSize): void {
        if (this._toolbarComponent) {
            this._handleOverflow(size === 'small');
        }
    }

    /** @hidden */
    private _handleOverflow(shouldBeHidden: boolean): void {
        this._toolbarComponent.forceOverflow = shouldBeHidden;
        this._toolbarComponent.shouldOverflow = shouldBeHidden;
        this._toolbarComponent.detectChanges();
        setTimeout(() => {
            this._toolbarComponent.updateCollapsibleItems();
        })
    }
}
