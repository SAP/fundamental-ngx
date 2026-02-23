import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    effect,
    ElementRef,
    inject,
    Input,
    input,
    OnInit,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';

import { BreadcrumbComponent, FD_BREADCRUMB_COMPONENT } from '@fundamental-ngx/core/breadcrumb';
import { DYNAMIC_PAGE_HEADER_TOKEN, DynamicPageHeader } from '@fundamental-ngx/core/shared';

import { NgTemplateOutlet } from '@angular/common';
import { IgnoreClickOnSelectionDirective, Nullable } from '@fundamental-ngx/cdk/utils';
import { HeadingLevel } from '@fundamental-ngx/core/shared';
import { DYNAMIC_PAGE_CLASS_NAME, DynamicPageResponsiveSize } from '../../constants';
import { DynamicPageHeaderSubtitleDirective } from '../../directives/dynamic-page-header-subtitle.directive';
import { DynamicPageHeaderTitleDirective } from '../../directives/dynamic-page-header-title.directive';
import { DynamicPageService } from '../../dynamic-page.service';
import { FD_DYNAMIC_PAGE_BREADCRUMB_COMPONENT } from '../../tokens';
import { addClassNameToElement } from '../../utils';
import { DynamicPageGlobalActionsComponent } from '../actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from '../actions/dynamic-page-layout-actions.component';
import { DynamicPageTitleContentComponent } from '../actions/dynamic-page-title-content.component';
import { DynamicPageBreadcrumbComponent } from '../breadcrumb/dynamic-page-breadcrumb.component';

export const ActionSquashBreakpointPx = 1280;

let dynamicPageTitleId = 0;

@Component({
    selector: 'fd-dynamic-page-header',
    templateUrl: './dynamic-page-header.component.html',
    styleUrl: './dynamic-page-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: DYNAMIC_PAGE_HEADER_TOKEN,
            useExisting: DynamicPageHeaderComponent
        }
    ],
    imports: [NgTemplateOutlet, IgnoreClickOnSelectionDirective]
})
export class DynamicPageHeaderComponent implements OnInit, AfterViewInit, DynamicPageHeader {
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
     * @hidden
     * Template used to provide a custom content for the subtitle page header area.
     */
    @ContentChild(DynamicPageHeaderSubtitleDirective)
    _subtitleTemplate: Nullable<DynamicPageHeaderSubtitleDirective>;

    /**
     * @hidden
     * Template used to provide a custom content for the title page header area.
     */
    @ContentChild(DynamicPageHeaderTitleDirective)
    _titleTemplate: Nullable<DynamicPageHeaderSubtitleDirective>;

    /** @hidden */
    @ContentChild(FD_DYNAMIC_PAGE_BREADCRUMB_COMPONENT)
    _dynamicPageBreadcrumbComponent: DynamicPageBreadcrumbComponent;

    /** @hidden */
    @ContentChild(FD_BREADCRUMB_COMPONENT)
    _breadcrumbComponent: BreadcrumbComponent;

    /** @hidden */
    @ContentChild(DynamicPageGlobalActionsComponent)
    _globalActions: DynamicPageGlobalActionsComponent;

    /** @hidden */
    @ContentChild(DynamicPageLayoutActionsComponent)
    _layoutActions: DynamicPageLayoutActionsComponent;

    /** @hidden */
    @ContentChild(DynamicPageTitleContentComponent)
    _contentToolbar: DynamicPageTitleContentComponent;

    /** @hidden */
    _actionsSquashed$ = computed(() => this._dynamicPageService.pixelsSizeChanged() < ActionSquashBreakpointPx);

    /** @hidden */
    _size: DynamicPageResponsiveSize;

    /**
     * Heading level of the dynamic page header title.
     */
    headingLevel = input<HeadingLevel>(2);

    /** @hidden */
    _headingLevel = computed(() =>
        this.headingLevel() ? Number.parseInt(`${this.headingLevel()}`.replace(/\D/g, ''), 10) : 2
    );

    /** Dynamic page title id, it has some default value if not set,  */
    titleId = input('fd-dynamic-page-title-id-' + dynamicPageTitleId++);

    /** @hidden */
    readonly _dynamicPageService = inject(DynamicPageService);

    /** @hidden */
    private readonly _elementRef = inject(ElementRef<HTMLElement>);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    constructor() {
        // React to size changes for breadcrumb resize
        effect(() => {
            const size = this._dynamicPageService.responsiveSize();
            this._size = size;
            this._breadcrumbComponent?.onResize();
        });
    }

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(DYNAMIC_PAGE_CLASS_NAME.dynamicPageTitleArea);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._addCustomClassToBreadcrumb();
    }

    /** @hidden */
    stopPropagation(event: MouseEvent): void {
        event.stopPropagation();
    }

    /** @hidden */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToElement(this._renderer, this._elementRef.nativeElement, className);
    }

    /** @hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }

    /** @hidden */
    private _addCustomClassToBreadcrumb(): void {
        if (this._breadcrumbComponent) {
            this._addClassNameToCustomElement(
                this._breadcrumbComponent.elementRef.nativeElement,
                DYNAMIC_PAGE_CLASS_NAME.dynamicPageBreadcrumb
            );
        }
    }
}
