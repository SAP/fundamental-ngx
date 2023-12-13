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
import { Subject } from 'rxjs';
import { DYNAMIC_PAGE_CLASS_NAME } from '../../constants';
import { DynamicPageBaseActions } from './dynamic-page-base-actions';

@Component({
    selector: 'fd-dynamic-page-layout-actions',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        role: 'toolbar'
    },
    standalone: true
})
export class DynamicPageLayoutActionsComponent extends DynamicPageBaseActions implements AfterContentInit {
    /** @ignore */
    @ContentChild(ToolbarComponent)
    toolbarComponent: ToolbarComponent;

    /** @ignore */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @ignore */
    constructor(
        public readonly elementRef: ElementRef,
        private _renderer: Renderer2,
        private _changeDetRef: ChangeDetectorRef
    ) {
        super();
    }

    /** @ignore */
    ngAfterContentInit(): void {
        this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageLayoutActionsToolbar, this.elementRef);
        this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageToolbar, this.elementRef);
    }
}
