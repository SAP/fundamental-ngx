import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FdTranslatePipe } from './pipes/fd-translate.pipe';
import { FdPatchLanguageDirective } from './directives/patch-language.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [FdTranslatePipe, FdPatchLanguageDirective],
    exports: [FdTranslatePipe, FdPatchLanguageDirective]
})
export class I18nModule {}
