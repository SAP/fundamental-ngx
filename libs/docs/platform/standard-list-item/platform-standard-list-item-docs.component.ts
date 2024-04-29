import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { PlatformStandardListItemBorderLessExampleComponent } from './examples/platform-standard-list-item-border-less-example.component';
import {
    PlatformNonByLineStandardListItemExampleComponent,
    PlatformStandardListItemExampleComponent,
    PlatformStandardListItemWithInvertedSecondaryTypeExampleComponent,
    PlatformStandardListItemWithSecondaryTypeExampleComponent,
    PlatformStandardListItemtWithGroupHeaderExampleComponent
} from './examples/platform-standard-list-item-example.component';
import { PlatformStandardListItemWithFooterExampleComponent } from './examples/platform-standard-list-item-with-footer-example.component';
import { PlatformStandardListItemWithNavigationExampleComponent } from './examples/platform-standard-list-item-with-navigation-example.component';
import { PlatformStandardListItemWithSelectionExampleComponent } from './examples/platform-standard-list-item-with-selection-example.component';
import { PlatformStandardListItemWithSingleSelectionExampleComponent } from './examples/platform-standard-list-item-with-single-selection-example.component';
import { PlatformStandardListUnreadExampleComponent } from './examples/platform-standard-list-unread-example.component';

const sliSrc = 'platform-standard-list-item-example.component.html';
const unreadListItemSrc = 'platform-standard-list-unread-example.component.html';
const borderLessSLISrc = 'platform-standard-list-item-border-less-example.component.html';
const borderLessSLITs = 'platform-standard-list-item-border-less-example.component.ts';
const sliWithSecondaryType = 'platform-standard-list-item-with-secondary-type-example.component.html';
const sliWithInvertedSecondaryType = 'platform-standard-list-item-with-inverted-secondary-type-example.component.html';
const sliWithFooter = 'platform-standard-list-item-with-footer-example.component.html';
const sliWithFooterTs = 'platform-standard-list-item-with-footer-example.component.ts';
const sliWithGroupHeader = 'platform-standard-list-item-with-group-header-example.component.html';
const sliWithSelection = 'platform-standard-list-item-with-selection-example.component.html';
const sliWithSelectionTs = 'platform-standard-list-item-with-selection-example.component.ts';
const sliWithSingleSelection = 'platform-standard-list-item-with-single-selection-example.component.html';
const sliWithSingleSelectionTs = 'platform-standard-list-item-with-single-selection-example.component.ts';
const sliWithNavigation = 'platform-standard-list-item-with-navigation-example.component.html';
const sliWithNavigationTs = 'platform-standard-list-item-with-navigation-example.component.ts';
const sli = 'platform-non-byline-standard-list-item-example.component.html';

@Component({
    selector: 'app-standard-list-item',
    templateUrl: './platform-standard-list-item-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        RouterLink,
        ComponentExampleComponent,
        PlatformNonByLineStandardListItemExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformStandardListItemBorderLessExampleComponent,
        PlatformStandardListItemWithFooterExampleComponent,
        PlatformStandardListItemtWithGroupHeaderExampleComponent,
        PlatformStandardListItemExampleComponent,
        PlatformStandardListItemWithSecondaryTypeExampleComponent,
        PlatformStandardListItemWithSingleSelectionExampleComponent,
        PlatformStandardListItemWithSelectionExampleComponent,
        PlatformStandardListItemWithNavigationExampleComponent,
        PlatformStandardListItemWithInvertedSecondaryTypeExampleComponent,
        PlatformStandardListUnreadExampleComponent
    ]
})
export class PlatformStandardListItemDocsComponent {
    simpleSLI: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliSrc),
            fileName: 'platform-standard-list-item-example'
        }
    ];

    unreadListItem: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(unreadListItemSrc),
            fileName: 'platform-standard-list-unread-example'
        }
    ];

    sli: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sli),
            fileName: 'platform-non-byline-standard-list-item-example'
        }
    ];
    borderLessSLI: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(borderLessSLISrc),
            fileName: 'platform-standard-list-item-border-less-example'
        },
        {
            language: 'typescript',
            component: 'PlatformStandardListItemBorderLessExampleComponent',
            code: getAssetFromModuleAssets(borderLessSLITs),
            fileName: 'platform-standard-list-item-border-less-example'
        }
    ];

    sliWithSecondaryType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliWithSecondaryType),
            fileName: 'platform-standard-list-item-with-secondary-type-example'
        }
    ];

    sliWithInvertedSecondaryType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliWithInvertedSecondaryType),
            fileName: 'platform-standard-list-item-with-inverted-secondary-type-example'
        }
    ];

    sliWithFooter: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliWithFooter),
            fileName: 'platform-standard-list-item-with-footer-example'
        },
        {
            language: 'typescript',
            component: 'PlatformStandardListItemWithFooterExampleComponent',
            code: getAssetFromModuleAssets(sliWithFooterTs),
            fileName: 'platform-standard-list-item-with-footer-example'
        }
    ];

    sliWithGroupHeader: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliWithGroupHeader),
            fileName: 'platform-standard-list-item-with-group-header-example'
        }
    ];

    sliWithSelection: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliWithSelection),
            fileName: 'platform-standard-list-item-with-selection-example'
        },
        {
            language: 'typescript',
            component: 'PlatformStandardListItemWithSelectionExampleComponent',
            code: getAssetFromModuleAssets(sliWithSelectionTs),
            fileName: 'platform-standard-list-item-with-selection-example'
        }
    ];

    sliWithSingleSelection: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliWithSingleSelection),
            fileName: 'platform-standard-list-item-with-single-selection-example'
        },
        {
            language: 'typescript',
            component: 'PlatformStandardListItemWithSingleSelectionExampleComponent',
            code: getAssetFromModuleAssets(sliWithSingleSelectionTs),
            fileName: 'platform-standard-list-item-with-single-selection-example'
        }
    ];

    sliWithNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliWithNavigation),
            fileName: 'platform-standard-list-item-with-navigation-example'
        },
        {
            language: 'typescript',
            component: 'PlatformStandardListItemWithNavigationExampleComponent',
            code: getAssetFromModuleAssets(sliWithNavigationTs),
            fileName: 'platform-standard-list-item-with-navigation-example'
        }
    ];
}
