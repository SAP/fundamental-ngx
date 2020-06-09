import { moduleMetadata } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { MenuComponent, MenuModule } from '../../../libs/core/src/lib/menu/public_api';
import { IconModule } from '../../../libs/core/src/lib/icon/public_api';

export default {
    title: 'Fd menu',
    component: [MenuComponent],
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [MenuModule, IconModule]
        })
    ]
};

export const Menu = () => ({
    template: `
        <button [fdMenuTrigger]="menu">Menu</button>

        <fd-menu #menu="fdMenu"
            [disabled]="disabled"
            [compact]="compact"
            [closeOnEscapeKey]="closeOnEscapeKey"
            [openOnHoverTime]="openOnHoverTime"
            [closeOnOutsideClick]="closeOnOutsideClick">
            <li fd-menu-item [submenu]="fruits">
                <div fd-menu-interactive>
                    <fd-icon *ngIf="hasAddonBefore" fd-menu-addon glyph="decline" position="before"></fd-icon>
                    <span fd-menu-title>Fruits</span>
                    <span *ngIf="hasShortcut" fd-menu-shortcut>Alt + Del</span>
                    <fd-icon fd-menu-addon [submenuIndicator]="true"></fd-icon>
                </div>
            </li>

            <li fd-menu-item [submenu]="vegetables">
                <div fd-menu-interactive>
                    <fd-icon *ngIf="hasAddonBefore" fd-menu-addon glyph="decline" position="before"></fd-icon>
                    <span fd-menu-title>Vegetables</span>
                    <span *ngIf="hasShortcut" fd-menu-shortcut>Alt + Del</span>
                    <fd-icon fd-menu-addon [submenuIndicator]="true"></fd-icon>
                </div>
            </li>

            <li fd-menu-item [submenu]="milkProducts">
                <div fd-menu-interactive>
                    <fd-icon *ngIf="hasAddonBefore" fd-menu-addon glyph="decline" position="before"></fd-icon>
                    <span fd-menu-title>Milk products</span>
                    <span *ngIf="hasShortcut" fd-menu-shortcut>Alt + Del</span>
                    <fd-icon fd-menu-addon [submenuIndicator]="true"></fd-icon>
                </div>
            </li>
        </fd-menu>

        <fd-submenu #fruits="fdSubmenu">
            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <fd-icon *ngIf="hasAddonBefore" fd-menu-addon glyph="decline" position="before"></fd-icon>
                    <span fd-menu-title>Pineapple</span>
                    <fd-icon *ngIf="hasAddonAfter" fd-menu-addon glyph="accept"></fd-icon>
                </a>
            </li>

            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <fd-icon *ngIf="hasAddonBefore" fd-menu-addon glyph="decline" position="before"></fd-icon>
                    <span fd-menu-title>Banana</span>
                    <fd-icon *ngIf="hasAddonAfter" fd-menu-addon glyph="accept"></fd-icon>
                </a>
            </li>
        </fd-submenu>

        <fd-submenu #vegetables="fdSubmenu">
            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <fd-icon *ngIf="hasAddonBefore" fd-menu-addon glyph="decline" position="before"></fd-icon>
                    <span fd-menu-title>Cucumber</span>
                    <fd-icon *ngIf="hasAddonAfter" fd-menu-addon glyph="accept"></fd-icon>
                </a>
            </li>

            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <fd-icon *ngIf="hasAddonBefore" fd-menu-addon glyph="decline" position="before"></fd-icon>
                    <span fd-menu-title>Onion</span>
                    <fd-icon *ngIf="hasAddonAfter" fd-menu-addon glyph="accept"></fd-icon>
                </a>
            </li>
        </fd-submenu>

        <fd-submenu #milkProducts="fdSubmenu">
            <li fd-menu-item [submenu]="cheeses">
                <div fd-menu-interactive>
                    <fd-icon *ngIf="hasAddonBefore" fd-menu-addon glyph="decline" position="before"></fd-icon>
                    <span fd-menu-title>Cheese</span>
                    <fd-icon fd-menu-addon [submenuIndicator]="true"></fd-icon>
                </div>
            </li>

            <li fd-menu-item [submenu]="yogurts">
                <div fd-menu-interactive>
                    <fd-icon *ngIf="hasAddonBefore" fd-menu-addon glyph="decline" position="before"></fd-icon>
                    <span fd-menu-title>Yogurts</span>
                    <fd-icon fd-menu-addon [submenuIndicator]="true"></fd-icon>
                </div>
            </li>
        </fd-submenu>

        <fd-submenu #cheeses="fdSubmenu">
            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <fd-icon *ngIf="hasAddonBefore" fd-menu-addon glyph="decline" position="before"></fd-icon>
                    <span fd-menu-title>Parmesan</span>
                    <fd-icon *ngIf="hasAddonAfter" fd-menu-addon glyph="accept"></fd-icon>
                </a>
            </li>

            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <fd-icon *ngIf="hasAddonBefore" fd-menu-addon glyph="decline" position="before"></fd-icon>
                    <span fd-menu-title>Brie</span>
                    <fd-icon *ngIf="hasAddonAfter" fd-menu-addon glyph="accept"></fd-icon>
                </a>
            </li>
        </fd-submenu>

        <fd-submenu #yogurts="fdSubmenu">
            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <fd-icon *ngIf="hasAddonBefore" fd-menu-addon glyph="decline" position="before"></fd-icon>
                    <span fd-menu-title>Greek</span>
                    <fd-icon *ngIf="hasAddonAfter" fd-menu-addon glyph="accept"></fd-icon>
                </a>
            </li>

            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <fd-icon *ngIf="hasAddonBefore" fd-menu-addon glyph="decline" position="before"></fd-icon>
                    <span fd-menu-title>Natural</span>
                    <fd-icon *ngIf="hasAddonAfter" fd-menu-addon glyph="accept"></fd-icon>
                </a>
            </li>
        </fd-submenu>
  `,
    props: {
        disabled: boolean('Disable', false),
        compact: boolean('Compact', false),
        closeOnEscapeKey: boolean('Close on escape key', true),
        closeOnOutsideClick: boolean('Close on outside click', true),
        hasAddonBefore: boolean('Icon before', false),
        hasAddonAfter: boolean('Icon after', false),
        hasShortcut: boolean('Shortcut after', false),
        openOnHoverTime: number('Hover time to open', 0),
        ariaLabel: text('Aria label', ''),
        ariaLabelledby: text('Aria labelledby', ''),
        id: text('Aria labelledby', ''),
        fillControlMode: text('Aria labelledby', ''),
        options: text('Aria labelledby', ''),
        placement: text('Aria labelledby', '')
    }
});
