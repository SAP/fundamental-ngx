import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import {
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective
} from '@fundamental-ngx/core/menu';
import { SelectModule } from '@fundamental-ngx/core/select';
import { PopoverFillMode } from '@fundamental-ngx/core/shared';

type PlacementOption =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';

@Component({
    selector: 'fd-menu-placement-example',
    template: `
        <h4 class="fd-title fd-title--h5 fd-margin-bottom--sm">Placement Options</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-end; margin-bottom: 1rem;">
            <div>
                <label fd-form-label for="placement">Placement:</label>
                <fd-select id="placement" [(ngModel)]="placement" style="width: 10rem;">
                    @for (option of placementOptions; track option) {
                        <fd-option [value]="option">{{ option }}</fd-option>
                    }
                </fd-select>
            </div>
            <div>
                <label fd-form-label for="fillMode">Fill Mode:</label>
                <fd-select id="fillMode" [(ngModel)]="fillMode" style="width: 10rem;">
                    <fd-option [value]="null">none</fd-option>
                    <fd-option value="at-least">at-least</fd-option>
                    <fd-option value="equal">equal</fd-option>
                </fd-select>
            </div>
        </div>

        <div style="display: flex; justify-content: center; padding: 3rem;">
            <button fd-button label="Open Menu" style="min-width: 200px;" [fdMenuTrigger]="placementMenu"></button>

            <fd-menu #placementMenu [placement]="placement()" [fillControlMode]="fillMode()">
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

        <h4 class="fd-title fd-title--h5 fd-margin-top--md fd-margin-bottom--sm">Trigger Modes</h4>
        <p class="fd-margin-bottom--sm">
            The <code>[triggers]</code> input controls how the menu opens. Default is <code>['click']</code>.
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <div>
                <p class="fd-margin-bottom--xs"><strong>Click (default)</strong></p>
                <button fd-button label="Click to open" [fdMenuTrigger]="clickMenu"></button>
                <fd-menu #clickMenu [triggers]="['click']">
                    <li fd-menu-item>
                        <a href="#" fd-menu-interactive>
                            <span fd-menu-title>Click menu option</span>
                        </a>
                    </li>
                </fd-menu>
            </div>

            <div>
                <p class="fd-margin-bottom--xs"><strong>Hover</strong></p>
                <button fd-button label="Hover to open" [fdMenuTrigger]="hoverMenu"></button>
                <fd-menu
                    #hoverMenu
                    [triggers]="[
                        { trigger: 'mouseenter', openAction: true, closeAction: false },
                        { trigger: 'mouseleave', openAction: false, closeAction: true }
                    ]"
                >
                    <li fd-menu-item>
                        <a href="#" fd-menu-interactive>
                            <span fd-menu-title>Hover menu option</span>
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
        FormLabelComponent,
        SelectModule,
        FormsModule
    ]
})
export class MenuPlacementExampleComponent {
    /** Available placement options */
    readonly placementOptions: PlacementOption[] = [
        'bottom-start',
        'bottom',
        'bottom-end',
        'top-start',
        'top',
        'top-end',
        'left-start',
        'left',
        'left-end',
        'right-start',
        'right',
        'right-end'
    ];

    /** Current placement setting */
    placement = signal<PlacementOption>('bottom-start');

    /** Current fill mode setting */
    fillMode = signal<PopoverFillMode | null>(null);
}
