import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControlComponent } from '@fundamental-ngx/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    MenuAddonDirective,
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuItemInputDirective,
    MenuTitleDirective,
    MenuTriggerDirective,
    SegmentedButtonHeaderDirective,
    SegmentedButtonOptionDirective,
    ToggleButtonDirective
} from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-extended-menu-example',
    template: `
        <p><b>Toggle button value:</b> {{ toggleValue }}</p>
        <p><b>Sort value:</b> {{ sortValue | json }}</p>
        <p><b>Text input value:</b> {{ textValue | json }}</p>
        <button fd-button label="Extended items" [fdMenu]="true" [fdMenuTrigger]="extendedMenu"></button>

        <fd-menu #extendedMenu>
            <li fd-menu-item>
                <button fd-menu-interactive toggle [(ngModel)]="toggleValue">
                    <span fd-menu-title>Toggle button</span>
                </button>
            </li>

            <li fd-menu-item fdMenuSegmentedButtonHeader [(ngModel)]="sortValue">
                <button fd-menu-interactive>
                    <fd-menu-addon position="before" glyph="sort"></fd-menu-addon>
                    <span fd-menu-title>Sort</span>
                </button>
            </li>

            <li fd-menu-item fdMenuSegmentedButtonOption value="asc">
                <button fd-menu-interactive>
                    <span fd-menu-title>Ascending</span>
                </button>
            </li>

            <li fd-menu-item fdMenuSegmentedButtonOption value="desc">
                <button fd-menu-interactive>
                    <span fd-menu-title>Descending</span>
                </button>
            </li>

            <li fd-menu-item fdMenuSegmentedButtonOption [value]="null">
                <button fd-menu-interactive>
                    <span fd-menu-title>None</span>
                </button>
            </li>
            <li fd-menu-item>
                <div fd-menu-interactive>
                    <input
                        fd-form-control
                        fd-menu-item-input
                        [(ngModel)]="textValue"
                        type="text"
                        id="extendedMenuInputMenuItem"
                        placeholder="Field placeholder text"
                    />
                </div>
            </li>
        </fd-menu>
    `,
    imports: [
        ButtonComponent,
        JsonPipe,
        MenuTriggerDirective,
        MenuComponent,
        MenuItemComponent,
        MenuInteractiveComponent,
        MenuAddonDirective,
        MenuTitleDirective,
        ToggleButtonDirective,
        SegmentedButtonHeaderDirective,
        SegmentedButtonHeaderDirective,
        SegmentedButtonOptionDirective,
        FormControlComponent,
        MenuItemInputDirective,
        FormsModule
    ]
})
export class ExtendedMenuExampleComponent {
    toggleValue = false;
    sortValue: 'asc' | 'desc' | null = null;
    textValue = '';
}
