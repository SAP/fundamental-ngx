import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectIdentifierComponent } from './object-identifier.component';
import { ObjectIdentifierTitleDirective } from './object-identifier-title.directive';

@NgModule({
    declarations: [ObjectIdentifierComponent, ObjectIdentifierTitleDirective],
    imports: [CommonModule],
    exports: [ObjectIdentifierComponent, ObjectIdentifierTitleDirective]
})
export class ObjectIdentifierModule {}
