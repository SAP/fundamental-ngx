import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusableBehaviorModule } from './directives/focusable/focusable.directive';
import { DisabledBehaviorModule } from './directives/disabled/disabled.directive';
import { ReadonlyBehaviorModule } from './directives/readonly/readonly.directive';

@NgModule({
    imports: [CommonModule, FocusableBehaviorModule, DisabledBehaviorModule, ReadonlyBehaviorModule],
    exports: [FocusableBehaviorModule, DisabledBehaviorModule, ReadonlyBehaviorModule]
})
export class CdkModule {}
