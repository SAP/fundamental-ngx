import { Component } from '@angular/core';
import carouselOneActiveItemTs from '!./examples/carousel-one-active-item-example.component.ts?raw';
import carouselOneActiveItemHtml from '!./examples/carousel-one-active-item-example.component.html?raw';
import carouselVerticalTs from '!./examples/carousel-vertical-direction-example.component.ts?raw';
import carouselVerticalHtml from '!./examples/carousel-vertical-direction-example.component.html?raw';
import carouselMultipleActiveItemTs from '!./examples/carousel-multiple-active-item-example.component.ts?raw';
import carouselMultipleActiveItemHtml from '!./examples/carousel-multiple-active-item-example.component.html?raw';
import carouselDynamicItemsTs from '!./examples/carousel-dynamic-items-example.component.ts?raw';
import carouselDynamicItemsHtml from '!./examples/carousel-dynamic-items-example.component.html?raw';
import carouselNoIndicatorTs from '!./examples/carousel-no-page-indicator-example.component.ts?raw';
import carouselNoIndicatorHtml from '!./examples/carousel-no-page-indicator-example.component.html?raw';
import carouselHiddenNavigationTs from '!./examples/carousel-hidden-navigation-example.component.ts?raw';
import carouselHiddenNavigationHtml from '!./examples/carousel-hidden-navigation-example.component.html?raw';
import carouselContentNavigatorTs from '!./examples/carousel-content-navigation-example.component.ts?raw';
import carouselContentNavigatorHtml from '!./examples/carousel-content-navigation-example.component.html?raw';
import carouselLoopedNavigationTs from '!./examples/carousel-looped-navigation-example.component.ts?raw';
import carouselLoopedNavigationHtml from '!./examples/carousel-looped-navigation-example.component.html?raw';
import carouselErrorMessageTs from '!./examples/carousel-error-message-example.component.ts?raw';
import carouselErrorMessageHtml from '!./examples/carousel-error-message-example.component.html?raw';
import carouselLoadingContentTs from '!./examples/carousel-loading-content-example.component.ts?raw';
import carouselLoadingContentHtml from '!./examples/carousel-loading-content-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-input',
    templateUrl: './carousel-docs.component.html'
})
export class CarouselDocsComponent {
    carouselSingle: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'carousel-one-active-item-example',
            component: 'CarouselOneActiveItemExampleComponent',
            code: carouselOneActiveItemHtml
        },
        {
            language: 'typescript',
            fileName: 'carousel-one-active-item-example',
            component: 'CarouselOneActiveItemExampleComponent',
            code: carouselOneActiveItemTs
        }
    ];

    carouselVertical: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'carousel-vertical-direction-example',
            component: 'CarouselVerticalDirectionExampleComponent',
            code: carouselVerticalHtml
        },
        {
            language: 'typescript',
            fileName: 'carousel-vertical-direction-example',
            component: 'CarouselVerticalDirectionExampleComponent',
            code: carouselVerticalTs
        }
    ];

    carouselMultiItem: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-multiple-active-item-example',
            component: 'CarouselMultipleActiveItemExampleComponent',
            code: carouselMultipleActiveItemTs
        },
        {
            language: 'html',
            fileName: 'carousel-multiple-active-item-example',
            component: 'CarouselMultipleActiveItemExampleComponent',
            code: carouselMultipleActiveItemHtml
        }
    ];

    carouselDynamicItems: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-dynamic-items-example',
            component: 'CarouselDynamicItemsExampleComponent',
            code: carouselDynamicItemsTs
        },
        {
            language: 'html',
            fileName: 'carousel-dynamic-items-example',
            component: 'CarouselDynamicItemsExampleComponent',
            code: carouselDynamicItemsHtml
        }
    ];

    carouselNoIndicator: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-no-page-indicator-example',
            component: 'CarouselNoPageIndicatorExampleComponent',
            code: carouselNoIndicatorTs
        },
        {
            language: 'html',
            fileName: 'carousel-no-page-indicator-example',
            component: 'CarouselNoPageIndicatorExampleComponent',
            code: carouselNoIndicatorHtml
        }
    ];

    carouselHiddenNavigation: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-hidden-navigation-example',
            component: 'CarouselHiddenNavigationExampleComponent',
            code: carouselHiddenNavigationTs
        },
        {
            language: 'html',
            fileName: 'carousel-hidden-navigation-example',
            component: 'CarouselHiddenNavigationExampleComponent',
            code: carouselHiddenNavigationHtml
        }
    ];

    carouselContentNavigator: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-content-navigation-example',
            component: 'CarouselContentNavigationExampleComponent',
            code: carouselContentNavigatorTs
        },
        {
            language: 'html',
            fileName: 'carousel-content-navigation-example',
            component: 'CarouselContentNavigationExampleComponent',
            code: carouselContentNavigatorHtml
        }
    ];

    carouselLoopedNavigation: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-looped-navigation-example',
            component: 'CarouselLoopedNavigationExampleComponent',
            code: carouselLoopedNavigationTs
        },
        {
            language: 'html',
            fileName: 'carousel-looped-navigation-example',
            component: 'CarouselLoopedNavigationExampleComponent',
            code: carouselLoopedNavigationHtml
        }
    ];

    carouselErrorMessage: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-error-message-example',
            component: 'CarouselErrorMessageExampleComponent',
            code: carouselErrorMessageTs
        },
        {
            language: 'html',
            fileName: 'carousel-error-message-example',
            component: 'CarouselErrorMessageExampleComponent',
            code: carouselErrorMessageHtml
        }
    ];

    carouselLoadingContent: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-loading-content-example',
            component: 'CarouselLoadingContentExampleComponent',
            code: carouselLoadingContentTs
        },
        {
            language: 'html',
            fileName: 'carousel-loading-content-example',
            component: 'CarouselLoadingContentExampleComponent',
            code: carouselLoadingContentHtml
        }
    ];
}
