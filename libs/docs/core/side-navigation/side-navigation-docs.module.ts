import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { SideNavigationCondensedExampleComponent } from './examples/side-navigation-condensed-example/side-navigation-condensed-example.component';
import { SideNavigationCondensedObjectExampleComponent } from './examples/side-navigation-condensed-object-example/side-navigation-condensed-object-example.component';
import {
    SideNavigationCompactExampleComponent,
    SideNavigationExampleComponent,
    SideNavigationIconsExampleComponent,
    SideNavigationTitlesExampleComponent
} from './examples/side-navigation-examples.component';
import { SideNavigationMultipleSelectedExampleComponent } from './examples/side-navigation-multiple-selected-example/side-navigation-multiple-selected-example.component';
import { SideNavigationObjectExampleComponent } from './examples/side-navigation-object-example/side-navigation-object-example.component';
import { SideNavigationProgrammaticallyExampleComponent } from './examples/side-navigation-programmatically-example/side-navigation-programmatically-example.component';
import { SideNavigationThreeLevelsExampleComponent } from './examples/side-navigation-three-levels-example/side-navigation-three-levels-example.component';
import { SideNavigationDocsComponent } from './side-navigation-docs.component';
import { SideNavigationHeaderComponent } from './side-navigation-header/side-navigation-header.component';

import { SideNavigationNonSelectableExampleComponent } from './examples/side-navigation-non-selectable-example/side-navigation-non-selectable-example.component';

const routes: Routes = [
    {
        path: '',
        component: SideNavigationHeaderComponent,
        children: [
            { path: '', component: SideNavigationDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.sideNavigation } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        SideNavigationModule,
        SideNavigationDocsComponent,
        SideNavigationHeaderComponent,
        SideNavigationExampleComponent,
        SideNavigationIconsExampleComponent,
        SideNavigationObjectExampleComponent,
        SideNavigationTitlesExampleComponent,
        SideNavigationCompactExampleComponent,
        SideNavigationCondensedExampleComponent,
        SideNavigationThreeLevelsExampleComponent,
        SideNavigationCondensedObjectExampleComponent,
        SideNavigationProgrammaticallyExampleComponent,
        SideNavigationMultipleSelectedExampleComponent,
        SideNavigationNonSelectableExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('side-navigation')]
})
export class SideNavigationDocsModule {}
