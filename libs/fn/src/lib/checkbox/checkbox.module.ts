import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxLabelDirective } from './checkbox-label.directive';

@NgModule({
    declarations: [CheckboxComponent, CheckboxLabelDirective],
    imports: [CommonModule, FormsModule],
    exports: [CheckboxComponent, CheckboxLabelDirective]
})
export class CheckboxModule {}
