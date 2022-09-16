import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const VerticalNavigationDefaultExample = 'vertical-navigation-default-example.component.html';
const VerticalNavigationGroupingExample = 'vertical-navigation-grouping-example.component.html';
const VerticalNavigationCondensedExample = 'vertical-navigation-condensed-example.component.html';
const VerticalNavigationNoIconsExample = 'vertical-navigation-no-icons-example.component.html';

@Component({
    selector: 'app-vertical-navigation',
    templateUrl: './vertical-navigation-docs.component.html'
})
export class VerticalNavigationDocsComponent {
    defaultVerticalNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(VerticalNavigationDefaultExample),
            fileName: 'vertical-navigation-default-example'
        }
    ];
    condensedVerticalNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(VerticalNavigationCondensedExample),
            fileName: 'vertical-navigation-condensed-example'
        }
    ];
    noIconsVerticalNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(VerticalNavigationNoIconsExample),
            fileName: 'vertical-navigation-no-icons-example'
        }
    ];
    groupingVerticalNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(VerticalNavigationGroupingExample),
            fileName: 'vertical-navigation-grouping-example'
        }
    ];
}
