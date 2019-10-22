import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'
import { AlertComponentAsContentExampleComponent } from './alert-component-as-content-example.component';
import { AlertContentComponent } from './alert-content.component';


@NgModule({
    declarations: [
        AlertComponentAsContentExampleComponent, AlertContentComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([{ path: '#', component: AlertComponentAsContentExampleComponent }],
            { useHash: true }),
        ReactiveFormsModule,
        FundamentalNgxCoreModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AlertComponentAsContentExampleComponent],
    entryComponents: [AlertContentComponent, AlertComponentAsContentExampleComponent

    ]

})
export class AppModule { }
