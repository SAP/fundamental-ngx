import { NgModule } from '@angular/core';
import { FdTranslatePipe } from './pipes';
import { FdPatchLanguageDirective } from './directives';

@NgModule({
    imports: [FdTranslatePipe, FdPatchLanguageDirective],
    exports: [FdTranslatePipe, FdPatchLanguageDirective]
})
export class I18nModule {}
