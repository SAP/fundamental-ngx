import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPlatformComponent } from './select-platform.component';
import { SelectModule, PipeModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [SelectPlatformComponent],
    imports: [
        CommonModule, SelectModule, PipeModule
    ], exports: [SelectPlatformComponent]
})
export class SelectPlatformModule { }
