import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { DYNAMIC_PAGE_CLASS_NAME, DynamicPageResponsiveSize } from '../../constants';
import { DynamicPageBaseActions } from './dynamic-page-base-actions';

@Component({
    selector: 'fd-dynamic-page-global-actions',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        role: 'toolbar'
    },
    standalone: true
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
        this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageToolbar, this._elementRef);
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
        });
    }
}
