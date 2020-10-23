import { Component } from '@angular/core';
import * as carouselOneActiveItemTs from '!raw-loader!./examples/carousel-one-active-item.component.ts';
import * as carouselOneActiveItemHtml from '!raw-loader!./examples/carousel-one-active-item.component.html';
import * as carouselMultipleActiveItemTs from '!raw-loader!./examples/carousel-multiple-active-item.component.ts';
import * as carouselMultipleActiveItemHtml from '!raw-loader!./examples/carousel-multiple-active-item.component.html';
import * as carouselNoIndicatorTs from '!raw-loader!./examples/carousel-no-page-indicator.component.ts';
import * as carouselNoIndicatorHtml from '!raw-loader!./examples/carousel-no-page-indicator.component.html';
import * as carouselHiddenNavigationTs from '!raw-loader!./examples/carousel-hidden-navigation.component.ts';
import * as carouselHiddenNavigationHtml from '!raw-loader!./examples/carousel-hidden-navigation.component.html';
import * as carouselContentNavigatorTs from '!raw-loader!./examples/carousel-content-navigation.component.ts';
import * as carouselContentNavigatorHtml from '!raw-loader!./examples/carousel-content-navigation.component.html';
import * as carouselLoopedNavigationTs from '!raw-loader!./examples/carousel-looped-navigation.component.ts';
import * as carouselLoopedNavigationHtml from '!raw-loader!./examples/carousel-looped-navigation.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-input',
    templateUrl: './carousel-docs.component.html'
})
export class CarouselDocsComponent {
    carouselSingle: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'carousel-one-active-item',
            component: 'CarouselOneActiveItemComponent',
            code: carouselOneActiveItemHtml
        },
        {
            language: 'typescript',
            fileName: 'carousel-one-active-item',
            component: 'CarouselOneActiveItemComponent',
            code: carouselOneActiveItemTs
        }
    ];

    carouselMultiItem: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-multiple-active-item',
            component: 'CarouselMultipleActiveItemComponent',
            code: carouselMultipleActiveItemTs
        },
        {
            language: 'html',
            fileName: 'carousel-multiple-active-item',
            component: 'CarouselMultipleActiveItemComponent',
            code: carouselMultipleActiveItemHtml
        }
    ];

    carouselNoIndicator: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-no-page-indicator',
            component: 'CarouselNoPageIndicatorComponent',
            code: carouselNoIndicatorTs
        },
        {
            language: 'html',
            fileName: 'carousel-no-page-indicator',
            component: 'CarouselNoPageIndicatorComponent',
            code: carouselNoIndicatorHtml
        }
    ];

    carouselHiddenNavigation: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-hidden-navigation',
            component: 'CarouselHiddenNavigationComponent',
            code: carouselHiddenNavigationTs
        },
        {
            language: 'html',
            fileName: 'carousel-hidden-navigation',
            component: 'CarouselHiddenNavigationComponent',
            code: carouselHiddenNavigationHtml
        }
    ];

    carouselContentNavigator: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-content-navigation',
            component: 'CarouselContentNavigationComponent',
            code: carouselContentNavigatorTs
        },
        {
            language: 'html',
            fileName: 'carousel-content-navigation',
            component: 'CarouselContentNavigationComponent',
            code: carouselContentNavigatorHtml
        }
    ];

    carouselLoopedNavigation: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-looped-navigation',
            component: 'CarouselLoopedNavigationComponent',
            code: carouselLoopedNavigationTs
        },
        {
            language: 'html',
            fileName: 'carousel-looped-navigation',
            component: 'CarouselLoopedNavigationComponent',
            code: carouselLoopedNavigationHtml
        }
    ];
}
