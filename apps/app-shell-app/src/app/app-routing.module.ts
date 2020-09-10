import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
    {
        path: '', component: LandingComponent,
        loadChildren: () => import('./components/pr-list/pr-list.module').then(m => {
            return m.PrListModule;
        })
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
