import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { TabPanelComponent } from '@fundamental-ngx/core/tabs';
import { DynamicPageBackgroundType, DynamicPageResponsiveSize } from '../constants';

/** Dynamic Page tab change event */
export class DynamicPageTabChangeEvent {
    constructor(public source: DynamicPageContentComponent, public payload: TabPanelComponent) {}
}

/**
 * Dynamic Page Content Component.
 *
 */
@Component({
    selector: 'fdp-dynamic-page-content',
    template: `
        <ng-template #contentTemplateRef>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPageContentComponent {
    /**
     * label for the tab. If label is provided, tab navigation will be internally set up.
     */
    @Input()
    tabLabel: string;

    /**
     * a unique identifier for this content
     */
    @Input()
    id: string;

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

    /**
     * Tab Change event
     */
    @Output()
    tabChange: EventEmitter<DynamicPageTabChangeEvent> = new EventEmitter<DynamicPageTabChangeEvent>();

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
    constructor(protected _elementRef: ElementRef<HTMLElement>) {}

    /**
     * get reference to this element
     */
    getElementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }
}
