import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ChangeDetectionStrategy,
    ElementRef,
    EventEmitter,
    ViewChild,
    Renderer2
} from '@angular/core';
import { Input, Output, OnInit, OnDestroy, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { ButtonType, RtlService } from '@fundamental-ngx/core';
import { MenuComponent } from './../menu/menu.component';
import { BaseComponent } from '../base';

/**
 * Split Menu Button implementation based on the
 * https://github.com/SAP/fundamental-ngx/wiki/Platform:-Split-Menu-Button-Component-V1.0-Technical-Design
 * documents.
 *
 *
 */

const PRIMARY_BUTTON_MAX_WIDTH_COZY = '9.75rem'; // Cozy 9.75rem. (Max width) 12rem - 2.25rem (menu button width)
const PRIMARY_BUTTON_MAX_WIDTH_COMPACT = '10rem'; // Compact 10rem. (Max width) 12rem - 2rem (menu button width)
@Component({
    selector: 'fdp-split-menu-button',
    templateUrl: './split-menu-button.component.html',
    styleUrls: ['split-menu-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitMenuButtonComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
    /** Whether or not the element should keep a fixed width. The width could change if the text changes length. */
    @Input()
    fixedWidth = true;

    /** text for tooltip */
    @Input()
    title: string;

    /** text for tooltip */
    @Input()
    menuTitle: string;

    /** Label for the first Button */
    @Input()
    buttonLabel: string;

    /** reference to menu which will be controlled by split button */
    @Input()
    menu: MenuComponent;

    /** The Sap-icon to include in the menu-button */
    @Input()
    icon: string;

    /** The type of the button.
     * 'Emphasized', 'Ghost', 'standard', 'positive', 'negative', 'transparent'
     * Leave empty for default.'*/
    @Input()
    type: ButtonType;

    /** Event sent when split-menu-button primary button is clicked */
    @Output()
    primaryButtonClick: EventEmitter<any> = new EventEmitter();

    /** @hidden */
    @ViewChild('primaryBtn', { read: ElementRef })
    primaryBtn: ElementRef;

    /** used as id for Menu Button
     * @hidden
     */
    public secondaryId: string;

    /** handles rtl service
     * @hidden */
    public dir: string;

    /** @hidden */
    primaryButtonWidth: string;

    /** handles rtl service
     * @hidden */
    private _rtlChangeSubscription = Subscription.EMPTY;

    constructor(
        protected _cd: ChangeDetectorRef,
        @Optional() private _rtl: RtlService,
        private readonly renderer: Renderer2
    ) {
        super(_cd);
    }

    /** @hidden */
    ngOnInit(): void {
        this.secondaryId = 'secondary-' + this.id;
        // if no title provided.
        this.title = this.title || this.buttonLabel;
        this._rtlChangeSubscription = this._rtl.rtl.subscribe((isRtl: boolean) => {
            this.dir = isRtl ? 'rtl' : 'ltr';
            this._cd.detectChanges();
        });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        // Max width to splt menu button is 12rem
        if (this.contentDensity === 'compact') {
            this.renderer.setStyle(this.primaryBtn.nativeElement, 'max-width', PRIMARY_BUTTON_MAX_WIDTH_COMPACT);
        } else if (this.contentDensity === 'cozy') {
            this.renderer.setStyle(this.primaryBtn.nativeElement, 'max-width', PRIMARY_BUTTON_MAX_WIDTH_COZY);
        }

        if (this.fixedWidth) {
            this._setPrimaryButtonWidth();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._rtlChangeSubscription.unsubscribe();
    }

    /**
     *  Handles split-menu-button button click
     */
    public primaryButtonClicked(event: any): void {
        event.stopPropagation();
        this.primaryButtonClick.emit();
    }

    /** @hidden */
    private _setPrimaryButtonWidth(): void {
        if (this.primaryBtn && this.primaryBtn.nativeElement) {
            this.primaryButtonWidth = this.primaryBtn.nativeElement.getBoundingClientRect().width + 'px';
        }
    }
}
