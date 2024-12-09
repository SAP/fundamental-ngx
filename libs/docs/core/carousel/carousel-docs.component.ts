import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { CarouselAutoSlidesExampleComponent } from './examples/carousel-auto-slides-example.component';
import { CarouselBackgroundExampleComponent } from './examples/carousel-background-example.component';
import { CarouselContentNavigationExampleComponent } from './examples/carousel-content-navigation-example.component';
import { CarouselDynamicItemsExampleComponent } from './examples/carousel-dynamic-items-example.component';
import { CarouselErrorMessageExampleComponent } from './examples/carousel-error-message-example.component';
import { CarouselHiddenNavigationExampleComponent } from './examples/carousel-hidden-navigation-example.component';
import { CarouselLoadingContentExampleComponent } from './examples/carousel-loading-content-example.component';
import { CarouselLoopedNavigationExampleComponent } from './examples/carousel-looped-navigation-example.component';
import { CarouselMultipleActiveItemExampleComponent } from './examples/carousel-multiple-active-item-example.component';
import { CarouselNoPageIndicatorExampleComponent } from './examples/carousel-no-page-indicator-example.component';
import { CarouselOneActiveItemExampleComponent } from './examples/carousel-one-active-item-example.component';
import { CarouselVerticalDirectionExampleComponent } from './examples/carousel-vertical-direction-example.component';

const carouselExampleScss = 'carousel-example.component.scss';

const carouselOneActiveItemTs = 'carousel-one-active-item-example.component.ts';
const carouselOneActiveItemHtml = 'carousel-one-active-item-example.component.html';
const carouselVerticalTs = 'carousel-vertical-direction-example.component.ts';
const carouselVerticalHtml = 'carousel-vertical-direction-example.component.html';
const carouselMultipleActiveItemTs = 'carousel-multiple-active-item-example.component.ts';
const carouselMultipleActiveItemHtml = 'carousel-multiple-active-item-example.component.html';
const carouselDynamicItemsTs = 'carousel-dynamic-items-example.component.ts';
const carouselDynamicItemsHtml = 'carousel-dynamic-items-example.component.html';
const carouselNoIndicatorTs = 'carousel-no-page-indicator-example.component.ts';
const carouselNoIndicatorHtml = 'carousel-no-page-indicator-example.component.html';
const carouselHiddenNavigationTs = 'carousel-hidden-navigation-example.component.ts';
const carouselHiddenNavigationHtml = 'carousel-hidden-navigation-example.component.html';
const carouselContentNavigatorTs = 'carousel-content-navigation-example.component.ts';
const carouselContentNavigatorHtml = 'carousel-content-navigation-example.component.html';
const carouselLoopedNavigationTs = 'carousel-looped-navigation-example.component.ts';
const carouselLoopedNavigationHtml = 'carousel-looped-navigation-example.component.html';
const carouselErrorMessageTs = 'carousel-error-message-example.component.ts';
const carouselErrorMessageHtml = 'carousel-error-message-example.component.html';
const carouselLoadingContentTs = 'carousel-loading-content-example.component.ts';
const carouselLoadingContentHtml = 'carousel-loading-content-example.component.html';
const carouselAutoSlidesTs = 'carousel-auto-slides-example.component.ts';
const carouselAutoSlidesHtml = 'carousel-auto-slides-example.component.html';
const carouselBackgroundTs = 'carousel-background-example.component.ts';
const carouselBackgroundHtml = 'carousel-background-example.component.html';

@Component({
    selector: 'app-input',
    templateUrl: './carousel-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CarouselOneActiveItemExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        CarouselVerticalDirectionExampleComponent,
        CarouselMultipleActiveItemExampleComponent,
        CarouselDynamicItemsExampleComponent,
        CarouselNoPageIndicatorExampleComponent,
        CarouselHiddenNavigationExampleComponent,
        CarouselContentNavigationExampleComponent,
        CarouselLoopedNavigationExampleComponent,
        CarouselErrorMessageExampleComponent,
        CarouselLoadingContentExampleComponent,
        CarouselAutoSlidesExampleComponent,
        CarouselBackgroundExampleComponent
    ]
})
export class CarouselDocsComponent {
    carouselSingle: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'carousel-one-active-item-example',
            component: 'CarouselOneActiveItemExampleComponent',
            code: getAssetFromModuleAssets(carouselOneActiveItemHtml),
            scssFileCode: getAssetFromModuleAssets(carouselExampleScss)
        },
        {
            language: 'typescript',
            fileName: 'carousel-one-active-item-example',
            component: 'CarouselOneActiveItemExampleComponent',
            code: getAssetFromModuleAssets(carouselOneActiveItemTs)
        }
    ];

    carouselVertical: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'carousel-vertical-direction-example',
            component: 'CarouselVerticalDirectionExampleComponent',
            code: getAssetFromModuleAssets(carouselVerticalHtml),
            scssFileCode: getAssetFromModuleAssets(carouselExampleScss)
        },
        {
            language: 'typescript',
            fileName: 'carousel-vertical-direction-example',
            component: 'CarouselVerticalDirectionExampleComponent',
            code: getAssetFromModuleAssets(carouselVerticalTs)
        }
    ];

    carouselMultiItem: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-multiple-active-item-example',
            component: 'CarouselMultipleActiveItemExampleComponent',
            code: getAssetFromModuleAssets(carouselMultipleActiveItemTs),
            scssFileCode: getAssetFromModuleAssets(carouselExampleScss)
        },
        {
            language: 'html',
            fileName: 'carousel-multiple-active-item-example',
            component: 'CarouselMultipleActiveItemExampleComponent',
            code: getAssetFromModuleAssets(carouselMultipleActiveItemHtml),
            scssFileCode: getAssetFromModuleAssets(carouselExampleScss)
        }
    ];

    carouselDynamicItems: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-dynamic-items-example',
            component: 'CarouselDynamicItemsExampleComponent',
            code: getAssetFromModuleAssets(carouselDynamicItemsTs)
        },
        {
            language: 'html',
            fileName: 'carousel-dynamic-items-example',
            component: 'CarouselDynamicItemsExampleComponent',
            code: getAssetFromModuleAssets(carouselDynamicItemsHtml),
            scssFileCode: getAssetFromModuleAssets(carouselExampleScss)
        }
    ];

    carouselNoIndicator: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-no-page-indicator-example',
            component: 'CarouselNoPageIndicatorExampleComponent',
            code: getAssetFromModuleAssets(carouselNoIndicatorTs)
        },
        {
            language: 'html',
            fileName: 'carousel-no-page-indicator-example',
            component: 'CarouselNoPageIndicatorExampleComponent',
            code: getAssetFromModuleAssets(carouselNoIndicatorHtml),
            scssFileCode: getAssetFromModuleAssets(carouselExampleScss)
        }
    ];

    carouselHiddenNavigation: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-hidden-navigation-example',
            component: 'CarouselHiddenNavigationExampleComponent',
            code: getAssetFromModuleAssets(carouselHiddenNavigationTs)
        },
        {
            language: 'html',
            fileName: 'carousel-hidden-navigation-example',
            component: 'CarouselHiddenNavigationExampleComponent',
            code: getAssetFromModuleAssets(carouselHiddenNavigationHtml),
            scssFileCode: getAssetFromModuleAssets(carouselExampleScss)
        }
    ];

    carouselContentNavigator: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-content-navigation-example',
            component: 'CarouselContentNavigationExampleComponent',
            code: getAssetFromModuleAssets(carouselContentNavigatorTs)
        },
        {
            language: 'html',
            fileName: 'carousel-content-navigation-example',
            component: 'CarouselContentNavigationExampleComponent',
            code: getAssetFromModuleAssets(carouselContentNavigatorHtml),
            scssFileCode: getAssetFromModuleAssets(carouselExampleScss)
        }
    ];

    carouselLoopedNavigation: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-looped-navigation-example',
            component: 'CarouselLoopedNavigationExampleComponent',
            code: getAssetFromModuleAssets(carouselLoopedNavigationTs)
        },
        {
            language: 'html',
            fileName: 'carousel-looped-navigation-example',
            component: 'CarouselLoopedNavigationExampleComponent',
            code: getAssetFromModuleAssets(carouselLoopedNavigationHtml),
            scssFileCode: getAssetFromModuleAssets(carouselExampleScss)
        }
    ];

    carouselErrorMessage: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-error-message-example',
            component: 'CarouselErrorMessageExampleComponent',
            code: getAssetFromModuleAssets(carouselErrorMessageTs)
        },
        {
            language: 'html',
            fileName: 'carousel-error-message-example',
            component: 'CarouselErrorMessageExampleComponent',
            code: getAssetFromModuleAssets(carouselErrorMessageHtml),
            scssFileCode: getAssetFromModuleAssets(carouselExampleScss)
        }
    ];

    carouselLoadingContent: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-loading-content-example',
            component: 'CarouselLoadingContentExampleComponent',
            code: getAssetFromModuleAssets(carouselLoadingContentTs)
        },
        {
            language: 'html',
            fileName: 'carousel-loading-content-example',
            component: 'CarouselLoadingContentExampleComponent',
            code: getAssetFromModuleAssets(carouselLoadingContentHtml),
            scssFileCode: getAssetFromModuleAssets(carouselExampleScss)
        }
    ];

    carouselAutoSlides: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-auto-slides-example',
            component: 'CarouselAutoSlidesExampleComponent',
            code: getAssetFromModuleAssets(carouselAutoSlidesTs)
        },
        {
            language: 'html',
            fileName: 'carousel-auto-slides-example',
            component: 'CarouselAutoSlidesExampleComponent',
            code: getAssetFromModuleAssets(carouselAutoSlidesHtml),
            scssFileCode: getAssetFromModuleAssets(carouselExampleScss)
        }
    ];

    backgroundExample: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'carousel-background-example',
            component: 'CarouselBackgroundExampleComponent',
            code: getAssetFromModuleAssets(carouselBackgroundTs)
        },
        {
            language: 'html',
            fileName: 'carousel-background-example',
            component: 'CarouselBackgroundExampleComponent',
            code: getAssetFromModuleAssets(carouselBackgroundHtml),
            scssFileCode: getAssetFromModuleAssets(carouselExampleScss)
        }
    ];
}
