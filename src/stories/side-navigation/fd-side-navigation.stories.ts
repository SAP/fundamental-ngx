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
        `<fd-side-nav 
                [condensed]="condensedVar">
            <div fd-side-nav-main>
                <ul fd-nested-list 
                        [compact]="mainCompactVar" 
                        [textOnly]="mainTextOnlyVar">
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span fd-nested-list-icon [glyph]="icon"></span>
                            <span fd-nested-list-title>{{textValue1}}</span>
                        </a>
                    </li>
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span fd-nested-list-icon [glyph]="icon"></span>
                            <span fd-nested-list-title>{{textValue2}}</span>
                        </a>
                    </li>
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span fd-nested-list-icon [glyph]="icon"></span>
                            <span fd-nested-list-title>{{textValue3}}</span>
                        </a>
                        <ul *ngIf="multiLevels" fd-nested-list [textOnly]="mainSubTextOnlyVar">
                            <li fd-nested-list-item>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-icon [glyph]="iconSecondary"></span>
                                    <span fd-nested-list-title>{{textValue4}}</span>
                                </a>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-icon [glyph]="iconSecondary"></span>
                                    <span fd-nested-list-title>{{textValue5}}</span>
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
                            <span fd-nested-list-icon [glyph]="iconUtility"></span>  
                            <span fd-nested-list-title>{{textValue6}}</span>
                        </a>
                    </li>
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span fd-nested-list-icon [glyph]="iconUtility"></span>
                            <span fd-nested-list-title>{{textValue7}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </fd-side-nav>
    `,
    props: {
        mainCompactVar: boolean('Main Secion in Compact Mode', false),
        mainTextOnlyVar: boolean('Main Section Text Only', false),
        mainSubTextOnlyVar: boolean('Main Sub Section Text Only', false),
        condensedVar: boolean('Condensed', false),
        multiLevels: boolean('Multi Levels', true),
        utilityTextOnlyVar: boolean('Utility Section text only', false),
        utilityCompactVar: boolean('Utility Section in Compact Mode', false),
        textValue1: text('Text Value 1', 'Item 1'),
        textValue2: text('Text Value 2', 'Item 2'),
        textValue3: text('Text Value 3', 'Item 3'),
        textValue4: text('Text Value 4', 'Item 4'),
        textValue5: text('Text Value 5', 'Item 5'),
        textValue6: text('Text Value 6', 'Item 6'),
        textValue7: text('Text Value 7', 'Item 7'),
        icon: text('Icon Primary', 'menu'),
        iconSecondary: text('Icon Secondary', 'menu'),
        iconUtility: text('Icon Utility', 'menu'),
    }
});

export const SideNavigationNoIcon = () => ({
    template:
        `<fd-side-nav 
                [condensed]="condensedVar">
            <div fd-side-nav-main>
                <ul fd-nested-list 
                        [compact]="mainCompactVar" 
                        [textOnly]="mainTextOnlyVar">
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span fd-nested-list-title>{{textValue1}}</span>
                        </a>
                    </li>
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span fd-nested-list-title>{{textValue2}}</span>
                        </a>
                    </li>
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span fd-nested-list-title>{{textValue3}}</span>
                        </a>
                        <ul *ngIf="multiLevels" fd-nested-list [textOnly]="mainSubTextOnlyVar">
                            <li fd-nested-list-item>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-title>{{textValue4}}</span>
                                </a>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-title>{{textValue5}}</span>
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
                            <span fd-nested-list-title>{{textValue6}}</span>
                        </a>
                    </li>
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span fd-nested-list-title>{{textValue7}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </fd-side-nav>
    `,
    props: {
        mainCompactVar: boolean('Main Secion in Compact Mode', false),
        mainTextOnlyVar: boolean('Main Section Text Only', true),
        mainSubTextOnlyVar: boolean('Main Sub Section Text Only', true),
        condensedVar: boolean('Condensed', false),
        multiLevels: boolean('Multi Levels', true),
        utilityTextOnlyVar: boolean('Utility Section text only', true),
        utilityCompactVar: boolean('Utility Section in Compact Mode', false),
        textValue1: text('Text Value 1', 'Item 1'),
        textValue2: text('Text Value 2', 'Item 2'),
        textValue3: text('Text Value 3', 'Item 3'),
        textValue4: text('Text Value 4', 'Item 4'),
        textValue5: text('Text Value 5', 'Item 5'),
        textValue6: text('Text Value 6', 'Item 6'),
        textValue7: text('Text Value 7', 'Item 7'),
    }
});
