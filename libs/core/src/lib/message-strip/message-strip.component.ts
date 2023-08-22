import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, CssClassBuilder, Nullable } from '@fundamental-ngx/cdk/utils';
import { I18nModule } from '@fundamental-ngx/i18n';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MessageStripType } from './message-strip-type';
import { MessageStripIndicationColor } from './message-strip-indication-color';
import { MessageStripIconDirective } from './message-strip-icon.directive';
import { IconModule } from '@fundamental-ngx/core/icon';

let messageStripUniqueId = 0;

/**
 * The component that represents a message-strip. It can only be used inline.
 */
@Component({
    selector: 'fd-message-strip',
    templateUrl: './message-strip.component.html',
    styleUrls: ['./message-strip.component.scss'],
    host: {
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-label]': 'ariaLabel',
        '[style.width]': 'width',
        '[style.min-width]': 'minWidth',
        '[style.margin-bottom]': 'marginBottom',
        role: 'alert',
        '[attr.id]': 'id'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, ButtonModule, ContentDensityDirective, I18nModule, NgTemplateOutlet, IconModule]
})
export class MessageStripComponent implements OnInit, OnChanges, CssClassBuilder {
    /** User's custom classes */
    @Input() class = '';

    /** Whether the message strip is dismissible. */
    @Input() dismissible = true;

    /** The default message strip does not have an icon.
     * The other types (warning, success, information and error) have icons by default.
     * To remove the icon set the property to true.
     */
    @Input() noIcon = false;

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

    /** Custom icon component */
    @ContentChild(MessageStripIconDirective)
    icon: MessageStripIconDirective;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
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
            case 'warning':
                return 'alert';
            case 'success':
                return 'sys-enter-2';
            case 'error':
                return 'error';
            case 'information':
                return 'information';
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
}
