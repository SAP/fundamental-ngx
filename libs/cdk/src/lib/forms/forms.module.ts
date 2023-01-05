import { NgModule } from '@angular/core';
import { CvaDirective } from './cva/cva.directive';

@NgModule({
    imports: [CvaDirective],
    exports: [CvaDirective]
})
export class FormsModule {}
