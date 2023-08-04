import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, TemplateRef } from '@angular/core';
import { tap } from 'rxjs';

import { DynamicPageBackgroundType, DynamicPageResponsiveSize } from '../../constants';
import { DynamicPageConfig } from '../../dynamic-page.config';
import { Nullable, warnOnce } from '@fundamental-ngx/cdk/utils';

/** Dynamic Page collapse change event */
export class DynamicPageCollapseChangeEvent {
    /**
     * Dynamic Page collapse change event
     * @param source Dynamic Page component
     * @param payload Collapse state
     */
    constructor(public source: DynamicPageHeaderComponent, public payload: boolean) {}
}

let dynamicPageHeaderId = 0;

/**
 * Dynamic Page Header Component.
 *
 * This component is part of Public API
 * used by supplier to declare inputs and template
 *
 */

@Component({
    selector: 'fdp-dynamic-page-header',
    template: `
        <ng-template #contentTemplateRef>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPageHeaderComponent {
    /**
     * whether the header can be collapsed. True by default. If set to false, both pin/collapse buttons disappear
     * and the header stays visible
     */
    @Input()
    collapsible = true;

    /**
     * whether the header should be allowed to be pinned or unpinned. When set, the pin button shows up.
     * Pinning the header will make the header stay visible and the collapse button(if present) will disappear until unpinned.
     */
    @Input()
    pinnable = false;

    /**
     * the initial state of the header. Set to true if header should be collapsed.
     */
    @Input()
    collapsed: boolean;

    /**
     * ARIA label for button when the header is collapsed
     */
    @Input()
    expandLabel: string = this._dynamicPageConfig.expandLabel;

    /**
     * ARIA label for button when the header is expanded
     */
    @Input()
    collapseLabel: string = this._dynamicPageConfig.collapseLabel;

    /** Header role  */
    @Input()
    role = 'region';

    /**
     * id for header
     */
    @Input()
    id = `fdp-dynamic-page-header-id-${dynamicPageHeaderId++}`;

    /**
     * aria label for header
     */
    @Input()
    headerAriaLabel: Nullable<string>;

    /**
     * aria label for pin state of pin button
     */
    @Input()
    pinAriaLabel: string = this._dynamicPageConfig.pinLabel;

    /**
     * aria label for unpin state of pin button
     */
    @Input()
    unpinAriaLabel: string = this._dynamicPageConfig.unpinLabel;

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

    /** Collapse/Expand change event raised */
    @Output()
    collapsedChange: EventEmitter<DynamicPageCollapseChangeEvent> = new EventEmitter<DynamicPageCollapseChangeEvent>();

    /** @deprecated - use `collapsedChange` instead */
    @Output()
    collapseChange = this.collapsedChange.pipe(
        tap(() =>
            warnOnce('`collapseChange` is deprecated and will be removed next release. Use `collapsedChange` instead.')
        )
    );

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

    /** @hidden */
    constructor(protected _dynamicPageConfig: DynamicPageConfig) {}

    /**
     * @hidden
     * Delegate collapse change event
     */
    _onCollapseChange(collapsed: boolean): void {
        this.collapsed = collapsed;
        const event = new DynamicPageCollapseChangeEvent(this, collapsed);
        this.collapsedChange.emit(event);
    }
}
