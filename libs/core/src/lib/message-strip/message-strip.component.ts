import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

let messageStripUniqueId: number = 0;

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
        'role': 'alert',
        '[attr.id]': 'id',
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageStripComponent implements OnInit, OnChanges, CssClassBuilder {

    /** user's custom classes */
    private _class: string = '';
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** Whether the message strip is dismissible. */
    private _dismissible: boolean = true;
    @Input()
    set dismissible(dismissible: boolean) {
        this._dismissible = dismissible;
        this.buildComponentCssClass();
    }

    get dismissible(): boolean {
        return this._dismissible;
    }

    /** The default message strip does not have an icon. 
     * The other types (warning, success, information and error) have icons by default. 
     * To remove the icon set the property to true. */
    private _noIcon: boolean = false;
    @Input()
    set noIcon(noIcon: boolean) {
        this._noIcon = noIcon;
        this.buildComponentCssClass();
    }

    /** The type of the message strip. Can be one of *warning*, *success*, *information*, *error* or null. */
    private _type: string;
    @Input()
    set type(type: string) {
        this._type = type;
        this.buildComponentCssClass();
    }

    /** Id for the message-strip component. If omitted, a unique one is generated. */
    private _id: string = 'fd-message-strip-' + messageStripUniqueId++;
    @Input()
    set id(id: string) {
        this._id = id;
        this.buildComponentCssClass();
    }

    get id(): string {
        return this._id;
    }

    /** Id of the element that labels the message-strip. */
    private _ariaLabelledBy: string = null;
    @Input()
    set ariaLabelledBy(ariaLabelledBy: string) {
        this._ariaLabelledBy = ariaLabelledBy;
        this.buildComponentCssClass();
    }

    get ariaLabelledBy(): string {
        return this._ariaLabelledBy;
    }

    /** Aria label for the message-strip component element. */
    private _ariaLabel: string = null;
    @Input()
    set ariaLabel(ariaLabel: string) {
        this._ariaLabel = ariaLabel;
        this.buildComponentCssClass();
    }

    get ariaLabel(): string {
        return this._ariaLabel;
    }

    /** Aria label for the dismiss button. */
    private _dismissLabel: string = 'Dismiss';
    @Input()
    set dismissLabel(dismissLabel: string) {
        this._dismissLabel = dismissLabel;
        this.buildComponentCssClass();
    }

    get dismissLabel(): string {
        return this._dismissLabel;
    }

    /** Width of the message-strip. */
    private _width: string;
    @Input()
    set width(width: string) {
        this._width = width;
        this.buildComponentCssClass();
    }

    get width(): string {
        return this._width;
    }

    /** Minimum width of the message-strip. */
    private _minWidth: string;
    @Input()
    set minWidth(minWidth: string) {
        this._minWidth = minWidth;
        this.buildComponentCssClass();
    }

    get minWidth(): string {
        return this._minWidth;
    }

    /** Alternative way of passing in a message to the message-strip. */
    private _message: string;
    @Input()
    set message(message: string) {
        this._message = message;
        this.buildComponentCssClass();
    }

    get message(): string {
        return this._message;
    }

    /** Event fired when the message-strip is dismissed. */
    @Output()
    onDismiss: EventEmitter<undefined> = new EventEmitter<undefined>();

    /** @hidden */
    constructor(private _elementRef: ElementRef) { }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
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
    buildComponentCssClass(): string {
        return [
            'fd-message-strip',
            this._type ? `fd-message-strip--${this._type}` : '',
            this._dismissible ? 'fd-message-strip--dismissible' : '',
            this._noIcon ? 'fd-message-strip--no-icon' : '',
            this._class
        ].filter(x => x !== '').join(' ');
    }

}
