import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    DestroyRef,
    ElementRef,
    EventEmitter,
    inject,
    input,
    OnChanges,
    OnInit,
    Output,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { applyCssClass, CssClassBuilder, Nullable } from '@fundamental-ngx/cdk/utils';
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
    standalone: true,
    host: {
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-labelledby]': 'ariaLabelledBy() || (id() + "-hidden-text " + id() + "-content-text")',
        '[style.width]': 'width()',
        '[style.min-width]': 'minWidth()',
        '[style.margin-bottom]': 'marginBottom()',
        '[attr.id]': 'id()',
        '[class.fd-message-strip--link]': '_hasProjectedLink$()',
        '[class.fd-message-strip--no-icon]': 'noIcon()',
        '[class.fd-message-strip--dismissible]': 'dismissible()',
        role: 'note'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, ContentDensityDirective, I18nModule, NgTemplateOutlet, IconComponent, AsyncPipe]
})
export class MessageStripComponent implements OnInit, OnChanges, CssClassBuilder, AfterContentInit {
    /** Event fired when the message-strip is dismissed. */
    @Output() // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onDismiss: EventEmitter<void> = new EventEmitter<void>();

    /** Custom icon component */
    @ContentChild(MessageStripIconDirective)
    icon: MessageStripIconDirective;

    /** User's custom classes */
    class = input<string | undefined>('');

    /** Whether the message strip is dismissible. */
    dismissible = input(true, { transform: booleanAttribute });

    /** Id of the element that labels the message-strip. */
    ariaLabelledBy = input<Nullable<string>>();

    /** Title for dismiss button */
    dismissBtnTitle = input<string>();

    /** The default message strip does not have an icon.
     * The other types (warning, success, information and error) have icons by default.
     * To remove the icon set the property to true.
     */
    noIcon = input(false, { transform: booleanAttribute });

    /** The type of the message strip.
     * Can be one of *warning*, *success*, *information*, *error* or null.
     */
    type = input<MessageStripType>(null);

    /** Id for the message-strip component. If omitted, a unique one is generated. */
    id = input<string>('fd-message-strip-' + messageStripUniqueId++);

    /** Aria label for the message-strip component element. */
    ariaLabel = input<Nullable<string>>();

    /** Width of the message-strip. */
    width = input<string>();

    /** Minimum width of the message-strip. */
    minWidth = input<string>();

    /** Margin bottom of the message-strip. */
    marginBottom = input<string>();

    /** indication color of the message-strip. */
    indicationColor = input<MessageStripIndicationColor>();

    /** message strip information read by screen readers */
    messageStripHiddenText$: Observable<string>;

    /** default dismiss button text read by screen readers */
    defaultDismissButtonText$: Observable<string>;

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _lang$ = inject(FD_LANGUAGE);

    /** @hidden */
    private _translationResolver = inject(TranslationResolver);

    /** @hidden */
    private _hasProjectedLink$ = signal<boolean>(false);

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-message-strip',
            this.type() ? `fd-message-strip--${this.type()}` : '',
            this.dismissible() ? 'fd-message-strip--dismissible' : '',
            this.noIcon() ? 'fd-message-strip--no-icon' : '',
            this.indicationColor() ? `fd-message-strip--indication-color-${this.indicationColor()}` : '',
            this.class() ?? ''
        ];
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this.setScreenReaderTexts();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        // Check for projected <a> elements
        this._hasProjectedLink$.set(!!this.elementRef.nativeElement.querySelector('a'));
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** Whether icon container should be shown */
    get shouldShowIcon(): boolean {
        if (this.noIcon()) {
            return false;
        }
        return !!this.icon || !!this.type();
    }

    /** @hidden */
    get typeSpecificIconName(): string {
        switch (this.type()) {
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
    }

    /**
     * Dismisses the message-strip.
     */
    dismiss(): void {
        this.elementRef.nativeElement.classList.add('fd-has-display-none');
        this.onDismiss.emit();
    }

    /** Sets screen reader texts for message strip type announcement and dismiss button */
    private setScreenReaderTexts(): void {
        const announcementMap: Record<MessageStripTypeEnum, MessageStripAnnouncementType> = {
            [MessageStripTypeEnum.WARNING]: MessageStripAnnouncement.WARNING,
            [MessageStripTypeEnum.SUCCESS]: MessageStripAnnouncement.SUCCESS,
            [MessageStripTypeEnum.ERROR]: MessageStripAnnouncement.ERROR,
            [MessageStripTypeEnum.INFORMATION]: MessageStripAnnouncement.INFORMATION,
            [MessageStripTypeEnum.DEFAULT]: MessageStripAnnouncement.DEFAULT
        };

        const announcementType = announcementMap[this.type() ?? MessageStripTypeEnum.DEFAULT];

        if (announcementType) {
            const announcement$ = this._translateAnnouncement(announcementType);
            this.messageStripHiddenText$ = this._buildMessageStripHiddenText(announcement$);
            this.defaultDismissButtonText$ = this._getHiddenButtonText(announcement$);
        } else {
            this.messageStripHiddenText$ = of(DEFAULT_HIDDEN_TEXT);
            this.defaultDismissButtonText$ = of(DEFAULT_DISMISS_BUTTON_TEXT);
        }
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
