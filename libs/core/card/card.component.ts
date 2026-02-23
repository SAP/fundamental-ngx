import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    contentChild,
    forwardRef,
    input,
    model,
    output
} from '@angular/core';
import { ColorAccent, CssClassBuilder, Nullable, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { ObjectStatus, ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { Subscription } from 'rxjs';
import { CardFocusItem } from './card-focus-item.model';
import { CLASS_NAME, CardType } from './constants';
import { CardTitleDirective } from './header-elements/card-title.directive';
import { CardMediaHeadingDirective } from './media/card-media-heading.directive';
import { FD_CARD, FD_CARD_MEDIA_HEADING, FD_CARD_TITLE } from './token';
import { getCardModifierClassNameByCardType } from './utils';

let cardId = 0;

@Component({
    selector: 'fd-card',
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        contentDensityObserverProviders(),
        {
            provide: FD_CARD,
            useExisting: forwardRef(() => CardComponent)
        },
        {
            provide: CardFocusItem,
            useExisting: forwardRef(() => CardComponent)
        }
    ],
    imports: [ObjectStatusComponent],
    host: {
        '[attr.id]': 'id()',
        '[attr.role]': 'role()',
        '[attr.aria-description]': 'role() === "listitem" ? ariaDescription() : null',
        '[attr.aria-roledescription]': 'ariaRoledescription()',
        '[attr.aria-labelledby]': 'cardTitle()?.id() || cardMediaHeading()?.id()',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-selected]': 'selected()',
        '[class.fd-card--interactive]': 'interactive()',
        '[tabindex]': 'role() === "listitem" ? 0 : -1',
        '[attr.aria-posinset]': 'role() === "listitem" ? ariaPosinset() : null',
        '[attr.aria-setsize]': 'role() === "listitem" ? ariaSetsize() : null'
    }
})
export class CardComponent<T = any> extends CardFocusItem<T> implements OnChanges, OnInit, CssClassBuilder, OnDestroy {
    /** @hidden */
    cardTitle = contentChild<CardTitleDirective>(FD_CARD_TITLE);

    /** @hidden */
    cardMediaHeading = contentChild<CardMediaHeadingDirective>(FD_CARD_MEDIA_HEADING);

    /**
     * text for the card badge
     */
    badge = input<Nullable<string>>();

    /**
     * icon/glyph for the card badge
     */
    badgeIcon = input<Nullable<string>>();

    /**
     * Indication color for the card badge
     * Possible values: integers from 1 to 10
     */
    badgeColor = input<Nullable<ColorAccent>>();

    /**
     * Whether to use secondary set of indication colors for the card badge
     * Default value: false
     */
    badgeColorSecondary = input<boolean>(false);

    /**
     * Color status for the card badge
     * Possible values: 'negative' | 'critical' | 'positive' | 'informative' | 'neutral'
     * Default value: null
     */
    badgeStatus = input<Nullable<ObjectStatus>>();

    /**
     * aria-label for the card badge
     * Default value: null
     */
    badgeAriaLabel = input<Nullable<string>>();

    /**
     * text for the card second badge
     */
    secondBadge = input<Nullable<string>>();

    /**
     * icon/glyph for the card second badge
     */
    secondBadgeIcon = input<Nullable<string>>();

    /**
     * Indication color for the card second badge
     * Possible values: integers from 1 to 10
     */
    secondBadgeColor = input<Nullable<ColorAccent>>();

    /**
     * Whether to use secondary set of indication colors for the card second badge
     * Default value: false
     */
    secondBadgeColorSecondary = input<boolean>(false);

    /**
     * Color status for the card second badge
     * Possible values: 'negative' | 'critical' | 'positive' | 'informative' | 'neutral'
     * Default value: null
     */
    secondBadgeStatus = input<Nullable<ObjectStatus>>();

    /**
     * aria-label for the card second badge
     * Default value: null
     */
    secondBadgeAriaLabel = input<Nullable<string>>();

    /**
     * whether the card is in loading state
     * default: false
     */
    isLoading = input(false);

    /**
     * set the Caard type
     * options: 'object' | 'standard' | 'component' | 'analytical' | 'list' | 'table' | 'quickView' | 'linkList' | 'banner'
     * default: 'standard'
     *
     */
    cardType = input<CardType>('standard');

    /**
     * card id
     * if not set, a default value is provided
     */
    id = input('fd-card-id-' + cardId++);

    /**
     * card aria-roledescription
     * default: 'Card'
     */
    ariaRoledescription = input('Card');

    /**
     * card aria-description
     * default: 'Activate for action or navigation'
     */
    ariaDescription = input('Activate for action or navigation');

    /**
     * card aria-label
     * used when there's no title describing the card
     */
    ariaLabel = input<Nullable<string>>();

    /**
     * card role
     * default: 'region'
     */
    role = input('region');

    /**
     * whether the card is interactive
     * default: false
     */
    interactive = input(false);

    /**
     * whether the card is selected
     * default: false
     */
    selected = input(false);

    /**
     * value for aria-posinset
     */
    ariaPosinset = model<Nullable<number>>();

    /**
     * value for aria-setsize
     */
    ariaSetsize = model<Nullable<number>>();

    /**
     * @hidden
     * Implementation of KeyboardSupportItemInterface
     */
    readonly keyDown = output<KeyboardEvent>();

    /** @hidden */
    class: string;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef<HTMLElement>,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {
        super();
        _contentDensityObserver.subscribe();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        this.keyDown.emit(event);
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.card, this.cardType() ? getCardModifierClassNameByCardType(this.cardType()) : ''];
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}
