import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    forwardRef,
    Input,
    OnChanges,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';

export type ShellbarSizes = 's' | 'm' | 'l' | 'xl';

/**
 * The shellbar offers consistent, responsive navigation across all products and applications.
 * Includes support for branding, product navigation, search, notifications, and user settings.
 * Shellbar is a composite component comprised of mandatory and optional elements.
 */
@Component({
    selector: 'fd-shellbar',
    templateUrl: './shellbar.component.html',
    styleUrls: ['./shellbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellbarComponent implements OnChanges, AfterContentInit {
    /** Size of Shellbar component 's' | 'm' | 'l' | 'xl' */
    @Input()
    size: ShellbarSizes = 'm';

    /**
     * Whether the Shellbar is used with Side Navigation
     * When set to true, the responsive paddings are not applied
     */
    @Input()
    sideNav = false;

    /** @hidden */
    @ContentChild(ComboboxComponent, { static: false })
    comboboxComponent: ComboboxComponent;

    /** @hidden */
    @ContentChildren(forwardRef(() => ButtonComponent))
    buttons: QueryList<ButtonComponent>;

    /** @hidden */
    ngAfterContentInit(): void {
        this.applyShellbarModeToCombobox();
        this.applyShellbarModeToButtons();
    }

    /** @hidden */
    applyShellbarModeToCombobox(): void {
        if (this.comboboxComponent) {
            this.comboboxComponent.compact = false;
            this.comboboxComponent.inShellbar = true;
            if (this.size === 'xl' || this.size === 's') {
                this.comboboxComponent.hideInput = false;
                this.comboboxComponent.disableHideShowOfInput = true;
                this.comboboxComponent.hideShowInputField();
            } else {
                this.comboboxComponent.hideInput = true;
                this.comboboxComponent.disableHideShowOfInput = false;
                this.comboboxComponent.hideShowInputField();
            }
        }
    }

    /** @hidden */
    applyShellbarModeToButtons(): void {
        if (this.buttons && this.buttons.length) {
            this.buttons.forEach((button) => {
                button.elementRef().nativeElement.classList.add('fd-shellbar__button');
            });
        }
    }

    ngOnChanges(): void {
        this.applyShellbarModeToCombobox();
    }
}
