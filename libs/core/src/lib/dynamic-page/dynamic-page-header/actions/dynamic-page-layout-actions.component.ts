import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    AfterContentInit,
    ElementRef,
    Renderer2,
    ChangeDetectorRef,
    ContentChild
} from '@angular/core';
import { DynamicPageBaseActions } from './dynamic-page-base-actions';
import { DYNAMIC_PAGE_CLASS_NAME } from '../../constants';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { Subject } from 'rxjs';

@Component({
    selector: 'fd-dynamic-page-layout-actions',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        role: 'toolbar'
    }
})
export class DynamicPageLayoutActionsComponent extends DynamicPageBaseActions implements AfterContentInit {
    /** @hidden */
    @ContentChild(ToolbarComponent)
    toolbarComponent: ToolbarComponent;

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef,
        private _renderer: Renderer2,
        private _changeDetRef: ChangeDetectorRef
    ) {
        super();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageLayoutActionsToolbar, this.elementRef);
        this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageToolbar, this.elementRef);
    }
}
