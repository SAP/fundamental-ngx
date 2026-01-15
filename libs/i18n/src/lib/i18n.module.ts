import { NgModule } from '@angular/core';
import { FdPatchLanguageDirective } from './directives';
import { FdTranslatePipe } from './pipes';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [FdTranslatePipe, FdPatchLanguageDirective],
    exports: [FdTranslatePipe, FdPatchLanguageDirective]
})
export class I18nModule {}
