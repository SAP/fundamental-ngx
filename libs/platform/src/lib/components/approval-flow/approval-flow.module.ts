import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalFlowComponent } from './approval-flow.component';


@NgModule({
    declarations: [ApprovalFlowComponent],
    imports: [
        CommonModule
    ],
    exports: [
        ApprovalFlowComponent
    ]
})
export class PlatformApprovalFlowModule {
}
