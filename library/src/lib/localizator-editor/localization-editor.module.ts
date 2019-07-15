import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationEditorComponent } from './localization-editor.component';
import { PopoverModule } from '../popover';
import { FormModule } from '../form';
import { InputGroupModule } from '../input-group';
import { MenuModule } from '../menu';
import {
    LocalizationEditorInputDirective,
    LocalizationEditorLabel,
    LocalizationEditorElement,
    LocalizationEditorLoadLabel,
    LocalizationEditorTextareaDirective
} from './localization-editor.directives';
import { LocalizationEditorMainComponent } from './localization-editor-main/localization-editor-main.component';
import { LocalizationEditorItemComponent } from './localization-editor-item/localization-editor-item.component';

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
    imports: [CommonModule, PopoverModule, FormModule, InputGroupModule, MenuModule]
})
export class LocalizationEditorModule {}
