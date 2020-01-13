import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPlatformComponent } from './input.component';
import { FormModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [InputPlatformComponent],
    imports: [
        CommonModule,
        FormModule
    ],
    exports: [InputPlatformComponent]
})
export class PlatformInputModule { }
