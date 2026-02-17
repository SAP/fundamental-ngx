import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    contentChild,
    inject,
    Injector,
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
    }
})
export class DynamicPageGlobalActionsComponent extends DynamicPageBaseActions {
    /** @hidden */
    readonly _toolbarComponent = contentChild(ToolbarComponent);

    /** @hidden */
    private readonly _injector = inject(Injector);

    constructor() {
        super();

        // Add toolbar class after render when DOM is ready
        afterNextRender(() => {
            this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageToolbar);
        });
    }

    /** @hidden */
    _setSize(size: DynamicPageResponsiveSize): void {
        const toolbar = this._toolbarComponent();
        if (toolbar) {
            this._handleOverflow(toolbar, size === 'small');
        }
    }

    /** @hidden */
    private _handleOverflow(toolbar: ToolbarComponent, shouldBeHidden: boolean): void {
        toolbar.forceOverflow = shouldBeHidden;
        toolbar.shouldOverflow = shouldBeHidden;
        toolbar.detectChanges();
        afterNextRender(
            () => {
                toolbar.updateCollapsibleItems();
            },
            { injector: this._injector }
        );
    }
}
