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
    @ContentChild(ToolbarComponent)
    toolbarComponent: ToolbarComponent;

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _changeDetRef: ChangeDetectorRef
    ) {
        super();
    }

    /** @hidden */
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageLayoutActionsToolbar, this._elementRef);
        this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageToolbar, this._elementRef);
    }
}
