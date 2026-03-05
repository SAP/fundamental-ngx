import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import {
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective
} from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-menu-disabled-example',
    template: `
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
            <!-- Disabled Menu -->
            <div>
                <h4 class="fd-title fd-title--h5 fd-margin-bottom--sm">Disabled Menu</h4>
                <fd-checkbox [(ngModel)]="menuDisabled" label="Disable entire menu"></fd-checkbox>
                <div class="fd-margin-top--sm">
                    <button fd-button label="Menu" [disabled]="menuDisabled" [fdMenuTrigger]="disabledMenu"></button>
                </div>

                <fd-menu #disabledMenu [disabled]="menuDisabled">
                    <li fd-menu-item>
                        <a href="#" fd-menu-interactive>
                            <span fd-menu-title>Option 1</span>
                        </a>
                    </li>
                    <li fd-menu-item>
                        <a href="#" fd-menu-interactive>
                            <span fd-menu-title>Option 2</span>
                        </a>
                    </li>
                    <li fd-menu-item>
                        <a href="#" fd-menu-interactive>
                            <span fd-menu-title>Option 3</span>
                        </a>
                    </li>
                </fd-menu>
            </div>

            <!-- Disabled Menu Items -->
            <div>
                <h4 class="fd-title fd-title--h5 fd-margin-bottom--sm">Disabled Menu Items</h4>
                <p class="fd-margin-bottom--sm">Individual items can be disabled while the menu remains active.</p>
                <button fd-button label="Menu with disabled items" [fdMenuTrigger]="itemsMenu"></button>

                <fd-menu #itemsMenu>
                    <li fd-menu-item>
                        <a href="#" fd-menu-interactive>
                            <span fd-menu-title>Active Option</span>
                        </a>
                    </li>
                    <li fd-menu-item [disabled]="true">
                        <a href="#" fd-menu-interactive>
                            <span fd-menu-title>Disabled Option</span>
                        </a>
                    </li>
                    <li fd-menu-item>
                        <a href="#" fd-menu-interactive>
                            <span fd-menu-title>Another Active Option</span>
                        </a>
                    </li>
                    <li fd-menu-item [disabled]="true">
                        <a href="#" fd-menu-interactive>
                            <span fd-menu-title>Another Disabled Option</span>
                        </a>
                    </li>
                </fd-menu>
            </div>
        </div>
    `,
    imports: [
        ButtonComponent,
        MenuComponent,
        MenuItemComponent,
        MenuInteractiveComponent,
        MenuTitleDirective,
        MenuTriggerDirective,
        CheckboxComponent,
        FormsModule
    ]
})
export class MenuDisabledExampleComponent {
    /** Whether the menu is disabled */
    menuDisabled = false;
}
