import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation,
    EventEmitter,
    Output,
    AfterViewInit,
    ChangeDetectorRef,
    ViewChild
} from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';

let messageStripUniqueId = 0;

/**
 * The component that represents a message-strip. It can only be used inline.
 */
@Component({
    selector: 'fd-message-strip',
    templateUrl: './message-strip.component.html',
    styleUrls: ['./message-strip.component.scss'],
    host: {
        '[style.width]': 'width',
        '[style.min-width]': 'minWidth',
        '[style.margin-bottom]': 'marginBottom',
        '[attr.id]': 'id'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageStripComponent implements OnInit, AfterViewInit, OnChanges, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class = '';

    /** Whether the message strip is dismissible. */
    @Input()
    dismissible = true;

    /** The default message strip does not have an icon.
     * The other types (warning, success, information and error) have icons by default.
     * To remove the icon set the property to true.
     */
    @Input()
    noIcon = false;

    /** The type of the message strip.
     * Can be one of *warning*, *success*, *information*, *error* or null.
     */
    @Input()
    type: string;

    /** Id for the message-strip component. If omitted, a unique one is generated. */
    @Input()
    id: string = 'fd-message-strip-' + messageStripUniqueId++;

    /** Id of the element that labels the message-strip. */
    @Input()
    ariaLabelledBy: string = null;

    /** Aria label for the message-strip component element. If not specified, it will be set to the content. */
    @Input()
    ariaLabel: string = null;

    /** Aria label for the dismiss button. */
    @Input()
    dismissLabel = 'Close';

    /** Width of the message-strip. */
    @Input()
    width: string;

    /** Minimum width of the message-strip. */
    @Input()
    minWidth: string;

    /** Margin bottom of the message-strip. */
    @Input()
    marginBottom: string;

    /** Event fired when the message-strip is dismissed. */
    @Output()
    onDismiss: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden */
    @ViewChild('messageStripContent', { read: ElementRef })
    private _messageStripContent: ElementRef;

    /** @hidden */
    constructor(private _cd: ChangeDetectorRef, private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.ariaLabel) {
            this._elementRef.nativeElement.setAttribute('aria-label', this.ariaLabel);
        } else {
            this._elementRef.nativeElement.setAttribute('aria-label', this._getMessage());
        }
        this._cd.detectChanges();
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /**
     * Dismisses the message-strip.
     */
    dismiss(): void {
        this._elementRef.nativeElement.classList.add('fd-has-display-none');
        this._elementRef.nativeElement.classList.remove('fd-has-display-block');
        this.onDismiss.emit();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-message-strip',
            this.type ? `fd-message-strip--${this.type}` : '',
            this.dismissible ? 'fd-message-strip--dismissible' : '',
            this.noIcon ? 'fd-message-strip--no-icon' : '',
            this.class
        ];
    }

    /**
     * @hidden
     * get the message that screen reader should speak when icons or types are present
     */
    _getMessage(): string {
        let message = '';
        if (!this.type) {
            message = 'Message Strip normal' + (this.dismissible ? ' closeable' : '') + '.';
        } else if (this.type && this.noIcon) {
            message = 'Message Strip ' + this.type + (this.dismissible ? ' closeable' : '') + '.';
        } else {
            message =
                'Message Strip ' + this.type + (this.dismissible ? ' closeable' : '') + ' with ' + this.type + ' icon.';
        }
        // also read the text
        message += this._messageStripContent.nativeElement.innerText;
        if (this.dismissible) {
            message +=
                ' Message Strip ' +
                this.dismissLabel +
                ' information bar. ' +
                (this.type ? this.type : 'Normal') +
                ' Message Strip button.';
        }
        return message;
    }
}
