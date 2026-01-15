import { NgModule } from '@angular/core';
import { TemplateDirective } from './template.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [TemplateDirective],
    exports: [TemplateDirective]
})
export class TemplateModule {}
