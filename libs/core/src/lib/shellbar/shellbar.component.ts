import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren, forwardRef, QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ComboboxComponent } from '../combobox/combobox.component';

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
export class ShellbarComponent implements AfterContentInit {

    /** @hidden */
    @ContentChild(ComboboxComponent, {static: false})
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
            this.comboboxComponent.inShellbar = true;
        }
    }
    applyShellbarModeToButtons(): void {
        if (this.buttons && this.buttons.length) {
            this.buttons.forEach(button => {
                button.elementRef().nativeElement.classList.add('fd-shellbar__button');
            });
        }
    }

}
