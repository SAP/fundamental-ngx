
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule, Routes } from '@angular/router'
import { ModalComponentAsContentExampleComponent } from './modal-component-as-content-example.component';
import { ModalContentComponent } from './modal-content.component';



@NgModule({
    declarations: [
        ModalComponentAsContentExampleComponent,
        ModalContentComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([{ path: '#', component: ModalComponentAsContentExampleComponent }],
            { useHash: true }),
        CdkTableModule,
        ReactiveFormsModule,
        FundamentalNgxCoreModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [ModalComponentAsContentExampleComponent],
    entryComponents: [
        ModalContentComponent, ModalComponentAsContentExampleComponent
    ]
})
export class AppModule { }
