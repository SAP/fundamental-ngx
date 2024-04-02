import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    ViewEncapsulation,
    inject
} from '@angular/core';
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
    },
    standalone: true
})
export class DynamicPageLayoutActionsComponent extends DynamicPageBaseActions implements AfterContentInit {
    /** @hidden */
    @ContentChild(ToolbarComponent)
    toolbarComponent: ToolbarComponent;

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    ngAfterContentInit(): void {
        this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageLayoutActionsToolbar, this._elementRef);
        this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageToolbar, this._elementRef);
    }
}
