import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';

import { CLASS_NAME, DynamicPageResponsiveSize } from '../../constants';
import { DynamicPageService } from '../../dynamic-page.service';
import { addClassNameToElement } from '../../utils';
import { BreadcrumbComponent } from '../../../breadcrumb/breadcrumb.component';
import { DynamicPageGlobalActionsComponent } from '../actions/dynamic-page-global-actions.component';
import { DynamicPageTitleContentComponent } from '../actions/dynamic-page-title-content.component';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';

export const ActionSquashBreakpointPx = 1280;

@Component({
    selector: 'fd-dynamic-page-header',
    templateUrl: './dynamic-page-header.component.html',
    styleUrls: ['./dynamic-page-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.tabindex]': '0'
    }
})
export class DynamicPageHeaderComponent implements OnInit, AfterViewInit, OnDestroy {

    /** Title property for dynamic page */
    @Input()
    title: string;

    /** Subtitle property for dynamic page */
    @Input()
    subtitle: string;

    /** @hidden */
    @ContentChild(BreadcrumbComponent)
    _breadcrumbComponent: BreadcrumbComponent;

    /** @hidden */
    @ContentChild(DynamicPageGlobalActionsComponent)
    _globalActions: DynamicPageGlobalActionsComponent;

    /** @hidden */
    @ContentChild(DynamicPageTitleContentComponent)
    _contentToolbar: DynamicPageTitleContentComponent;

    /** @hidden */
    _actionsSquashed = false;

    /** @hidden */
    _size: DynamicPageResponsiveSize;

    /** @hidden **/
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        private _dynamicPageService: DynamicPageService,
        private _ngZone: NgZone,
        private _changeDetRef: ChangeDetectorRef
    ) {
    }

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleArea);
        this._listenToPageChanges();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._addCustomClassToBreadcrumb();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * sets size which in turn adds corresponding padding for the size type.
     * size can be `small`, `medium`, `large`, or `extra-large`.
     */
    set size(sizeType: DynamicPageResponsiveSize) {
        this._setSize(sizeType);
        this._size = sizeType;
    }

    /** @hidden */
    stopPropagation(event: MouseEvent): void {
        event.stopPropagation();
    }

    /**
     * @hidden
     * sets the padding classes
     * @param sizeType
     */
    private _setSize(sizeType: DynamicPageResponsiveSize): void {
        setTimeout(() => {
            this._breadcrumbComponent?.onResize();
            this._globalActions?._setSize(sizeType);
            this._contentToolbar?._setSize(sizeType);
            this._changeDetRef.detectChanges();
        });
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToElement(this._renderer, this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }

    /** @hidden */
    private _addCustomClassToBreadcrumb(): void {
        if (this._breadcrumbComponent) {
            this._addClassNameToCustomElement(
                this._breadcrumbComponent.elementRef.nativeElement,
                CLASS_NAME.dynamicPageBreadcrumb
            );
        }
    }

    /** @hidden */
    private _listenToPageChanges(): void {
        this._dynamicPageService.pixelsSizeChanged
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(pixels => {
                const actionsSquashed: boolean = pixels < ActionSquashBreakpointPx;
                if (actionsSquashed !== this._actionsSquashed) {
                    this._actionsSquashed = actionsSquashed;
                    this._changeDetRef.detectChanges();
                }
            })
        ;
    }
}
