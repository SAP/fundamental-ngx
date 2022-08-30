import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    forwardRef,
    Input,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { SelectComponent } from '@fundamental-ngx/core/select';

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
export class ShellbarComponent implements AfterContentInit, AfterViewInit {
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
    @ContentChild(SelectComponent, { static: false })
    selectComponent: SelectComponent;

    /** @hidden */
    @ContentChildren(forwardRef(() => ButtonComponent))
    buttons: QueryList<ButtonComponent>;

    /** @hidden */
    ngAfterContentInit(): void {
        this.applyShellbarModeToButtons();
        this.applyShellbarModeToSelect();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.applyShellbarModeToCombobox();
    }

    applyShellbarModeToSelect(): void {
        if (this.selectComponent) {
            this.selectComponent.inShellbar = true;
        }
    }

    /** @hidden */
    applyShellbarModeToCombobox(): void {
        if (this.comboboxComponent && this.comboboxComponent.inputGroup) {
            this.comboboxComponent.searchInputElement.nativeElement.classList.add('fd-shellbar__input-group-input');
            this.comboboxComponent.buttons.forEach((button) => {
                button.elementRef().nativeElement.classList.add('fd-shellbar__button');
            });

            this.comboboxComponent.inputGroup
                .elementRef()
                .nativeElement.children[0].classList.add('fd-shellbar__input-group');

            this.comboboxComponent.inputGroup.inputGroupAddon.nativeElement.classList.add(
                'fd-shellbar__input-group-addon'
            );
            this.comboboxComponent.inputGroup.buttons.forEach((button) => {
                button.elementRef().nativeElement.classList.add('fd-shellbar__button');
            });
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
}
