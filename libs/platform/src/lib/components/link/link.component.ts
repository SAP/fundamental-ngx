import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    AfterViewInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export type LinkType = 'standard' | 'emphasized';
export type NavigationTarget = '_blank' | '_self' | '_parent' | '_top' | 'framename';
const VALID_INPUT_TYPES = ['standard', 'emphasized'];
const VALID_TARGET_TYPES = ['_blank', '_self', '_parent', '_top', 'framename'];
const timeout: number = 1000;

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

    @ViewChild('link', { static: false }) anchor: ElementRef;

    @Input() id?: string;

    @Input() href: string;

    @Input() target?: NavigationTarget = '_self';

    @Input()
    type: LinkType = 'standard';

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }

    @Input()
    get inverted(): boolean {
        return this._inverted;
    }

    set inverted(value: boolean) {
        this._inverted = coerceBooleanProperty(value);
    }

    @Input()
    get wrap(): boolean {
        return this._wrap;
    }

    set wrap(value: boolean) {
        this._wrap = coerceBooleanProperty(value);
    }

    @Input() toolTipText?: string;

    /** Option to truncate content of the button based on width. */
    @Input()
    width: string;

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

        if (this.target && VALID_TARGET_TYPES.indexOf(this.target) === -1) {
            throw new Error(`fdp-link target ${this.type} is not supported`);
        }
    }

    onFocusEvent() {
        this.isfocused = true;
        setTimeout(() => {
            if (this.isfocused) {
                this.tooltipVisibility = true;
                this.cd.detectChanges();
            }
        }, timeout);
    }

    onFocusOutEvent() {
        this.isfocused = false;
        this.tooltipVisibility = false;
        this.cd.detectChanges();
    }

    ngAfterViewInit() {
        console.log('this.anchor.nativeElement: ' + this.anchor.nativeElement.textContent.length);
        if (this.anchor.nativeElement.textContent.length === 0) {
            throw new Error('Mandatory text for fdp-link missing');
        }
    }
}
