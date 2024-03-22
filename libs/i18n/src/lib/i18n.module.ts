import { NgModule } from '@angular/core';
import { FdPatchLanguageDirective } from './directives';
import { FdTranslatePipe } from './pipes';

@NgModule({
    imports: [FdTranslatePipe, FdPatchLanguageDirective],
    exports: [FdTranslatePipe, FdPatchLanguageDirective]
})
export class I18nModule {}
