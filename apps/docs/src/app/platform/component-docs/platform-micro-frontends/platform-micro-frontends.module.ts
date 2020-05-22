import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { PageNotFoundComponent } from './platform-micro-frontends-examples/page-not-found/page-not-found.component';
import { MicroFrontendsWrapperComponent, MicroFrontendsRouterSinkComponent } from '@fundamental-ngx/platform'
import { PlatformMicroFrontendsModule } from '@fundamental-ngx/platform';
import { PlatformMicroFrontendsHeaderComponent } from './platform-micro-frontends-header/platform-micro-frontends-header.component';
import { PlatformMicroFrontendsDocsComponent } from './platform-micro-frontends-docs.component';
import { PlatformMicroFrontendsBasicExampleComponent } from './platform-micro-frontends-examples/platform-micro-frontends-basic-example.component';

const appRoutes: Routes = [
    {
        path: 'heroes', component: MicroFrontendsWrapperComponent,
        data: {
            appType: 'microapp',
            src: 'microapps/hero.main.js',
            stylesheet: ['microapps/theme.css', 'microapps/hero.main.css'],
            customTag: 'hero-list',
            elParameters: []
        },
        children: [{
            path: '**',
            component: MicroFrontendsRouterSinkComponent
        }]
    },
    {
        path: 'crisis', component: MicroFrontendsWrapperComponent,
        data: {
            appType: 'microapp',
            src: 'microapps/crisis.main.js',
            stylesheet: ['microapps/theme.css', 'microapps/crisis.main.css'],
            customTag: 'cri-sis',
            elParameters: []
        },
        children: [{
            path: '**',
            component: MicroFrontendsRouterSinkComponent
        }]
    },
    {
        path: 'vue', component: MicroFrontendsWrapperComponent,
        data: {
            appType: 'microapp',
            src: ['microapps/vue.js'],
            stylesheet: ['microapps/theme.css', 'microapps/vue.css'],
            customTag: 'vue-element',
            elParameters: [{ key: 'sessionid', value: '888' }]
        },
        children: [{
            path: '**',
            component: MicroFrontendsRouterSinkComponent
        }]
    },
    {
        path: 'reactapp', component: MicroFrontendsWrapperComponent,
        data: {
            appType: 'microapp',
            src: 'microapps/react.main.js',
            stylesheet: ['microapps/theme.css', 'microapps/react.main.css'],
            customTag: 'react-element',
            elParameters: []
        }
    },
    {
        path: 'ptable', component: MicroFrontendsWrapperComponent,
        data: {
            appType: 'microapp',
            src: 'microapps/ptable.main.js',
            stylesheet: ['microapps/theme.css', 'microapps/ptable.main.css'],
            customTag: 'prime-table',
            elParameters: []
        }
    },
    { path: '**', component: PageNotFoundComponent }
];

const routes: Routes = [
    {
        path: '',
        component: PlatformMicroFrontendsHeaderComponent,
        children: [
            {
                path: 'example', component: PlatformMicroFrontendsDocsComponent,
                children: appRoutes
            },
            {   path: 'api', component: ApiComponent, data: { content: API_FILES.microFrontends } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, PlatformMicroFrontendsModule],
    exports: [RouterModule],
    declarations: [
        PageNotFoundComponent,
        PlatformMicroFrontendsBasicExampleComponent,
        PlatformMicroFrontendsDocsComponent,
        PlatformMicroFrontendsHeaderComponent
    ]
})
export class PlatformMicroFrontendsDocsModule { }
