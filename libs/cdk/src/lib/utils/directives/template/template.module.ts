import { NgModule } from '@angular/core';
import { TemplateDirective, DeprecatedTemplateSelectorDirective } from './template.directive';

@NgModule({
    imports: [TemplateDirective, DeprecatedTemplateSelectorDirective],
    exports: [TemplateDirective, DeprecatedTemplateSelectorDirective]
})
export class TemplateModule {}
