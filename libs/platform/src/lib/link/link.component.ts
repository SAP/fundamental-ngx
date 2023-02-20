import {
    AfterViewInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    ElementRef,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
    Renderer2
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { FD_ICON_COMPONENT, IconComponent } from '@fundamental-ngx/core/icon';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

export type LinkType = 'standard' | 'emphasized' | 'subtle';
export type NavigationTarget = '_blank' | '_self' | '_parent' | '_top' | 'framename';
const VALID_INPUT_TYPES = ['standard', 'emphasized', 'subtle'];

@Component({
    selector: 'fdp-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class LinkComponent extends BaseComponent implements OnInit, AfterViewInit {
    /**
     * href value to Navigate to. sets href to Native anchor.
     */
    @Input()
    href: Nullable<string>;

    /**
     * target where navigation will happen, Default=same frame
     * sets target to Native anchor.
     */
    @Input()
    target?: NavigationTarget;

    /** linktype of link, options standard or Emphasized, Default=standard */
    @Input()
    linkType?: LinkType = 'standard';

    /**
     * type of link. possible values text|application|audio|font|example|image|message|model|multipart|video.
     * sets type to Native anchor.
     */
    @Input()
    type = 'text';

    /**
     * sets inverted property.
     */
    @Input()
    set inverted(value: boolean) {
        this._inverted = coerceBooleanProperty(value);
    }
    get inverted(): boolean {
        return this._inverted;
    }

    /**
     * Tooltip text to show when focused for more than  timeout value
     * sets title to Native anchor.
     * */
    @Input()
    title?: string;

    /**
     * Specifies the language of the linked document.
     * sets language to Native anchor.
     */
    @Input()
    hreflang?: string;

    /** Specifies that the target will be downloaded when a user clicks on the hyperlink
     * sets download property to Native anchor.
     */
    @Input()
    download?: string;

    /** Specifies what media/device the linked document is optimized for
     * sets media property to Native anchor.
     */
    @Input()
    media?: string;

    /** Specifies the relationship between the current document and the linked document
     * sets relation property to Native anchor.
     */
    @Input()
    rel?: string;

    /**
     * If text is overlapping. By setting truncate to true, overlapping can be hidden with using ellipsis
     */
    @Input()
    truncate = false;

    /** Emitting link click event */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-native
    click: EventEmitter<MouseEvent | KeyboardEvent | TouchEvent> = new EventEmitter();

    /** @hidden */
    @ContentChild(FD_ICON_COMPONENT)
    icon: IconComponent;

    /** Access child element, for checking link content*/
    @ViewChild('link', { read: ElementRef })
    anchor: ElementRef;

    /** @hidden */
    emphasized = false;
    /** @hidden */
    subtle = false;
    /** @hidden */
    private _inverted = false;

    /** @hidden */
    constructor(protected _cd: ChangeDetectorRef, private renderer2: Renderer2) {
        super(_cd);
    }

    /** @hidden */
    ngOnInit(): void {
        /* if link disabled, for Avoiding tab focus and click. marking href undefined. */
        if (this.disabled) {
            this.href = null;
        }

        /* If link linkType===emphasized then make link emphasized type */
        this.emphasized = this.linkType === VALID_INPUT_TYPES[1];
        this.subtle = this.linkType === VALID_INPUT_TYPES[2];

        /* if link type not supported, throw Error */
        if (this.linkType && VALID_INPUT_TYPES.indexOf(this.linkType) === -1) {
            throw new Error(`fdp-link type ${this.linkType} is not supported`);
        }
    }

    /** @hidden Throw error for blank text/icon link */
    ngAfterViewInit(): void {
        if (!this.anchor.nativeElement.innerHTML) {
            throw new Error('Mandatory text/icon for fdp-link missing');
        }
    }

    /**
     * Puts underline on Icon
     * @param event: MouseEvent
     */
    onMouseEnter(event: MouseEvent): void {
        event.stopPropagation();
        if (this.icon) {
            this.renderer2.setStyle(this.icon.elementRef().nativeElement, 'text-decoration', 'underline');
        }
    }

    /**
     * Removes underline on Icon
     * @param event: MouseEvent
     */
    onMouseLeave(event: MouseEvent): void {
        event.stopPropagation();
        if (this.icon) {
            this.renderer2.setStyle(this.icon.elementRef().nativeElement, 'text-decoration', 'none');
        }
    }

    /** raising click event */
    public clicked(event: MouseEvent | KeyboardEvent | TouchEvent): void {
        event.stopPropagation();
        this.click.emit(event);
    }
}
