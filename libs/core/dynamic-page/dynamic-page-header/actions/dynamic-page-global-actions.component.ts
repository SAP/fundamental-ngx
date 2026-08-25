import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    inject,
    ViewEncapsulation
} from '@angular/core';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { DYNAMIC_PAGE_CLASS_NAME } from '../../constants';
import { DynamicPageService } from '../../dynamic-page.service';
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
    protected readonly _toolbarComponent = contentChild(ToolbarComponent);

    /** Whether the toolbar should show overflow (size is small). */
    protected readonly shouldOverflow = computed(() => this._dynamicPageService?.responsiveSize() === 'small');

    /** @hidden */
    private readonly _dynamicPageService = inject(DynamicPageService, { optional: true });

    constructor() {
        super();

        // Add toolbar class after render when DOM is ready
        afterNextRender(() => {
            this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageToolbar);
        });

        // React to size changes. This effect is a pure side-effect writer of the toolbar's
        // overflow inputs — it must NOT force change detection synchronously. Setting
        // `shouldOverflow` pushes through the toolbar's own `shouldOverflow$` pipeline, which
        // recomputes the overflow set and updates the view on the toolbar's own schedule.
        // Re-entering the in-progress CD tick with `toolbar.detectChanges()` here (plus an
        // afterNextRender → updateCollapsibleItems double-trigger) caused NG0103 under an
        // Eager/Default-CD host with a real ResizeObserver firing repeatedly (issue #14474).
        effect(() => {
            const shouldOverflow = this.shouldOverflow();
            const toolbar = this._toolbarComponent();
            if (toolbar) {
                this._handleOverflow(toolbar, shouldOverflow);
            }
        });
    }

    /** @hidden */
    private _handleOverflow(toolbar: ToolbarComponent, shouldBeHidden: boolean): void {
        toolbar.forceOverflow = shouldBeHidden;
        toolbar.shouldOverflow = shouldBeHidden;
    }
}
