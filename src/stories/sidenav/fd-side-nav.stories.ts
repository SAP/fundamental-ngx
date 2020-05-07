import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { SideNavigationComponent, SideNavigationModule } from 'libs/core/src/lib/side-navigation/public_api';


export default {
    title: 'Fd side-navigation',
    component: SideNavigationComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [SideNavigationModule],
            declarations: []
        })
    ]
};

export const SideNavigation = () => ({
    template:
        `<fd-side-nav>
            <div fd-side-nav-main>
                <ul fd-nested-list 
                        [compact]="mainCompactVar" 
                        [textOnly]="mainTextOnlyVar">
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span *ngIf="!mainTextOnlyVar" fd-nested-list-icon [glyph]="icon"></span>
                            <span fd-nested-list-title>{{textValue1}}</span>
                        </a>
                    </li>
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span *ngIf="!mainTextOnlyVar" fd-nested-list-icon [glyph]="icon"></span>
                            <span fd-nested-list-title>{{textValue1}}</span>
                        </a>
                    </li>
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span *ngIf="!mainTextOnlyVar" fd-nested-list-icon [glyph]="icon"></span>
                            <span fd-nested-list-title>{{textValue1}}</span>
                        </a>
                        <ul fd-nested-list [textOnly]="true">
                            <li fd-nested-list-item>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-title>{{textValue1}}</span>
                                </a>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-title>{{textValue1}}</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        
            <div fd-side-nav-utility>
                <ul fd-nested-list 
                        [compact]="utilityCompactVar" 
                        [textOnly]="utilityTextOnlyVar">
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span *ngIf="!utilityTextOnlyVar" fd-nested-list-icon [glyph]="iconUtility"></span>  
                            <span fd-nested-list-title>{{textValue1}}</span>
                        </a>
                    </li>
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span *ngIf="!utilityTextOnlyVar" fd-nested-list-icon [glyph]="iconUtility"></span>
                            <span fd-nested-list-title>{{textValue1}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </fd-side-nav>
    `,
    props: {
        mainCompactVar: boolean('Main Secion in Compact Mode', false),
        mainTextOnlyVar: boolean('Main Section Text Only', false),
        utilityTextOnlyVar: boolean('Utility Section text only', false),
        utilityCompactVar: boolean('Utility Section in Compact Mode', false),
        textValue1: text('Text Value 1', 'Item 1'),
        icon: text('Icon Primary', 'menu'),
        iconSecondary: text('Icon Secondary', 'menu'),
        iconUtility: text('Icon Utility', 'menu')
    }
});

export const SideNavigationCondensed = () => ({
    template:
        `<fd-side-nav [condensed]="true">
        <div fd-side-nav-main>
            <ul fd-nested-list [compact]="mainCompactVar">
                <li fd-nested-list-item>
                    <a fd-nested-list-link>
                        <span fd-nested-list-icon [glyph]="icon"></span>
                    </a>
                </li>
                <li fd-nested-list-item>
                    <a fd-nested-list-link>
                        <span fd-nested-list-icon [glyph]="icon"></span>
                    </a>
                </li>
                <li fd-nested-list-item>
                    <fd-nested-list-popover>
                        <a fd-nested-list-link>
                            <span fd-nested-list-icon [glyph]="icon"></span>
                            <span fd-nested-list-title>{{textValue1}}</span>

                        </a>
                        <ul fd-nested-list>
                            <li fd-nested-list-item>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-title>{{textValue1}}</span>
                                </a>
                            </li>
                            <li fd-nested-list-item>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-title>{{textValue1}}</span>
                                </a>
                            </li>
                            <li fd-nested-list-item>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-title>{{textValue1}}</span>
                                </a>
                            </li>
                            <li fd-nested-list-item>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-title>{{textValue1}}</span>
                                </a>
                            </li>
                        </ul>
                    </fd-nested-list-popover>
                </li>
                <li fd-nested-list-item>
                    <a fd-nested-list-link>
                        <span fd-nested-list-icon [glyph]="icon"></span>
                        <span fd-nested-list-title>{{textValue1}}</span>
                    </a>
                </li>
            </ul>
        </div>
    
        <div fd-side-nav-utility>
            <ul fd-nested-list [compact]="utilityCompactVar">
                <li fd-nested-list-item>
                    <a fd-nested-list-link>
                        <span fd-nested-list-icon [glyph]="icon"></span>
                    </a>
                </li>
                <li fd-nested-list-item>
                    <a fd-nested-list-link>
                        <span fd-nested-list-icon [glyph]="icon"></span>
                    </a>
                </li>
            </ul>
        </div>
    </fd-side-nav>
    `,
    props: {
        mainCompactVar: boolean('Main Secion in Compact Mode', false),
        utilityCompactVar: boolean('Utility Section in Compact Mode', false),
        textValue1: text('Text Value 1', 'Item 1'),
        icon: text('Icon Primary', 'menu')

    }
});
