import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusableBehaviorModule } from './focusable-list/focusable-behavior.module';
import { ClickedBehaviorModule } from './directives/clicked/clicked.directive';
import { ResizeBehaviorModule } from './resize/resize.module';
import { DisabledBehaviorModule } from './disabled/disabled-behavior.module';
import { ReadonlyBehaviorModule } from './readonly/readonly-behavior.module';

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
