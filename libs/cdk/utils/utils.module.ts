import { NgModule } from '@angular/core';
import {
    AutoCompleteModule,
    BreakpointModule,
    ClickedDirective,
    DisabledBehaviorModule,
    FocusableGridModule,
    FocusableItemModule,
    FocusableListModule,
    InitialFocusModule,
    IntersectionSpyDirective,
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
import { RtlService } from './services/rtl.service';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
        FocusableItemModule,
        FocusableListModule,
        FocusableGridModule,
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
        ClickedDirective,
        InitialFocusModule,
        BreakpointModule,
        IntersectionSpyDirective
    ],
    exports: [
        FocusableItemModule,
        FocusableListModule,
        FocusableGridModule,
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
        ClickedDirective,
        InitialFocusModule,
        BreakpointModule,
        IntersectionSpyDirective
    ],
    providers: [RtlService]
})
export class UtilsModule {}
