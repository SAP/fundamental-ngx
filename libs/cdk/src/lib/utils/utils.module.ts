import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RtlService } from './services/rtl.service';
import { ThemesService } from './services/themes.service';
import { KeyboardSupportService } from './services/keyboard-support/keyboard-support.service';
import { FocusTrapService } from './services/focus-trap.service';
import {
    AutoCompleteModule,
    ClickedBehaviorModule,
    DisabledBehaviorModule,
    FocusableItemModule,
    FocusableListModule,
    LineClampModule,
    OnlyDigitsModule,
    OverflowListModule,
    ReadonlyBehaviorModule,
    RepeatModule,
    ResizeModule,
    SelectableListModule,
    TemplateModule,
    TruncateModule
} from './directives';
import { DragAndDropModule } from './drag-and-drop/drag-and-drop.module';

@NgModule({
    imports: [
        CommonModule,
        FocusableItemModule,
        FocusableListModule,
        DragAndDropModule,
        OnlyDigitsModule,
        TruncateModule,
        LineClampModule,
        OverflowListModule,
        RepeatModule,
        ResizeModule,
        TemplateModule,
        AutoCompleteModule,
        DisabledBehaviorModule,
        SelectableListModule,
        ReadonlyBehaviorModule,
        ClickedBehaviorModule,
        FocusableListModule,
        FocusableItemModule,
        DisabledBehaviorModule
    ],
    exports: [
        FocusableItemModule,
        FocusableListModule,
        DragAndDropModule,
        OnlyDigitsModule,
        TruncateModule,
        LineClampModule,
        OverflowListModule,
        RepeatModule,
        ResizeModule,
        TemplateModule,
        AutoCompleteModule,
        DisabledBehaviorModule,
        SelectableListModule,
        ReadonlyBehaviorModule,
        ClickedBehaviorModule,
        FocusableListModule,
        FocusableItemModule,
        DisabledBehaviorModule
    ],
    providers: [RtlService, ThemesService, KeyboardSupportService, FocusTrapService]
})
export class UtilsModule {}
