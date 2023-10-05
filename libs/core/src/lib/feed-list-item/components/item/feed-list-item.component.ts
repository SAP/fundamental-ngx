import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { CssClassBuilder, Nullable, applyCssClass } from '@fundamental-ngx/cdk/utils';

import { NgIf, NgTemplateOutlet } from '@angular/common';
import { SafePipe, TruncatePipe } from '@fundamental-ngx/cdk/utils';
import { FormattedTextComponent } from '@fundamental-ngx/core/formatted-text';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { CSS_CLASS_NAME } from '../../constants';

@Component({
    selector: 'fd-feed-list-item',
    templateUrl: './feed-list-item.component.html',
    styleUrls: ['./feed-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgTemplateOutlet, FormattedTextComponent, LinkComponent, SafePipe, TruncatePipe, FdTranslatePipe]
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

    /** @hidden */
    maxCharsAtDefault = false;

    /**
     * Shows toggle state of feed text - more or less
     */
    isCollapsed = true;

    /**
     * Shows have you more line than max lines
     */
    hasMore = false;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

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

    /** @hidden */
    toggleTextView(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
