import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule, CardModule, ListModule, TableModule, SegmentedButtonModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
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
        TableModule
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
        CarouselLoadingContentExampleComponent
    ]
})
export class CarouselDocsModule {}
