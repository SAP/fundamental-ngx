import { BooleanInput } from '@angular/cdk/coercion';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    DestroyRef,
    ElementRef,
    EventEmitter,
    HostBinding,
    inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { applyCssClass, CssClassBuilder, Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { FD_LANGUAGE, FdLanguage, I18nModule, TranslationResolver } from '@fundamental-ngx/i18n';
import { map, of } from 'rxjs';
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
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-label]': 'ariaLabel',
        '[style.width]': 'width',
        '[style.min-width]': 'minWidth',
        '[style.margin-bottom]': 'marginBottom',
        '[attr.id]': 'id'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, ContentDensityDirective, I18nModule, NgTemplateOutlet, IconComponent, AsyncPipe]
})
export class MessageStripComponent implements OnInit, OnChanges, CssClassBuilder {
    /** User's custom classes */
    @Input() class = '';

    /** Whether the message strip is dismissible. */
    @Input({ transform: booleanAttribute })
    @HostBinding('class.fd-message-strip--dismissible')
    dismissible: BooleanInput = true;

    /** Title for dismiss button */
    @Input()
    dismissBtnTitle: string;

    /** The default message strip does not have an icon.
     * The other types (warning, success, information and error) have icons by default.
     * To remove the icon set the property to true.
     */
    @Input({ transform: booleanAttribute })
    @HostBinding('class.fd-message-strip--no-icon')
    noIcon: BooleanInput = false;

    /** The type of the message strip.
     * Can be one of *warning*, *success*, *information*, *error* or null.
     */
    @Input() type: MessageStripType;

    /** Id for the message-strip component. If omitted, a unique one is generated. */
    @Input() id: string = 'fd-message-strip-' + messageStripUniqueId++;

    /** Id of the element that labels the message-strip. */
    @Input() ariaLabelledBy: Nullable<string>;

    /** Aria label for the message-strip component element. */
    @Input() ariaLabel: Nullable<string>;

    /** Width of the message-strip. */
    @Input() width: string;

    /** Minimum width of the message-strip. */
    @Input() minWidth: string;

    /** Margin bottom of the message-strip. */
    @Input() marginBottom: string;

    /** indication color of the message-strip. */
    @Input() indicationColor: MessageStripIndicationColor;

    /** Event fired when the message-strip is dismissed. */
    @Output() // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onDismiss: EventEmitter<void> = new EventEmitter<void>();

    /** Custom icon component */
    @ContentChild(MessageStripIconDirective)
    icon: MessageStripIconDirective;

    /** message strip information read by screen readers */
    messageStripHiddenText$: Observable<string>;

    /** default dismiss button text read by screen readers */
    defaultDismissButtonText$: Observable<string>;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _lang$ = inject(FD_LANGUAGE);

    /** @hidden */
    private _translationResolver = inject(TranslationResolver);

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-message-strip',
            this.type ? `fd-message-strip--${this.type}` : '',
            this.dismissible ? 'fd-message-strip--dismissible' : '',
            this.noIcon ? 'fd-message-strip--no-icon' : '',
            this.indicationColor ? `fd-message-strip--indication-color-${this.indicationColor}` : '',
            this.class
        ];
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this.setScreenReaderTexts();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** Whether icon container should be shown */
    get shouldShowIcon(): boolean {
        if (this.noIcon) {
            return false;
        }
        return !!this.icon || !!this.type;
    }

    /** @hidden */
    get typeSpecificIconName(): string {
        switch (this.type) {
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
        this.elementRef.nativeElement.classList.remove('fd-has-display-block');
        this.onDismiss.emit();
    }

    /** Sets screen reader texts for message strip type announcement and dismiss button */
    private setScreenReaderTexts(): void {
        if (!this.type) {
            return;
        }

        switch (this.type) {
            case MessageStripTypeEnum.WARNING:
                this.messageStripHiddenText$ = this._buildMessageStripHiddenText(MessageStripAnnouncement.WARNING);
                this.defaultDismissButtonText$ = this._getDefaultHiddenButtonText(MessageStripAnnouncement.WARNING);
                break;
            case MessageStripTypeEnum.SUCCESS:
                this.messageStripHiddenText$ = this._buildMessageStripHiddenText(MessageStripAnnouncement.SUCCESS);
                this.defaultDismissButtonText$ = this._getDefaultHiddenButtonText(MessageStripAnnouncement.SUCCESS);
                break;
            case MessageStripTypeEnum.ERROR:
                this.messageStripHiddenText$ = this._buildMessageStripHiddenText(MessageStripAnnouncement.ERROR);
                this.defaultDismissButtonText$ = this._getDefaultHiddenButtonText(MessageStripAnnouncement.ERROR);
                break;
            case MessageStripTypeEnum.INFORMATION:
                this.messageStripHiddenText$ = this._buildMessageStripHiddenText(MessageStripAnnouncement.INFORMATION);
                this.defaultDismissButtonText$ = this._getDefaultHiddenButtonText(MessageStripAnnouncement.INFORMATION);
                break;
            default:
                this.messageStripHiddenText$ = of(DEFAULT_HIDDEN_TEXT);
                this.defaultDismissButtonText$ = of(DEFAULT_DISMISS_BUTTON_TEXT);
        }
    }

    /** @hidden */
    private _buildMessageStripHiddenText(type: MessageStripAnnouncementType): Observable<string> {
        return this._lang$.pipe(
            takeUntilDestroyed(this._destroyRef),
            map((lang: FdLanguage) => {
                const announcement = this._translationResolver.resolve(lang, type);
                const closable = this._translationResolver.resolve(lang, MESSAGE_STRIP_CLOSABLE);
                return `${announcement} ${this.dismissible ? closable : ''}`;
            })
        );
    }

    /** @hidden **/
    private _getDefaultHiddenButtonText(type: MessageStripAnnouncementType): Observable<string> {
        return this._lang$.pipe(
            map((lang: FdLanguage) => {
                const announcement = this._translationResolver.resolve(lang, type);
                const closeButtonText = this._translationResolver.resolve(
                    lang,
                    MESSAGE_STRIP_DEFAULT_DISMISS_BUTTON_TEXT
                );
                return `${announcement} ${closeButtonText}`;
            })
        );
    }
}
