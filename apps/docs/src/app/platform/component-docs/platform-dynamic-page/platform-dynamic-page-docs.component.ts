import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { PlatformDynamicPagePageOverflowService } from './platform-dynamic-page-examples/platform-dynamic-page-page-overflow.service';

import * as dynamicPageBasicExample from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-example.component.html';
import * as dynamicPageBasicExampleScss from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-example.component.scss';
import * as dynamicPageBasicExampleTsCode from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-example.component.ts';

import * as dynamicPageTabbedExample from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-tabbed-example.component.html';
import * as dynamicPageTabbedExampleScss from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-tabbed-example.component.scss';
import * as dynamicPageTabbedExampleTsCode from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-tabbed-example.component.ts';

import * as dynamicPageSnapScrollExample from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-snap-scroll-example.component.html';
import * as dynamicPageSnapScrollExampleScss from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-snap-scroll-example.component.scss';
import * as dynamicPageSnapScrollExampleTsCode from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-snap-scroll-example.component.ts';

import * as dynamicPageResponsivePaddingExample from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-responsive-padding-example.component.html';
import * as dynamicPageResponsivePaddingExampleScss from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-responsive-padding-example.component.scss';
import * as dynamicPageResponsivePaddingExampleTsCode from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-responsive-padding-example.component.ts';

import * as dynamicPageNonCollapsibleExample from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-non-collapsible-example.component.html';
import * as dynamicPageNonCollapsibleExampleScss from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-non-collapsible-example.component.scss';
import * as dynamicPageNonCollapsibleExampleTsCode from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-non-collapsible-example.component.ts';

import * as dynamicPageFlexibleColumnExample from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-flexible-column-example.component.html';
import * as dynamicPageFlexibleColumnExampleScss from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-flexible-column-example.component.scss';
import * as dynamicPageFlexibleColumnExampleTsCode from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-flexible-column-example.component.ts';

import * as platformDynamicPagePageOverflowServiceTs from '!raw-loader!./platform-dynamic-page-examples/platform-dynamic-page-page-overflow.service.ts';

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
            if (isExampleOpened) {
                document.getElementById('page-content').style.overflowY = 'hidden'; // hide the underlying page scrollbars
            } else {
                document.getElementById('page-content').style.overflowY = '';
            }
        });
    }

    ngOnDestroy(): void {
      this._subscription.unsubscribe();
    }
}
