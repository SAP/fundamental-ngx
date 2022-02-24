import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { DisabledBehaviorModule, ReadonlyBehaviorModule } from '@fundamental-ngx/fn/cdk';

@NgModule({
    imports: [CommonModule, DisabledBehaviorModule, ReadonlyBehaviorModule],
    exports: [InputComponent],
    declarations: [InputComponent]
})
export class InputModule {}
