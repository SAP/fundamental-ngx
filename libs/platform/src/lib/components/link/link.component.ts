import {
    AfterViewInit,
    Component,
    ChangeDetectionStrategy,
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

@Component({
    selector: 'fdp-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent implements OnInit, AfterViewInit {
    emphasized: boolean = false;
    isfocused: boolean = false;

    /** Access child element, for checking link content*/
    @ViewChild('link', { read: ElementRef, static: false })
    anchor: ElementRef;

    /** Id for the link */
    @Input()
    id?: string;

    /** href value to Navigate to */
    @Input()
    href: string;

    /** target where navigation will happen, Default=same frame */
    @Input()
    target?: NavigationTarget = '_self';

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

    /** Tooltip text to show when focused for more than  timeout value*/
    @Input()
    title?: string;

    /** Emitting link click event */
    @Output()
    click: EventEmitter<any> = new EventEmitter();

    private _disabled: boolean = false;
    private _inverted: boolean = false;

    clicked(event: any) {
        this.click.emit(event);
    }

    constructor() {}

    ngOnInit() {
        /* if link disabled, for Avoiding tab focus and click. marking href undefined. */
        if (this.disabled) {
            this.href = undefined;
        }

        /* If link type===emphasized then make link emphasized type */
        if (this.type === VALID_INPUT_TYPES[1]) {
            this.emphasized = true;
        }

        /* if link type not supported, throw Error */
        if (this.type && VALID_INPUT_TYPES.indexOf(this.type) === -1) {
            throw new Error(`fdp-link type ${this.type} is not supported`);
        }
    }

    /** Throw error for blank text/icon link */
    ngAfterViewInit() {
        if (!this.anchor.nativeElement.innerHTML) {
            throw new Error('Mandatory text/icon for fdp-link missing');
        }
    }
}
