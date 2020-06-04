import { NgModule } from '@angular/core';
import { TemplateDirective } from './template.directive';

@NgModule({
    declarations: [TemplateDirective],
    exports: [TemplateDirective]
})
export class TemplateModule {}
