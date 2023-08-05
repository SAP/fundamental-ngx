import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [CheckboxComponent],
    imports: [CommonModule, FormsModule, ContentDensityModule],
    exports: [CheckboxComponent, ContentDensityModule]
})
export class CheckboxModule {}
