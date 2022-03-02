import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusableListModule } from './focusable-list/focusable-list.module';
import { ResizeBehaviorModule } from './resize/resize.module';
import { DisabledBehaviorModule } from './disabled/disabled-behavior.module';
import { ReadonlyBehaviorModule } from './readonly/readonly-behavior.module';
import { ClickedBehaviorModule } from './clicked/clicked-behavior.module';

@NgModule({
    imports: [
        CommonModule,
        FocusableListModule,
        DisabledBehaviorModule,
        ReadonlyBehaviorModule,
        ClickedBehaviorModule,
        ResizeBehaviorModule
    ],
    exports: [
        FocusableListModule,
        DisabledBehaviorModule,
        ReadonlyBehaviorModule,
        ClickedBehaviorModule,
        ResizeBehaviorModule
    ]
})
export class CdkModule {}
