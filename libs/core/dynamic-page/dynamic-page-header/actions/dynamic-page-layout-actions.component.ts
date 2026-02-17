import { afterNextRender, ChangeDetectionStrategy, Component, contentChild, ViewEncapsulation } from '@angular/core';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { DYNAMIC_PAGE_CLASS_NAME } from '../../constants';
import { DynamicPageBaseActions } from './dynamic-page-base-actions';

@Component({
    selector: 'fd-dynamic-page-layout-actions',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        role: 'toolbar',
        '[style.margin-inline-start]': '"auto"'
    }
})
export class DynamicPageLayoutActionsComponent extends DynamicPageBaseActions {
    /** @hidden */
    readonly toolbarComponent = contentChild(ToolbarComponent);

    constructor() {
        super();

        // Add toolbar classes after render when DOM is ready
        afterNextRender(() => {
            this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageLayoutActionsToolbar);
            this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageToolbar);
        });
    }
}
