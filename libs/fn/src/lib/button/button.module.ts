import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@fundamental-ngx/core/icon';
import { DisabledBehaviorModule, ReadonlyBehaviorModule } from '@fundamental-ngx/cdk/utils';

@NgModule({
    declarations: [ButtonComponent],
    imports: [CommonModule, IconModule, FormsModule, DisabledBehaviorModule, ReadonlyBehaviorModule],
    exports: [ButtonComponent, DisabledBehaviorModule, ReadonlyBehaviorModule]
})
export class ButtonModule {}
