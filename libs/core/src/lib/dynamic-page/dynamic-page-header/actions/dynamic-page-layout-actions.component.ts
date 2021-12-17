import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    AfterContentInit,
    ElementRef,
    Renderer2,
    ChangeDetectorRef,
    ContentChild,
    Optional,
    OnDestroy
} from '@angular/core';
import { DynamicPageBaseActions } from './dynamic-page-base-actions';
import { DYNAMIC_PAGE_CLASS_NAME } from '../../constants';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { DynamicPageService } from '../../dynamic-page.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fd-dynamic-page-layout-actions',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        role: 'toolbar'
    }
})
export class DynamicPageLayoutActionsComponent extends DynamicPageBaseActions implements AfterContentInit, OnDestroy {
    @ContentChild(ToolbarComponent)
    toolbarComponent: ToolbarComponent;

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _changeDetRef: ChangeDetectorRef,
        @Optional() private _dynamicPageService: DynamicPageService
    ) {
        super();
    }

    /** @hidden */
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenFocus();
        this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageLayoutActionsToolbar, this._elementRef);
        this.addClassToToolbar(DYNAMIC_PAGE_CLASS_NAME.dynamicPageToolbar, this._elementRef);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden
     * Set focus on first child when the tab out event fires from Breadcrumbs
     * */
    private _listenFocus(): void {
        this._dynamicPageService?.focusLayoutAction.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this.toolbarComponent.toolbar.nativeElement.children[0].focus();
        });
    }
}
