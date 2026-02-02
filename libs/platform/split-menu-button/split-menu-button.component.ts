import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    computed,
    inject
} from '@angular/core';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent, ButtonType } from '@fundamental-ngx/core/button';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont } from '@fundamental-ngx/core/icon';
import { MenuComponent, MenuTriggerDirective } from '@fundamental-ngx/platform/menu';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

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
    styleUrl: 'split-menu-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, MenuTriggerDirective]
})
export class SplitMenuButtonComponent extends BaseComponent implements OnInit, AfterViewInit {
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

    /** The icon to include in the menu-button */
    @Input()
    icon: string;

    /** Glyph font family */
    @Input()
    iconFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

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

    /** @hidden */
    primaryButtonWidth: string;
    /** Defined max width of Split menu button */
    splitButtonMaxWidth = '12rem';
    /** @hidden */
    get typeClass(): string {
        return this.type ? `fd-button-split--${this.type}` : '';
    }

    /** handles rtl service
     * @hidden */
    protected readonly dir = computed<'ltr' | 'rtl'>(() => (this._rtlService?.rtl() ? 'rtl' : 'ltr'));

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** Tabindex for button. */
    get tabindex(): number {
        return this.disabled ? -1 : 0;
    }

    /** @hidden */
    ngOnInit(): void {
        this.secondaryId = 'secondary-' + this.id;
        // if no title provided.
        this.title = this.title || this.buttonLabel;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.fixedWidth) {
            this._setPrimaryButtonWidth();
        }
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
