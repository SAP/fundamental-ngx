import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPlatformComponent } from './select.component';
import { SelectModule, IconModule } from '@fundamental-ngx/core';
@NgModule({
    declarations: [SelectPlatformComponent],
    imports: [
        CommonModule, SelectModule, IconModule
    ],
    exports: [SelectPlatformComponent]
})
export class PlatformSelectModule {}
