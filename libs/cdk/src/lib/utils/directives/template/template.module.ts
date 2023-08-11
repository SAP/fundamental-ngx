import { NgModule } from '@angular/core';
import { TemplateDirective } from './template.directive';

@NgModule({
    imports: [TemplateDirective],
    exports: [TemplateDirective]
})
export class TemplateModule {}
