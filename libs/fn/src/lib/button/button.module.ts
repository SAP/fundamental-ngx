import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentalButtonComponent } from './button.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@fundamental-ngx/core/icon';

@NgModule({
    declarations: [ExperimentalButtonComponent],
    imports: [CommonModule, IconModule, FormsModule],
    exports: [ExperimentalButtonComponent]
})
export class ExperimentalButtonModule {}
