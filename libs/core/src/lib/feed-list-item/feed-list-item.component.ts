import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  TemplateRef,
  Input,
  SimpleChanges,
  ElementRef,
  ContentChild,
  OnInit,
  OnChanges,
  Renderer2,
  ChangeDetectorRef
} from '@angular/core';

import { CssClassBuilder, applyCssClass } from '../utils/public_api';

const componentClassPrefix = 'fd-feed-list__item';

@Component({
  selector: 'fd-feed-list-item',
  templateUrl: './feed-list-item.component.html',
  styleUrls: ['./original-styles.css', './feed-list-item.component.scss'],
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
   * @hidden
   * You can use any avatar contruction, but for this block you will have place
   *
  */
  @ContentChild('avatar')
  avatarTemplate: TemplateRef<any>;
  /** @hidden */
  @ContentChild('action')
  actionTemplate: TemplateRef<any>;
  /** @hidden */
  @ContentChild('footer')
  footerTemplate: TemplateRef<any>;

  isCollapsed = true;
  hasMore = false;

  /** @hidden */
  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) { }

  /** @hidden */
  ngOnInit(): void {
    this.buildComponentCssClass();
  }
  /** @hidden */
  ngOnChanges(changes: SimpleChanges): void {
    if ('maxRows' in changes) {
      this._updateMaxRowClamp();
    }
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
    return [componentClassPrefix,
      this.class,
      this.isRichText ? '' : `${componentClassPrefix}--collapsible`
    ];
  }

  /** @hidden */
  elementRef(): ElementRef<any> {
    return this._elementRef;
  }

  /** @hidden */
  toggleTextView(): void {
    this.isCollapsed = !this.isCollapsed;
    this._updateMaxRowClamp();
  }

  /** @hidden */
  checkLineCount(count: number): void {
    this.hasMore = count > +this.maxRows;
    this._changeDetectorRef.detectChanges();
  }

  /** @hidden */
  private _updateMaxRowClamp(): void {
    if (this.isCollapsed) {
      this._renderer.setStyle(this._elementRef.nativeElement, '--line-clamp', this.maxRows, 2);
    } else {
      this._renderer.setStyle(this._elementRef.nativeElement, '--line-clamp', 'inherit', 2);
    }
  }
}
