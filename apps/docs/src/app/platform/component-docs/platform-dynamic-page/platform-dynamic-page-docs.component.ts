import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { PlatformDynamicPagePageOverflowService } from './platform-dynamic-page-examples/platform-dynamic-page-page-overflow.service';

import dynamicPageBasicExample from '!./platform-dynamic-page-examples/platform-dynamic-page-example.component.html?raw';
import dynamicPageBasicExampleScss from '!./platform-dynamic-page-examples/platform-dynamic-page-example.component.scss?raw';
import dynamicPageBasicExampleTsCode from '!./platform-dynamic-page-examples/platform-dynamic-page-example.component.ts?raw';

import dynamicPageTabbedExample from '!./platform-dynamic-page-examples/platform-dynamic-page-tabbed-example.component.html?raw';
import dynamicPageTabbedExampleScss from '!./platform-dynamic-page-examples/platform-dynamic-page-tabbed-example.component.scss?raw';
import dynamicPageTabbedExampleTsCode from '!./platform-dynamic-page-examples/platform-dynamic-page-tabbed-example.component.ts?raw';

import dynamicPageSnapScrollExample from '!./platform-dynamic-page-examples/platform-dynamic-page-snap-scroll-example.component.html?raw';
import dynamicPageSnapScrollExampleScss from '!./platform-dynamic-page-examples/platform-dynamic-page-snap-scroll-example.component.scss?raw';
import dynamicPageSnapScrollExampleTsCode from '!./platform-dynamic-page-examples/platform-dynamic-page-snap-scroll-example.component.ts?raw';

import dynamicPageResponsivePaddingExample from '!./platform-dynamic-page-examples/platform-dynamic-page-responsive-padding-example.component.html?raw';
import dynamicPageResponsivePaddingExampleScss from '!./platform-dynamic-page-examples/platform-dynamic-page-responsive-padding-example.component.scss?raw';
import dynamicPageResponsivePaddingExampleTsCode from '!./platform-dynamic-page-examples/platform-dynamic-page-responsive-padding-example.component.ts?raw';

import dynamicPageNonCollapsibleExample from '!./platform-dynamic-page-examples/platform-dynamic-page-non-collapsible-example.component.html?raw';
import dynamicPageNonCollapsibleExampleScss from '!./platform-dynamic-page-examples/platform-dynamic-page-non-collapsible-example.component.scss?raw';
import dynamicPageNonCollapsibleExampleTsCode from '!./platform-dynamic-page-examples/platform-dynamic-page-non-collapsible-example.component.ts?raw';

import dynamicPageFlexibleColumnExample from '!./platform-dynamic-page-examples/platform-dynamic-page-flexible-column-example.component.html?raw';
import dynamicPageFlexibleColumnExampleScss from '!./platform-dynamic-page-examples/platform-dynamic-page-flexible-column-example.component.scss?raw';
import dynamicPageFlexibleColumnExampleTsCode from '!./platform-dynamic-page-examples/platform-dynamic-page-flexible-column-example.component.ts?raw';

import platformDynamicPagePageOverflowServiceTs from '!./platform-dynamic-page-examples/platform-dynamic-page-page-overflow.service.ts?raw';

@Component({
    selector: 'app-dynamic-page',
    templateUrl: './platform-dynamic-page-docs.component.html'
})
export class PlatformDynamicPageDocsComponent implements OnInit, OnDestroy {
    private _subscription: Subscription;
    // service to change the overflow value for page-content class
    constructor(private _overflowHandlingService: PlatformDynamicPagePageOverflowService) {}

    dynamicPageBasic: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageBasicExample,
            fileName: 'platform-dynamic-page-example',
            scssFileCode: dynamicPageBasicExampleScss
        },
        {
            language: 'typescript',
            code: dynamicPageBasicExampleTsCode,
            fileName: 'platform-dynamic-page-example',
            component: 'PlatformDynamicPageExampleComponent'
        },
        {
            language: 'typescript',
            name: 'platform-dynamic-page-page-overflow.service.ts',
            code: platformDynamicPagePageOverflowServiceTs,
            fileName: 'platform-dynamic-page-page-overflow',
            component: 'PlatformDynamicPagePageOverflowService',
            service: true
        }
    ];
    dynamicPageSnapScroll: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageSnapScrollExample,
            fileName: 'platform-dynamic-page-snap-scroll-example',
            scssFileCode: dynamicPageSnapScrollExampleScss
        },
        {
            language: 'typescript',
            code: dynamicPageSnapScrollExampleTsCode,
            fileName: 'platform-dynamic-page-snap-scroll-example',
            component: 'PlatformDynamicPageSnapScrollExampleComponent'
        },
        {
            language: 'typescript',
            name: 'platform-dynamic-page-page-overflow.service.ts',
            code: platformDynamicPagePageOverflowServiceTs,
            fileName: 'platform-dynamic-page-page-overflow',
            component: 'PlatformDynamicPagePageOverflowService',
            service: true
        }
    ];

    dynamicPageTabbed: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageTabbedExample,
            fileName: 'platform-dynamic-page-tabbed-example',
            scssFileCode: dynamicPageTabbedExampleScss
        },
        {
            language: 'typescript',
            code: dynamicPageTabbedExampleTsCode,
            fileName: 'platform-dynamic-page-tabbed-example',
            component: 'PlatformDynamicPageTabbedExampleComponent'
        },
        {
            language: 'typescript',
            name: 'platform-dynamic-page-page-overflow.service.ts',
            code: platformDynamicPagePageOverflowServiceTs,
            fileName: 'platform-dynamic-page-page-overflow',
            component: 'PlatformDynamicPagePageOverflowService',
            service: true
        }
    ];

    dynamicPageResponsivePadding: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageResponsivePaddingExample,
            fileName: 'platform-dynamic-page-responsive-padding-example',
            scssFileCode: dynamicPageResponsivePaddingExampleScss
        },
        {
            language: 'typescript',
            code: dynamicPageResponsivePaddingExampleTsCode,
            fileName: 'platform-dynamic-page-responsive-padding-example',
            component: 'PlatformDynamicPageResponsivePaddingExampleComponent'
        },
        {
            language: 'typescript',
            name: 'platform-dynamic-page-page-overflow.service.ts',
            code: platformDynamicPagePageOverflowServiceTs,
            fileName: 'platform-dynamic-page-page-overflow',
            component: 'PlatformDynamicPagePageOverflowService',
            service: true
        }
    ];

    dynamicPageNonCollapsible: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageNonCollapsibleExample,
            fileName: 'platform-dynamic-page-non-collapsible-example',
            scssFileCode: dynamicPageNonCollapsibleExampleScss
        },
        {
            language: 'typescript',
            code: dynamicPageNonCollapsibleExampleTsCode,
            fileName: 'platform-dynamic-page-non-collapsible-example',
            component: 'PlatformDynamicPageNonCollapsibleExampleComponent'
        },
        {
            language: 'typescript',
            name: 'platform-dynamic-page-page-overflow.service.ts',
            code: platformDynamicPagePageOverflowServiceTs,
            fileName: 'platform-dynamic-page-page-overflow',
            component: 'PlatformDynamicPagePageOverflowService',
            service: true
        }
    ];

    dynamicPageFlexibleColumn: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicPageFlexibleColumnExample,
            fileName: 'platform-dynamic-page-flexible-column-example',
            scssFileCode: dynamicPageFlexibleColumnExampleScss
        },
        {
            language: 'typescript',
            code: dynamicPageFlexibleColumnExampleTsCode,
            fileName: 'platform-dynamic-page-flexible-column-example',
            component: 'PlatformDynamicPageFlexibleColumnExampleComponent'
        },
        {
            language: 'typescript',
            name: 'platform-dynamic-page-page-overflow.service.ts',
            code: platformDynamicPagePageOverflowServiceTs,
            fileName: 'platform-dynamic-page-page-overflow',
            component: 'PlatformDynamicPagePageOverflowService',
            service: true
        }
    ];

    ngOnInit(): void {
        this._subscription = this._overflowHandlingService.isExampleOpened.subscribe((isExampleOpened) => {
            const content = document.getElementById('page-content');
            if (!content) {
                return;
            }
            if (isExampleOpened) {
                content.style.overflowY = 'hidden'; // hide the underlying page scrollbars
            } else {
                content.style.overflowY = '';
            }
        });
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}
