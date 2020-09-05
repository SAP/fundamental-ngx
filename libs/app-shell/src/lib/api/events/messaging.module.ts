import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';

@NgModule({
    imports: [
        CommonModule,
        NgxPubSubModule
    ]
})
export class MessagingModule {


}
