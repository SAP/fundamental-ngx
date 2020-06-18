import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationEditorComponent } from './localization-editor.component';
import { PopoverModule } from '../popover/popover.module';
import { InputGroupModule } from '../input-group/input-group.module';
import {
    LocalizationEditorInputDirective,
    LocalizationEditorLabel,
    LocalizationEditorElement,
    LocalizationEditorLoadLabel,
    LocalizationEditorTextareaDirective
} from './localization-editor.directives';
import { LocalizationEditorMainComponent } from './localization-editor-main/localization-editor-main.component';
import { LocalizationEditorItemComponent } from './localization-editor-item/localization-editor-item.component';
import { ButtonModule } from '../button/button.module';
import { ListModule } from '../list/list.module';

@NgModule({
    declarations: [
        LocalizationEditorComponent,
        LocalizationEditorMainComponent,
        LocalizationEditorItemComponent,
        LocalizationEditorInputDirective,
        LocalizationEditorLabel,
        LocalizationEditorLoadLabel,
        LocalizationEditorTextareaDirective,
        LocalizationEditorElement
    ],
    exports: [
        LocalizationEditorComponent,
        LocalizationEditorItemComponent,
        LocalizationEditorMainComponent,
        LocalizationEditorInputDirective,
        LocalizationEditorLabel,
        LocalizationEditorLoadLabel,
        LocalizationEditorTextareaDirective,
        LocalizationEditorElement
    ],
    imports: [CommonModule, PopoverModule, InputGroupModule, ListModule, ButtonModule]
})
export class LocalizationEditorModule {}
