import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ButtonType } from '@fundamental-ngx/core/button';
import { RtlService } from '@fundamental-ngx/core/utils';
import { BaseComponent } from '@fundamental-ngx/platform/shared';
import { MenuComponent } from '@fundamental-ngx/platform/menu';

/**
 * <fdp-split-menu-button [menu]="menu" [buttonLabel]="Default button" (primaryButtonClick)="onPrimaryButtonClick1()">
 * </fdp-split-menu-button>
 *
 * <fdp-menu #menu xPosition="after|before">
 *      <fdp-menu-item (itemSelect)="onItemSelect1('Option 1')">Option 1</fdp-menu-item>
 *      <fdp-menu-item (itemSelect)="onItemSelect1('Option 2')">Option 2</fdp-menu-item>
 *      <fdp-menu-item (itemSelect)="onItemSelect1('Option 3')">Option 3</fdp-menu-item>
 * </fdp-menu>
 */
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
    /** Defined max width of Split menu button */
    splitButtonMaxWidth = '12rem';
    /** handles rtl service
     * @hidden */
    private _rtlChangeSubscription = Subscription.EMPTY;

    /** @hidden */
    get typeClass(): string {
        return this.type ? `fd-button-split--${this.type}` : '';
    }

    /** @hidden */
    constructor(protected _cd: ChangeDetectorRef, @Optional() private _rtlService: RtlService) {
        super(_cd);
    }

    /** Tabindex for button. */
    get tabindex(): number {
        return this.disabled ? -1 : 0;
    }

    /** @hidden */
    ngOnInit(): void {
        this.secondaryId = 'secondary-' + this.id;
        // if no title provided.
        this.title = this.title || this.buttonLabel;
        if (this._rtlService) {
            this._rtlChangeSubscription = this._rtlService.rtl.subscribe((isRtl: boolean) => {
                this.dir = isRtl ? 'rtl' : 'ltr';
                this._cd.detectChanges();
            });
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
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
