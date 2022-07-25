import { HostBinding } from '@angular/core';
import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    SimpleChanges,
    ElementRef,
    OnInit,
    OnChanges,
    ChangeDetectorRef
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';

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
    moreLabel: string;

    /**
     * @deprecated use i18n capabilities instead
     * Text for less button
     */
    @Input()
    lessLabel: string;

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
    constructor(private readonly _elementRef: ElementRef, private readonly _changeDetectorRef: ChangeDetectorRef) {}

    setHasMore(): void {
        this.hasMore = this.text.length > this.maxChars;
    }

    setMaxChar(): void {
        this.maxChars = this.mobile ? 300 : 500;
    }
    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this.setMaxChar();
        this.setHasMore();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('class' in changes || 'isRichText' in changes) {
            this.buildComponentCssClass();
        }
        this.setMaxChar();
        this.setHasMore();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [CSS_CLASS_NAME.item, this.class, this.isRichText ? '' : `${CSS_CLASS_NAME.item}--collapsible`];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    toggleTextView(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    /** @hidden */
    checkCharCount(isMore: boolean): void {
        this.hasMore = isMore;
        this._changeDetectorRef.detectChanges();
    }
}
