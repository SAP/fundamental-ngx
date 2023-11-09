import { ContentChild, Directive, Input, TemplateRef, ViewChild } from '@angular/core';
import { DYNAMIC_PAGE_HEADER_TOKEN, DynamicPageHeader } from '@fundamental-ngx/core/shared';

import { DynamicPageBackgroundType, DynamicPageResponsiveSize } from '../../constants';
import { DynamicPageHeaderSubtitleDirective } from '../../directives/dynamic-page-header-subtitle.directive';
import { DynamicPageHeaderTitleDirective } from '../../directives/dynamic-page-header-title.directive';
import { DynamicPageGlobalActionsComponent } from '../actions/global-actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from '../actions/layout-actions/dynamic-page-layout-actions.component';
import { DynamicPageKeyInfoComponent } from '../key-info/dynamic-page-key-info.component';
import { DynamicPageTitleImageComponent } from './dynamic-page-title-image.component';

/**
 * Dynamic Page Title Component.
 *
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdp-dynamic-page-title',
    providers: [
        {
            provide: DYNAMIC_PAGE_HEADER_TOKEN,
            useExisting: DynamicPageTitleComponent
        }
    ],
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DynamicPageTitleComponent implements DynamicPageHeader {
    /**
     * Page Title
     */
    @Input()
    title: string;

    /** Whether title should wrap instead of truncation. */
    @Input()
    titleWrap = false;

    /**
     * Page Subtitle
     */
    @Input()
    subtitle: string;

    /** Whether subtitle should wrap instead of truncation. */
    @Input()
    subtitleWrap = false;

    /**
     * sets background for content to `list`, `transparent`, or `solid` background color.
     * Default is `solid`.
     */
    @Input()
    background: DynamicPageBackgroundType;

    /**
     * sets size which in turn adds corresponding padding for the size type.
     * size can be `small`, `medium`, `large`, or `extra-large`.
     */
    @Input()
    size: DynamicPageResponsiveSize;

    /** template of BreadsCrumbs */
    @ViewChild('breadCrumbTemplate')
    breadcrumbTemplate: TemplateRef<any>;

    /** reference to global actions component */
    @ContentChild(DynamicPageGlobalActionsComponent)
    globalActionsComponent: DynamicPageGlobalActionsComponent;

    /** reference to layout actions component */
    @ContentChild(DynamicPageLayoutActionsComponent)
    layoutActionsComponent: DynamicPageLayoutActionsComponent;

    /** reference to key-info component */
    @ContentChild(DynamicPageKeyInfoComponent)
    keyInfoComponent: DynamicPageKeyInfoComponent;

    /** reference to image component */
    @ContentChild(DynamicPageTitleImageComponent)
    imageComponent: DynamicPageTitleImageComponent;

    /** @hidden */
    @ContentChild(DynamicPageHeaderTitleDirective)
    _titleDirective: DynamicPageHeaderTitleDirective;

    /** @hidden */
    @ContentChild(DynamicPageHeaderSubtitleDirective)
    _subtitleDirective: DynamicPageHeaderSubtitleDirective;

    /**
     * @hidden
     * The component view is wrapped in ng-template so
     * component's consumer have to use this templateRef to render it
     * in its view.
     *
     * The template reference to the component view.
     */
    @ViewChild('contentTemplateRef')
    contentTemplateRef: TemplateRef<any>;
}
