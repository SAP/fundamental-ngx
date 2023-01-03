import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FormsComponent],
    exports: [FormsComponent]
})
export class FormsModule {}
