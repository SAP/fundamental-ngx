import {
    Component,
    ElementRef,
    Input,
    OnInit,
    OnDestroy,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    AfterContentChecked
} from '@angular/core';
import { Subscription } from 'rxjs';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';

import { CSS_CLASS_NAME } from '../../constants';
import { FeedListItemComponent } from '../item/feed-list-item.component';

@Component({
    selector: 'fd-feed-list',
    templateUrl: './feed-list.component.html',
    styleUrls: ['./feed-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedListComponent implements OnInit, AfterContentChecked, OnDestroy, OnChanges, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class: string;
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
     * Apply mobile view
     */
    @Input()
    mobile = false;
    /**
     * Feed list items will be display in a group.
     */
    @Input()
    isGroup = true;
    /**
     * It removes border if items are displaying in a group.
     */
    @Input()
    borderLess = false;
    /**
     * Gets feed list items
     */
    @ContentChildren(FeedListItemComponent)
    feedItems: QueryList<FeedListItemComponent>;

    /** @hidden */
    private $feedItemChanges: Subscription;

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef) {}

    /** @hidden */
    ngAfterContentChecked(): void {
        this._refreshItems();
        this._listenOnFeedItems();
    }
    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('mobile' in changes || 'borderLess' in changes) {
            this.buildComponentCssClass();
            this._refreshItems();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this.$feedItemChanges) {
            this.$feedItemChanges.unsubscribe();
        }
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            CSS_CLASS_NAME.list,
            this.class,
            this.borderLess ? `${CSS_CLASS_NAME.list}--no-border` : '',
            this.isGroup ? `${CSS_CLASS_NAME.list}--group` : '',
            this.mobile ? `${CSS_CLASS_NAME.list}--s` : ''
        ];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    private _listenOnFeedItems(): void {
        this.$feedItemChanges = this.feedItems.changes.subscribe(() => this._refreshItems());
    }

    /** @hidden */
    private _refreshItems(): void {
        (this.feedItems || []).forEach((feedItem) => {
            feedItem.mobile = this.mobile;
            if (feedItem.maxCharsAtDefault && this.mobile) {
                feedItem.setDefaultMaxChars();
                feedItem.setHasMore();
            }
        });
    }
}
