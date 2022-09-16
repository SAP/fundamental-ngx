import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FdTranslatePipe } from './pipes';
import { FdPatchLanguageDirective } from './directives';

@NgModule({
    imports: [CommonModule],
    declarations: [FdTranslatePipe, FdPatchLanguageDirective],
    exports: [FdTranslatePipe, FdPatchLanguageDirective]
})
export class I18nModule {}
