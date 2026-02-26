import { BooleanInput } from '@angular/cdk/coercion';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    DestroyRef,
    effect,
    ElementRef,
    inject,
    input,
    output,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { FD_LANGUAGE, FdLanguage, I18nModule, TranslationResolver } from '@fundamental-ngx/i18n';
import { map, of, withLatestFrom } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { MessageStripIconDirective } from './message-strip-icon.directive';
import { MessageStripIndicationColor } from './message-strip-indication-color';
import { MessageStripType } from './message-strip-type';
import {
    DEFAULT_DISMISS_BUTTON_TEXT,
    DEFAULT_HIDDEN_TEXT,
    MESSAGE_STRIP_CLOSABLE,
    MESSAGE_STRIP_DEFAULT_DISMISS_BUTTON_TEXT,
    MessageStringIconEnum,
    MessageStripAnnouncement,
    MessageStripAnnouncementType,
    MessageStripTypeEnum
} from './message-strip.enum';

let messageStripUniqueId = 0;

/**
 * The component that represents a message-strip. It can only be used inline.
 */
@Component({
    selector: 'fd-message-strip',
    templateUrl: './message-strip.component.html',
    styleUrl: './message-strip.component.scss',
    host: {
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-labelledby]': 'hostAriaLabelledBy()',
        '[attr.id]': 'id()',
        '[style.width]': 'width()',
        '[style.min-width]': 'minWidth()',
        '[style.margin-bottom]': 'marginBottom()',
        '[class]': 'cssClass()',
        role: 'note'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, ContentDensityDirective, I18nModule, NgTemplateOutlet, IconComponent, AsyncPipe]
})
export class MessageStripComponent {
    /** Whether the message strip is dismissible. */
    readonly dismissible = input<boolean, BooleanInput>(true, { transform: booleanAttribute });

    /** Id of the element that labels the message-strip. */
    readonly ariaLabelledBy = input<string | undefined | null>(null);

    /** Title for dismiss button */
    readonly dismissBtnTitle = input('');

    /** The default message strip does not have an icon.
     * The other types (warning, success, information and error) have icons by default.
     * To remove the icon set the property to true.
     */
    readonly noIcon = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /** The type of the message strip.
     * Can be one of *warning*, *success*, *information*, *error* or null.
     */
    readonly type = input<MessageStripType>();

    /** Id for the message-strip component. If omitted, a unique one is generated. */
    readonly id = input('', { transform: (value: string) => value || `fd-message-strip-${++messageStripUniqueId}` });

    /** Aria label for the message-strip component element. */
    readonly ariaLabel = input<string | undefined | null>(null);

    /** Width of the message-strip. */
    readonly width = input('');

    /** Minimum width of the message-strip. */
    readonly minWidth = input('');

    /** Margin bottom of the message-strip. */
    readonly marginBottom = input('');

    /** indication color of the message-strip. */
    readonly indicationColor = input<MessageStripIndicationColor>();

    /** Event fired when the message-strip is dismissed. */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onDismiss = output<void>();

    /** Custom icon component */
    readonly icon = contentChild(MessageStripIconDirective);

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /**
     * Computed aria-labelledby attribute.
     * @hidden
     */
    protected readonly hostAriaLabelledBy = computed(() => {
        const labelledBy = this.ariaLabelledBy();

        if (labelledBy) {
            return labelledBy;
        }

        const currentId = this.id();

        return `${currentId}-hidden-text ${currentId}-content-text`;
    });

    /**
     * Computed CSS class string for the component.
     * @hidden
     */
    protected readonly cssClass = computed(() => {
        const classes = ['fd-message-strip'];
        const currentType = this.type();
        const currentIndicationColor = this.indicationColor();

        if (currentType) {
            classes.push(`fd-message-strip--${currentType}`);
        }
        if (this.dismissible()) {
            classes.push('fd-message-strip--dismissible');
        }
        if (this.noIcon()) {
            classes.push('fd-message-strip--no-icon');
        }
        if (currentIndicationColor) {
            classes.push(`fd-message-strip--indication-color-${currentIndicationColor}`);
        }

        return classes.join(' ');
    });

    /**
     * Whether icon container should be shown.
     * @hidden
     */
    protected readonly shouldShowIcon = computed(() => {
        if (this.noIcon()) {
            return false;
        }
        return !!this.icon() || !!this.type();
    });

    /**
     * Type-specific icon name.
     * @hidden
     */
    protected readonly typeSpecificIconName = computed(() => {
        const currentType = this.type();
        switch (currentType) {
            case MessageStripTypeEnum.WARNING:
                return MessageStringIconEnum.ALERT;
            case MessageStripTypeEnum.SUCCESS:
                return MessageStringIconEnum.SUCCESS;
            case MessageStripTypeEnum.ERROR:
                return MessageStringIconEnum.ERROR;
            case MessageStripTypeEnum.INFORMATION:
                return MessageStringIconEnum.INFORMATION;
            default:
                return '';
        }
    });

    /** message strip information read by screen readers */
    protected messageStripHiddenText$: Observable<string>;

    /** default dismiss button text read by screen readers */
    protected defaultDismissButtonText$: Observable<string>;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _lang$ = inject(FD_LANGUAGE);

    /** @hidden */
    private readonly _translationResolver = inject(TranslationResolver);

    /** @hidden */
    constructor() {
        // Initialize with defaults
        this.messageStripHiddenText$ = of(DEFAULT_HIDDEN_TEXT);
        this.defaultDismissButtonText$ = of(DEFAULT_DISMISS_BUTTON_TEXT);

        // Update when type changes
        effect(() => {
            const currentType = this.type();
            if (!currentType) {
                this.messageStripHiddenText$ = of(DEFAULT_HIDDEN_TEXT);
                this.defaultDismissButtonText$ = of(DEFAULT_DISMISS_BUTTON_TEXT);
                return;
            }

            const announcementMap: Record<MessageStripTypeEnum, MessageStripAnnouncementType> = {
                [MessageStripTypeEnum.WARNING]: MessageStripAnnouncement.WARNING,
                [MessageStripTypeEnum.SUCCESS]: MessageStripAnnouncement.SUCCESS,
                [MessageStripTypeEnum.ERROR]: MessageStripAnnouncement.ERROR,
                [MessageStripTypeEnum.INFORMATION]: MessageStripAnnouncement.INFORMATION
            };

            const announcementType = announcementMap[currentType];

            if (announcementType) {
                const announcement$ = this._translateAnnouncement(announcementType);
                this.messageStripHiddenText$ = this._buildMessageStripHiddenText(announcement$);
                this.defaultDismissButtonText$ = this._getHiddenButtonText(announcement$);
            } else {
                this.messageStripHiddenText$ = of(DEFAULT_HIDDEN_TEXT);
                this.defaultDismissButtonText$ = of(DEFAULT_DISMISS_BUTTON_TEXT);
            }
        });
    }

    /**
     * Dismisses the message-strip.
     */
    dismiss(): void {
        this.elementRef.nativeElement.classList.add('fd-has-display-none');
        this.elementRef.nativeElement.classList.remove('fd-has-display-block');
        this.onDismiss.emit();
    }

    /** @hidden */
    private _translateAnnouncement(announcementType: MessageStripAnnouncementType): Observable<string> {
        return this._lang$.pipe(
            takeUntilDestroyed(this._destroyRef),
            map((lang: FdLanguage) => this._translationResolver.resolve(lang, announcementType))
        );
    }

    /** @hidden */
    private _buildMessageStripHiddenText(announcement$: Observable<string>): Observable<string> {
        return this._lang$.pipe(
            takeUntilDestroyed(this._destroyRef),
            withLatestFrom(announcement$),
            map(([lang, announcement]: [FdLanguage, string]) => {
                const closable = this._translationResolver.resolve(lang, MESSAGE_STRIP_CLOSABLE);
                return `${announcement} ${this.dismissible() ? closable : ''}`;
            })
        );
    }

    /** @hidden **/
    private _getHiddenButtonText(announcement$: Observable<string>): Observable<string> {
        return this._lang$.pipe(
            takeUntilDestroyed(this._destroyRef),
            withLatestFrom(announcement$),
            map(([lang, announcement]: [FdLanguage, string]) => {
                const closeButtonText = this._translationResolver.resolve(
                    lang,
                    MESSAGE_STRIP_DEFAULT_DISMISS_BUTTON_TEXT
                );
                return `${announcement} ${closeButtonText}`;
            })
        );
    }
}
