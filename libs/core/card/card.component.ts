import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    ViewEncapsulation,
    computed,
    contentChild,
    forwardRef,
    inject,
    input,
    model,
    output
} from '@angular/core';
import { ColorAccent, HasElementRef } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { ObjectStatus, ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { CardFocusItem } from './card-focus-item.model';
import { CardType } from './constants';
import { CardCounterDirective } from './header-elements/card-counter.directive';
import { CardSubtitleDirective } from './header-elements/card-subtitle.directive';
import { CardTitleDirective } from './header-elements/card-title.directive';
import { CardMediaHeadingDirective } from './media/card-media-heading.directive';
import { FD_CARD, FD_CARD_COUNTER, FD_CARD_MEDIA_HEADING, FD_CARD_SUBTITLE, FD_CARD_TITLE } from './token';

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
        '[class]': 'cssClass()',
        '[attr.id]': 'id()',
        '[attr.role]': 'role()',
        '[attr.aria-labelledby]': 'cardTitle()?.id() || cardMediaHeading()?.id()',
        '[attr.aria-describedby]': 'ariaDescribedbyComputed()',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-selected]': 'selected()',
        '[tabindex]': 'role() === "listitem" ? 0 : -1',
        '[attr.aria-posinset]': 'role() === "listitem" ? ariaPosinset() : null',
        '[attr.aria-setsize]': 'role() === "listitem" ? ariaSetsize() : null'
    }
})
export class CardComponent<T = any> extends CardFocusItem<T> implements HasElementRef {
    /** @hidden */
    cardTitle = contentChild<CardTitleDirective>(FD_CARD_TITLE);

    /** @hidden */
    cardSubtitle = contentChild<CardSubtitleDirective>(FD_CARD_SUBTITLE);

    /** @hidden */
    cardCounter = contentChild<CardCounterDirective>(FD_CARD_COUNTER);

    /** @hidden */
    cardMediaHeading = contentChild<CardMediaHeadingDirective>(FD_CARD_MEDIA_HEADING);

    /**
     * text for the card badge
     */
    badge = input<string | null | undefined>();

    /**
     * icon/glyph for the card badge
     */
    badgeIcon = input<string | null | undefined>();

    /**
     * Indication color for the card badge
     * Possible values: integers from 1 to 10
     */
    badgeColor = input<ColorAccent | null | undefined>();

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
    badgeStatus = input<ObjectStatus | null | undefined>();

    /**
     * aria-label for the card badge
     * Default value: null
     */
    badgeAriaLabel = input<string | null | undefined>();

    /**
     * text for the card second badge
     */
    secondBadge = input<string | null | undefined>();

    /**
     * icon/glyph for the card second badge
     */
    secondBadgeIcon = input<string | null | undefined>();

    /**
     * Indication color for the card second badge
     * Possible values: integers from 1 to 10
     */
    secondBadgeColor = input<ColorAccent | null | undefined>();

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
    secondBadgeStatus = input<ObjectStatus | null | undefined>();

    /**
     * aria-label for the card second badge
     * Default value: null
     */
    secondBadgeAriaLabel = input<string | null | undefined>();

    /**
     * whether the card is in loading state
     * default: false
     */
    isLoading = input(false);

    /**
     * set the Card type
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
    ariaRoledescription = input<string | null | undefined>();

    /**
     * card aria-description
     * default: 'Active, Press Enter to activate'
     */
    ariaDescription = input('Active, Press Enter to activate');

    /**
     * card aria-label
     * used when there's no title describing the card
     */
    ariaLabel = input<string | null | undefined>();

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
    ariaPosinset = model<number | null | undefined>();

    /**
     * value for aria-setsize
     */
    ariaSetsize = model<number | null | undefined>();

    /**
     * Additional IDs to include in aria-describedby attribute
     * Can be used to reference additional descriptive content
     */
    ariaDescribedby = input<string | null | undefined>();

    /**
     * @hidden
     * Implementation of KeyboardSupportItemInterface
     */
    readonly keyDown = output<KeyboardEvent>();

    /** @hidden */
    readonly contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /** @hidden */
    class: string;

    /** @hidden ID for the visually hidden span announcing the card  description */
    protected readonly ariaDescriptionId = computed(() => `${this.id()}-description`);

    /** @hidden ID for the visually hidden span announcing the card  role description */
    protected readonly ariaRoleDescriptionId = computed(() => `${this.id()}-role-description`);

    /** @hidden Badge ID for first badge */
    protected readonly badgeId = computed(() => (this.badge() || this.badgeIcon() ? `${this.id()}-badge` : null));

    /** @hidden Second badge ID */
    protected readonly secondBadgeId = computed(() =>
        this.secondBadge() || this.secondBadgeIcon() ? `${this.id()}-second-badge` : null
    );

    /** @hidden Computed aria-describedby value */
    protected readonly ariaDescribedbyComputed = computed(() => {
        const ids: string[] = [];

        // Add subtitle ID if they exist
        if (this.cardSubtitle()) {
            ids.push(this.cardSubtitle()!.id());
        }

        // Add counter ID if it exists
        if (this.cardCounter()) {
            ids.push(this.cardCounter()!.id());
        }

        // Add role description ID for screen readers to announce card type and role description
        ids.push(this.ariaRoleDescriptionId());

        // Add description ID if role is listitem
        if (this.role() === 'listitem') {
            ids.push(this.ariaDescriptionId());
        }

        // Add badge IDs if badges are present
        if (this.badgeId()) {
            ids.push(this.badgeId()!);
        }

        if (this.secondBadgeId()) {
            ids.push(this.secondBadgeId()!);
        }

        // Add any additional IDs provided by user
        if (this.ariaDescribedby()) {
            ids.push(this.ariaDescribedby()!);
        }

        return ids.length > 0 ? ids.join(' ') : null;
    });

    protected readonly cssClass = computed(() => {
        let classes = 'fd-card';
        const cardType = this.cardType();

        if (cardType) {
            classes += ` fd-card--${cardType}`;
        }

        if (this.interactive()) {
            classes += ' fd-card--interactive';
        }

        return classes;
    });

    /** @hidden */
    constructor() {
        super();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        this.keyDown.emit(event);
    }
}
