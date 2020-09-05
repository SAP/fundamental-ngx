/**
 * @license
 * SAP
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 */
import {
    AfterViewInit,
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    EventEmitter,
    ElementRef,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BaseComponent } from '../base';

export type LinkType = 'standard' | 'emphasized';
export type NavigationTarget = '_blank' | '_self' | '_parent' | '_top' | 'framename';
const VALID_INPUT_TYPES = ['standard', 'emphasized'];

/**
 * Platform Link implementation based on the
 * https://github.com/SAP/fundamental-ngx/wiki/Platform:-Link-Component-Technical-Design
 * documents.
 *
 */
@Component({
    selector: 'fdp-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent extends BaseComponent implements OnInit, AfterViewInit {
    emphasized = false;
    isfocused = false;

    /** Access child element, for checking link content*/
    @ViewChild('link', { read: ElementRef })
    anchor: ElementRef;

    /**
     * href value to Navigate to. sets href to NATIVE anchor.
     */
    @Input()
    href: string;

    /**
     * target where navigation will happen, Default=same frame
     * sets target to NATIVE anchor.
     */
    @Input()
    target?: NavigationTarget;

    /** linktype of link, options standard or Emphasized, Default=standard */
    @Input()
    linkType?: LinkType = 'standard';

    /**
     * type of link. possible values text|application|audio|font|example|image|message|model|multipart|video.
     * sets type to NATIVE anchor.
     */
    @Input()
    type = 'text';

    /**
     * sets inverted property.
     */
    @Input()
    get inverted(): boolean {
        return this._inverted;
    }

    /** set incase of Inverted link */
    set inverted(value: boolean) {
        this._inverted = coerceBooleanProperty(value);
    }

    /**
     * Tooltip text to show when focused for more than  timeout value
     * sets title to NATIVE anchor.
     * */
    @Input()
    title?: string;

    /**
     * Specifies the language of the linked document.
     * sets language to NATIVE anchor.
     */
    @Input()
    hreflang?: string;

    /** Specifies that the target will be downloaded when a user clicks on the hyperlink
     * sets download property to NATIVE anchor.
     */
    @Input()
    download?: string;

    /** Specifies what media/device the linked document is optimized for
     * sets media property to NATIVE anchor.
     */
    @Input()
    media?: string;

    /** Specifies the relationship between the current document and the linked document
     * sets relation property to NATIVE anchor.
     */
    @Input()
    rel?: string;

    /** Emitting link click event */
    @Output()
    click: EventEmitter<MouseEvent | KeyboardEvent | TouchEvent> = new EventEmitter();

    private _inverted = false;

    constructor(protected _cd: ChangeDetectorRef) {
        super(_cd);
    }

    /** @hidden */
    ngOnInit(): void {
        /* if link disabled, for Avoiding tab focus and click. marking href undefined. */
        if (this.disabled) {
            this.href = undefined;
        }

        /* If link linkType===emphasized then make link emphasized type */
        if (this.linkType === VALID_INPUT_TYPES[1]) {
            this.emphasized = true;
        }

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

    /** raising click event */
    public clicked(event: MouseEvent | KeyboardEvent | TouchEvent): void {
        event.stopPropagation();
        this.click.emit(event);
    }
}
