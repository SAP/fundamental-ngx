import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPlatformComponent } from './select.component';
import { SelectModule } from '@fundamental-ngx/core';
@NgModule({
    declarations: [SelectPlatformComponent],
    imports: [
        CommonModule, SelectModule
    ],
    exports: [SelectPlatformComponent]
})
export class PlatformSelectModule {}
