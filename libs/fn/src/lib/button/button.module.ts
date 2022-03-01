import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@fundamental-ngx/core/icon';
import { DisabledBehaviorModule, ReadonlyBehaviorModule } from '@fundamental-ngx/fn/cdk';

@NgModule({
    declarations: [ButtonComponent],
    imports: [CommonModule, IconModule, FormsModule, ReadonlyBehaviorModule, DisabledBehaviorModule],
    exports: [ButtonComponent, ReadonlyBehaviorModule, DisabledBehaviorModule]
})
export class ButtonModule {}
