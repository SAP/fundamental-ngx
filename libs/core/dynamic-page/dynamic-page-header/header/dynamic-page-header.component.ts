import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BreadcrumbComponent, FD_BREADCRUMB_COMPONENT } from '@fundamental-ngx/core/breadcrumb';
import { DYNAMIC_PAGE_HEADER_TOKEN, DynamicPageHeader } from '@fundamental-ngx/core/shared';

import { NgTemplateOutlet } from '@angular/common';
import { IgnoreClickOnSelectionDirective, Nullable } from '@fundamental-ngx/cdk/utils';
import { DYNAMIC_PAGE_CLASS_NAME, DynamicPageResponsiveSize } from '../../constants';
import { DynamicPageHeaderSubtitleDirective } from '../../directives/dynamic-page-header-subtitle.directive';
import { DynamicPageHeaderTitleDirective } from '../../directives/dynamic-page-header-title.directive';
import { DynamicPageService } from '../../dynamic-page.service';
import { addClassNameToElement } from '../../utils';
import { DynamicPageGlobalActionsComponent } from '../actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from '../actions/dynamic-page-layout-actions.component';
import { DynamicPageTitleContentComponent } from '../actions/dynamic-page-title-content.component';

export const ActionSquashBreakpointPx = 1280;

@Component({
    selector: 'fd-dynamic-page-header',
    templateUrl: './dynamic-page-header.component.html',
    styleUrl: './dynamic-page-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.tabindex]': '0'
    },
    providers: [
        {
            provide: DYNAMIC_PAGE_HEADER_TOKEN,
            useExisting: DynamicPageHeaderComponent
        }
    ],
    standalone: true,
    imports: [NgTemplateOutlet, IgnoreClickOnSelectionDirective]
})
export class DynamicPageHeaderComponent implements OnInit, AfterViewInit, OnDestroy, DynamicPageHeader {
    /** Title property for dynamic page */
    @Input()
    title: string;

    /** Whether title should wrap instead of truncation. */
    @Input()
    titleWrap = false;

    /** Subtitle property for dynamic page */
    @Input()
    subtitle: string;

    /** Whether subtitle should wrap instead of truncation. */
    @Input()
    subtitleWrap = false;

    /**
     * @ignore
     * Template used to provide a custom content for the subtitle page header area.
     */
    @ContentChild(DynamicPageHeaderSubtitleDirective)
    _subtitleTemplate: Nullable<DynamicPageHeaderSubtitleDirective>;

    /**
     * @ignore
     * Template used to provide a custom content for the title page header area.
     */
    @ContentChild(DynamicPageHeaderTitleDirective)
    _titleTemplate: Nullable<DynamicPageHeaderSubtitleDirective>;

    /** @ignore */
    @ContentChild(FD_BREADCRUMB_COMPONENT)
    _breadcrumbComponent: BreadcrumbComponent;

    /** @ignore */
    @ContentChild(DynamicPageGlobalActionsComponent)
    _globalActions: DynamicPageGlobalActionsComponent;

    /** @ignore */
    @ContentChild(DynamicPageLayoutActionsComponent)
    _layoutActions: DynamicPageLayoutActionsComponent;

    /** @ignore */
    @ContentChild(DynamicPageTitleContentComponent)
    _contentToolbar: DynamicPageTitleContentComponent;

    /** @ignore */
    _collapsed = false;

    /** @ignore */
    _actionsSquashed = false;

    /** @ignore */
    _size: DynamicPageResponsiveSize;

    /** @ignore **/
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @ignore */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        private _dynamicPageService: DynamicPageService,
        private _changeDetRef: ChangeDetectorRef
    ) {}

    /** @ignore */
    ngOnInit(): void {
        this._addClassNameToHostElement(DYNAMIC_PAGE_CLASS_NAME.dynamicPageTitleArea);
        this._listenToPageChanges();
    }

    /** @ignore */
    ngAfterViewInit(): void {
        this._addCustomClassToBreadcrumb();

        this._dynamicPageService.collapsed.pipe(takeUntil(this._onDestroy$)).subscribe((collapsed) => {
            this._collapsed = collapsed;
            this._changeDetRef.markForCheck();
        });
    }

    /** @ignore */
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

    /** @ignore */
    stopPropagation(event: MouseEvent): void {
        event.stopPropagation();
    }

    /**
     * @ignore
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

    /** @ignore */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToElement(this._renderer, this._elementRef.nativeElement, className);
    }

    /** @ignore */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }

    /** @ignore */
    private _addCustomClassToBreadcrumb(): void {
        if (this._breadcrumbComponent) {
            this._addClassNameToCustomElement(
                this._breadcrumbComponent.elementRef.nativeElement,
                DYNAMIC_PAGE_CLASS_NAME.dynamicPageBreadcrumb
            );
        }
    }

    /** @ignore */
    private _listenToPageChanges(): void {
        this._dynamicPageService.pixelsSizeChanged.pipe(takeUntil(this._onDestroy$)).subscribe((pixels) => {
            const actionsSquashed: boolean = pixels < ActionSquashBreakpointPx;
            if (actionsSquashed !== this._actionsSquashed) {
                this._actionsSquashed = actionsSquashed;
                this._changeDetRef.detectChanges();
            }
        });
    }
}
