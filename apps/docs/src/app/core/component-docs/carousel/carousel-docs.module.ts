import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule, CardModule, ListModule, TableModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { CarouselHeaderComponent } from './carousel-header/carousel-header.component';
import { CarouselDocsComponent } from './carousel-docs.component';
import { CarouselOneActiveItemComponent } from './examples/carousel-one-active-item.component';
import { CarouselVerticalDirectionComponent } from './examples/carousel-vertical-direction.component';
import { CarouselNoPageIndicatorComponent } from './examples/carousel-no-page-indicator.component';
import { CarouselMultipleActiveItemComponent } from './examples/carousel-multiple-active-item.component';
import { CarouselHiddenNavigationComponent } from './examples/carousel-hidden-navigation.component';
import { CarouselContentNavigationComponent } from './examples/carousel-content-navigation.component';
import { CarouselLoopedNavigationComponent } from './examples/carousel-looped-navigation.component';
import { CarouselErrorMessageComponent } from './examples/carousel-error-message.component';

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
        TableModule
    ],
    exports: [RouterModule],
    declarations: [
        CarouselDocsComponent,
        CarouselHeaderComponent,
        CarouselOneActiveItemComponent,
        CarouselVerticalDirectionComponent,
        CarouselMultipleActiveItemComponent,
        CarouselNoPageIndicatorComponent,
        CarouselHiddenNavigationComponent,
        CarouselContentNavigationComponent,
        CarouselLoopedNavigationComponent,
        CarouselErrorMessageComponent
    ]
})
export class CarouselDocsModule {}
