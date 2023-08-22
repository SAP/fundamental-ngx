import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { CarouselModule } from '@fundamental-ngx/core/carousel';
import { CardModule } from '@fundamental-ngx/core/card';
import { ListModule } from '@fundamental-ngx/core/list';
import { TableModule } from '@fundamental-ngx/core/table';
import { MessagePageModule } from '@fundamental-ngx/core/message-page';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { CarouselHeaderComponent } from './carousel-header/carousel-header.component';
import { CarouselDocsComponent } from './carousel-docs.component';
import { CarouselOneActiveItemExampleComponent } from './examples/carousel-one-active-item-example.component';
import { CarouselDynamicItemsExampleComponent } from './examples/carousel-dynamic-items-example.component';
import { CarouselVerticalDirectionExampleComponent } from './examples/carousel-vertical-direction-example.component';
import { CarouselNoPageIndicatorExampleComponent } from './examples/carousel-no-page-indicator-example.component';
import { CarouselMultipleActiveItemExampleComponent } from './examples/carousel-multiple-active-item-example.component';
import { CarouselHiddenNavigationExampleComponent } from './examples/carousel-hidden-navigation-example.component';
import { CarouselContentNavigationExampleComponent } from './examples/carousel-content-navigation-example.component';
import { CarouselLoopedNavigationExampleComponent } from './examples/carousel-looped-navigation-example.component';
import { CarouselErrorMessageExampleComponent } from './examples/carousel-error-message-example.component';
import { CarouselLoadingContentExampleComponent } from './examples/carousel-loading-content-example.component';
import { CarouselAutoSlidesExampleComponent } from './examples/carousel-auto-slides-example.component';
import { CarouselBackgroundExampleComponent } from './examples/carousel-background-example.component';

const routes: Routes = [
    {
        path: '',
        component: CarouselHeaderComponent,
        children: [
            { path: '', component: CarouselDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.carousel } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        CarouselModule,
        CardModule,
        ListModule,
        SegmentedButtonModule,
        TableModule,
        MessagePageModule,
        ToolbarModule
    ],
    exports: [RouterModule],
    declarations: [
        CarouselDocsComponent,
        CarouselHeaderComponent,
        CarouselOneActiveItemExampleComponent,
        CarouselDynamicItemsExampleComponent,
        CarouselVerticalDirectionExampleComponent,
        CarouselMultipleActiveItemExampleComponent,
        CarouselNoPageIndicatorExampleComponent,
        CarouselHiddenNavigationExampleComponent,
        CarouselContentNavigationExampleComponent,
        CarouselLoopedNavigationExampleComponent,
        CarouselErrorMessageExampleComponent,
        CarouselLoadingContentExampleComponent,
        CarouselAutoSlidesExampleComponent,
        CarouselBackgroundExampleComponent
    ],
    providers: [currentComponentProvider('carousel')]
})
export class CarouselDocsModule {}
