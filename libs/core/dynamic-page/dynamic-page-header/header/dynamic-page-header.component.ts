import {
    afterNextRender,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    inject,
    input,
    OnInit,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';

import { BreadcrumbComponent, FD_BREADCRUMB_COMPONENT } from '@fundamental-ngx/core/breadcrumb';
import { DYNAMIC_PAGE_HEADER_TOKEN } from '@fundamental-ngx/core/shared';

import { NgTemplateOutlet } from '@angular/common';
import { IgnoreClickOnSelectionDirective } from '@fundamental-ngx/cdk/utils';
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
export class DynamicPageHeaderComponent implements OnInit {
    /**
     * The title text displayed in the dynamic page header.
     * @default ''
     */
    readonly title = input('');

    /**
     * Whether the title text should wrap to multiple lines instead of truncating with ellipsis.
     * @default false
     */
    readonly titleWrap = input(false, { transform: booleanAttribute });

    /**
     * The subtitle text displayed below the title in the dynamic page header.
     * @default ''
     */
    readonly subtitle = input('');

    /**
     * Whether the subtitle text should wrap to multiple lines instead of truncating with ellipsis.
     * @default false
     */
    readonly subtitleWrap = input(false, { transform: booleanAttribute });

    /**
     * The heading level (h1-h6) for the dynamic page title.
     * Determines the semantic hierarchy for accessibility and SEO.
     * @default 2
     */
    readonly headingLevel = input<HeadingLevel>(2);

    /**
     * The heading level (h1-h6) for the dynamic page subtitle.
     * When provided, the subtitle will be rendered as a semantic heading with role="heading".
     * When not provided (undefined/null), the subtitle is rendered as plain text without a heading role.
     * @default undefined
     */
    readonly subtitleHeadingLevel = input<HeadingLevel | undefined | null>(undefined);

    /**
     * The unique ID for the dynamic page title element.
     * Used for ARIA relationships and programmatic reference.
     * @default 'fd-dynamic-page-title-id-{auto-increment}'
     */
    readonly titleId = input(`fd-dynamic-page-title-id-${++dynamicPageTitleId}`);

    /**
     * @hidden
     * Content child query for custom subtitle template.
     * When provided via fdDynamicPageHeaderSubtitle directive, overrides the subtitle text input.
     */
    readonly _subtitleTemplate = contentChild(DynamicPageHeaderSubtitleDirective);

    /**
     * @hidden
     * Content child query for custom title template.
     * When provided via fdDynamicPageHeaderTitle directive, overrides the title text input.
     */
    readonly _titleTemplate = contentChild(DynamicPageHeaderTitleDirective);

    /** @hidden */
    readonly _dynamicPageBreadcrumbComponent = contentChild(FD_DYNAMIC_PAGE_BREADCRUMB_COMPONENT, {
        read: DynamicPageBreadcrumbComponent
    });

    /** @hidden */
    readonly _breadcrumbComponent = contentChild(FD_BREADCRUMB_COMPONENT, { read: BreadcrumbComponent });

    /** @hidden */
    readonly _globalActions = contentChild(DynamicPageGlobalActionsComponent);

    /** @hidden */
    readonly _layoutActions = contentChild(DynamicPageLayoutActionsComponent);

    /** @hidden */
    readonly _contentToolbar = contentChild(DynamicPageTitleContentComponent);

    /**
     * @hidden
     * Computed signal indicating whether actions should be displayed in collapsed/squashed mode.
     * True when viewport width is below the ActionSquashBreakpointPx threshold (1280px).
     */
    readonly _actionsSquashed = computed(() => this._dynamicPageService.pixelsSizeChanged() < ActionSquashBreakpointPx);

    /**
     * @hidden
     * Computed numeric heading level extracted from the headingLevel input.
     * Strips non-digit characters and returns integer value.
     */
    readonly _headingLevel = computed(() =>
        this.headingLevel() ? Number.parseInt(`${this.headingLevel()}`.replace(/\D/g, ''), 10) : 2
    );

    /**
     * @hidden
     * Tracks the current responsive size of the dynamic page.
     * Updated by effect when DynamicPageService.responsiveSize changes.
     */
    _size: DynamicPageResponsiveSize;

    /** @hidden */
    readonly _dynamicPageService = inject(DynamicPageService);

    /** @hidden */
    private readonly _elementRef = inject(ElementRef<HTMLElement>);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    constructor() {
        // React to size changes and update breadcrumb
        effect(() => {
            const size = this._dynamicPageService.responsiveSize();
            this._size = size;

            const breadcrumb = this._breadcrumbComponent();

            if (breadcrumb) {
                // Add custom class on first render
                addClassNameToElement(
                    this._renderer,
                    breadcrumb.elementRef.nativeElement,
                    'fd-dynamic-page__breadcrumb'
                );
            }
        });

        // Trigger breadcrumb resize after view is fully initialized
        afterNextRender(() => {
            const breadcrumb = this._breadcrumbComponent();

            if (breadcrumb && typeof breadcrumb.onResize === 'function') {
                breadcrumb.onResize();
            }
        });
    }

    /** @hidden */
    ngOnInit(): void {
        addClassNameToElement(
            this._renderer,
            this._elementRef.nativeElement,
            DYNAMIC_PAGE_CLASS_NAME.dynamicPageTitleArea
        );
    }

    /**
     * @hidden
     * Prevents click events from bubbling up to parent elements.
     * Used to stop the header collapse toggle when interacting with header content.
     */
    stopPropagation(event: MouseEvent): void {
        event.stopPropagation();
    }
}
