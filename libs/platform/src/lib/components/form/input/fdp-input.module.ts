import { NgModule } from '@angular/core';
import { InputComponent } from './input.component';
import { CommonModule } from '@angular/common';
import { FormModule } from '@fundamental-ngx/core';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [InputComponent],
    imports: [CommonModule, FormModule, FormsModule],
    exports: [InputComponent]
})
export class PlatformInputModule {}
