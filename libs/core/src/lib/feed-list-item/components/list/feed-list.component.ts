import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList
} from '@angular/core';
import { Subscription } from 'rxjs';

import { CssClassBuilder, applyCssClass } from '../../../utils/public_api';
import { FEED_LIST_PREFIX } from '../../constants';
import { FeedListItemComponent } from '../item/feed-list-item.component';

@Component({
  selector: 'fd-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['../../original-styles.css', './feed-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedListComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges, CssClassBuilder {
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
  ariaLabelledby: string = null;
  /**
   * Apply mobile view
  */
  @Input()
  isMobile = false;
  /**
   * It removes border if items are displaying in a group.
  */
  @Input()
  borderLess = false;
  /**
  * Gets feed list items
  */
  @ContentChildren(FeedListItemComponent, { descendants: true })
  feedItems: QueryList<FeedListItemComponent>;

  /** @hidden */
  private $feedItemChanges: Subscription;

  /** @hidden */
  constructor (
    private readonly _elementRef: ElementRef
  ) { }

  /** @hidden */
  ngAfterViewInit(): void {
    this.$feedItemChanges = this.feedItems.changes.subscribe((feedItems: FeedListItemComponent[]) => {
      console.log(feedItems);
      feedItems.forEach(feedItem => {
        feedItem.isMobile = this.isMobile;
      });
    });
  }
  /** @hidden */
  ngOnInit(): void {
    this.buildComponentCssClass();
  }
  /** @hidden */
  ngOnChanges(changes: SimpleChanges): void {
    if ('isMobile' in changes ||
      'borderLess' in changes) {
        this.buildComponentCssClass();
      }
  }

  /** @hidden */
  ngOnDestroy(): void {
    this.$feedItemChanges.unsubscribe();
  }

  @applyCssClass
  /** CssClassBuilder interface implementation
   * function must return single string
   * function is responsible for order which css classes are applied
   */
  buildComponentCssClass(): string[] {
    return [FEED_LIST_PREFIX,
      this.class,
      this.borderLess ? `${FEED_LIST_PREFIX}--no-border` : '',
      this.isMobile ? `${FEED_LIST_PREFIX}--s` : '',
    ];
  }

  /** @hidden */
  elementRef(): ElementRef<any> {
    return this._elementRef;
  }
}
