import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core';
import { ButtonComponent } from './button.component';

@NgModule({
    imports: [CommonModule, ButtonModule],
    exports: [ButtonComponent],
    declarations: [ButtonComponent]
})
export class PlatformButtonModule { }
