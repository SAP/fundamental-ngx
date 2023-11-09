import { AfterContentInit, ContentChild, Directive, ElementRef } from '@angular/core';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { Subject } from 'rxjs';
import { DYNAMIC_PAGE_CLASS_NAME } from '../../constants';
import { DynamicPageBaseActions } from './dynamic-page-base-actions';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-dynamic-page-layout-actions',
    host: {
        role: 'toolbar'
    },
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DynamicPageLayoutActionsComponent extends DynamicPageBaseActions implements AfterContentInit {
    /** @hidden */
    @ContentChild(ToolbarComponent)
    toolbarComponent: ToolbarComponent;

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {
        super();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageLayoutActionsToolbar, this.elementRef);
        this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageToolbar, this.elementRef);
    }
}
