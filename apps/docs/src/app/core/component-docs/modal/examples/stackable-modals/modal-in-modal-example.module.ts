import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { RouterModule, Routes } from '@angular/router'
import { ModalInModalComponent } from './modal-in-modal-stacked-example.component';
import { ModalInModalFirstComponent } from './modal-in-modal-first-example.component';
import { ModalInModalSecondComponent } from './modal-in-modal-second-example.component';
import { ModalService, ModalRef } from '@fundamental-ngx/core';



@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([{ path: '#', component: ModalInModalComponent }],
            { useHash: true }),
        ReactiveFormsModule,
        FundamentalNgxCoreModule,
        BrowserAnimationsModule
    ],
    providers: [ModalService, ModalRef],
    entryComponents: [
        ModalInModalSecondComponent,
        ModalInModalFirstComponent,
        ModalInModalComponent,
    ],
    bootstrap: [ModalInModalComponent]
})
export class AppModule { }
