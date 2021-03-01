import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule, DynamicSideContentModule, FormModule } from '@fundamental-ngx/core';
import { HomeComponent } from './home.component';

const routes: Routes = [{
    path: '',
    component: HomeComponent,
    data: {
        title: 'Home'
    }
}];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        ButtonModule,
        DynamicSideContentModule,
        FormModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class HomeModule {}
