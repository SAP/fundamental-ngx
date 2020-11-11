import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  ElementRef,
  ContentChild,
  OnInit,
  OnChanges,
  ChangeDetectorRef
} from '@angular/core';

import { CssClassBuilder, applyCssClass } from '../../../utils/public_api';
import { FEED_LIST_ITEM_PREFIX } from '../../constants';
import { FeedListActionComponent } from '../feed-list-action/feed-list-action.component';
import { FeedListAvatarComponent } from '../feed-list-avatar/feed-list-avatar.component';
import { FeedListFooterComponent } from '../feed-list-footer/feed-list-footer.component';

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
  authorLink: string | null = null;
  /**
   * Feed text
   */
  @Input()
  text: string | null = null;
  /**
   * Max preview rows of Feed text. If you have more than max rows text, you can toggle preview/full text with more/less button.
   */
  @Input()
  maxRows = 2;
  /**
   * Sets the `aria-label` attribute to the element.
  */
  @Input()
  ariaLabel = '';
  /**
   * aria-labelledby for element describing.
   */
  @Input()
  ariaLabelledby: string = null;
  /**
   * Text for more button
  */
  @Input()
  moreLabel = 'More'
  /**
   * Text for less button
  */
  @Input()
  lessLabel = 'Less'
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
  isMobile = false;

  /**
   * @hidden
   * You can use any avatar contruction, but for this block you will have place
   *
  */
  @ContentChild(FeedListAvatarComponent)
  avatarRef: FeedListAvatarComponent;
  /** @hidden */
  @ContentChild(FeedListActionComponent)
  actionRef: FeedListActionComponent;
  /** @hidden */
  @ContentChild(FeedListFooterComponent)
  footerRef: FeedListFooterComponent;

  isCollapsed = true;
  hasMore = false;

  /** @hidden */
  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) { }

  /** @hidden */
  ngOnInit(): void {
    this.buildComponentCssClass();
  }
  /** @hidden */
  ngOnChanges(changes: SimpleChanges): void {
    if ('class' in changes || 'isRichText' in changes) {
      this.buildComponentCssClass();
    }
  }

  @applyCssClass
  /** CssClassBuilder interface implementation
   * function must return single string
   * function is responsible for order which css classes are applied
   */
  buildComponentCssClass(): string[] {
    return [FEED_LIST_ITEM_PREFIX,
      this.class,
      this.isRichText ? '' : `${FEED_LIST_ITEM_PREFIX}--collapsible`,
    ];
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
  checkLineCount(count: number): void {
    this.hasMore = count > +this.maxRows;
    this._changeDetectorRef.detectChanges();
  }
}
