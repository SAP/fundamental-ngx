import {
    AfterViewInit,
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    EventEmitter,
    ElementRef,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export type LinkType = 'standard' | 'emphasized';
export type NavigationTarget = '_blank' | '_self' | '_parent' | '_top' | 'framename';
const VALID_INPUT_TYPES = ['standard', 'emphasized'];
const timeout: number = 1000;
/** This Timeout should be reviewed */

@Component({
    selector: 'fdp-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent implements OnInit, AfterViewInit {
    private _disabled: boolean = false;
    private _inverted: boolean = false;
    private _wrap: boolean = false;
    isEmphasized: boolean = false;
    tooltipVisibility: boolean = false;
    isfocused: boolean = false;

    /** Access child element, for checking link content*/
    @ViewChild('link', { static: false }) anchor: ElementRef;

    /** Id for the link */
    @Input() id?: string;

    /** href value to Navigate to */
    @Input() href: string;

    /** target where navigation will happen, Default=same frame */
    @Input() target?: NavigationTarget = '_self';

    /** type of link, options standard or Emphasized, Default=standard */
    @Input()
    type: LinkType = 'standard';

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    /** Link enable or disabled status */
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }

    @Input()
    get inverted(): boolean {
        return this._inverted;
    }

    /** set incase of Inverted link */
    set inverted(value: boolean) {
        this._inverted = coerceBooleanProperty(value);
    }

    @Input()
    get wrap(): boolean {
        return this._wrap;
    }

    /** For long link text more than given width, either truncate text or wrap */
    set wrap(value: boolean) {
        this._wrap = coerceBooleanProperty(value);
    }

    /** Tooltip text to show when focused for more than  timeout value*/
    @Input() toolTipText?: string;

    /** Gives option to truncate content of the link based on width. */
    @Input()
    width: string;

    /** Emitting link click event */
    @Output()
    click: EventEmitter<any> = new EventEmitter();

    clicked(event: any) {
        this.click.emit(event);
    }

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        /* if link disabled, for Avoiding tab focus and click. marking href undefined. */
        if (this.disabled) {
            this.href = undefined;
        }

        /* If link type===emphasized then make link emphasized type */
        if (this.type === VALID_INPUT_TYPES[1]) {
            this.isEmphasized = true;
        }

        /* if link type not supported, throw Error */
        if (this.type && VALID_INPUT_TYPES.indexOf(this.type) === -1) {
            throw new Error(`fdp-link type ${this.type} is not supported`);
        }
    }

    /** On link Focus, if focus for more than timeout; show Tooltip */
    onFocusEvent() {
        this.isfocused = true;
        setTimeout(() => {
            if (this.isfocused) {
                this.tooltipVisibility = true;
                this.cd.detectChanges();
            }
        }, timeout);
    }

    /** Remove Tooltip on focusOut event  */
    onFocusOutEvent() {
        this.isfocused = false;
        this.tooltipVisibility = false;
        this.cd.detectChanges();
    }

    /** Throw error for blank text link */
    ngAfterViewInit() {
        if (this.anchor.nativeElement.textContent.length === 0) {
            throw new Error('Mandatory text for fdp-link missing');
        }
    }
}
