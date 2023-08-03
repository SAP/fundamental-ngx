import { HostBinding } from '@angular/core';
import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    SimpleChanges,
    ElementRef,
    OnInit,
    OnChanges
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/cdk/utils';
import { Nullable } from '@fundamental-ngx/cdk/utils';

import { CSS_CLASS_NAME } from '../../constants';

@Component({
    selector: 'fd-feed-list-item',
    templateUrl: './feed-list-item.component.html',
    styleUrls: ['./feed-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedListItemComponent implements OnInit, OnChanges, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class: string;

    /**
     * Author of feed
     */
    @Input()
    authorTitle: string;

    /**
     * Link to Author of feed
     */
    @Input()
    authorLink: Nullable<string>;

    /**
     * Feed text
     */
    @Input()
    text: string;

    /**
     * Max preview characters of Feed text. If you have more than max characters text, you can toggle preview/full text with more/less button.
     */
    @Input()
    maxChars: number;

    /**
     * Sets the `aria-label` attribute to the element.
     */
    @Input()
    ariaLabel = '';

    /**
     * aria-labelledby for element describing.
     */
    @Input()
    ariaLabelledby: string;

    /**
     * @deprecated use i18n capabilities instead
     * Text for more button
     */
    @Input()
    set moreLabel(value: string) {
        console.warn(
            "Property moreLabel is deprecated. Use i18n capabilities 'coreFeedListItem.moreLabel' key instead."
        );
        this._moreLabel = value;
    }

    get moreLabel(): string {
        return this._moreLabel;
    }

    /**
     * @deprecated use i18n capabilities instead
     * Text for less button
     */
    @Input()
    set lessLabel(value: string) {
        console.warn(
            "Property lessLabel is deprecated. Use i18n capabilities 'coreFeedListItem.lessLabel' key instead."
        );
        this._lessLabel = value;
    }

    get lessLabel(): string {
        return this._lessLabel;
    }

    /**
     * Apply rich feed text, please note - we use a formatted text component with this option, it has a list of controlled tags and attibutes.
     * This feature should be handled with care as it allows for countless custom layouts.
     */
    @Input()
    isRichText = false;

    /**
     * Apply mobile view
     */
    @Input()
    mobile = false;

    /** @hidden */
    maxCharsAtDefault = false;

    /**
     * Apply body class by default
     */
    @HostBinding('class.fd-feed-list__body')
    isFeedListItemBody = true;

    /**
     * Shows toggle state of feed text - more or less
     */
    isCollapsed = true;

    /**
     * Shows have you more line than max lines
     */
    hasMore = false;

    /** @hidden */
    private _moreLabel: string;

    /** @hidden */
    private _lessLabel: string;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden */
    setHasMore(): void {
        if (this.text) {
            this.hasMore = this.text.length > this.maxChars;
        }
    }

    /** @hidden */
    setDefaultMaxChars(): void {
        this.maxChars = this.mobile ? 300 : 500;
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        if (!this.maxChars) {
            this.setDefaultMaxChars();
            this.maxCharsAtDefault = true;
        }
        this.setHasMore();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('class' in changes || 'isRichText' in changes) {
            this.buildComponentCssClass();
        }
        this.maxCharsAtDefault && this.setDefaultMaxChars();
        this.setHasMore();
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CSS_CLASS_NAME.item, this.class, this.isRichText ? '' : `${CSS_CLASS_NAME.item}--collapsible`];
    }

    /** @hidden */
    toggleTextView(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
