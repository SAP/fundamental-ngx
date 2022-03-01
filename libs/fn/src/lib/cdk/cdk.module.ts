import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusableBehaviorModule } from './focusable-list/focusable-behavior.module';
import { DisabledBehaviorModule } from './directives/disabled/disabled.directive';
import { ReadonlyBehaviorModule } from './directives/readonly/readonly.directive';
import { ClickedBehaviorModule } from './directives/clicked/clicked.directive';
import { ResizeBehaviorModule } from './resize/resize.module';

@NgModule({
    imports: [
        CommonModule,
        FocusableBehaviorModule,
        DisabledBehaviorModule,
        ReadonlyBehaviorModule,
        ClickedBehaviorModule,
        ResizeBehaviorModule
    ],
    exports: [
        FocusableBehaviorModule,
        DisabledBehaviorModule,
        ReadonlyBehaviorModule,
        ClickedBehaviorModule,
        ResizeBehaviorModule
    ]
})
export class CdkModule {}
