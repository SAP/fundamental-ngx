import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FdTranslatePipe } from './pipes/fd-translate.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [FdTranslatePipe],
    exports: [FdTranslatePipe]
})
export class I18nModule {}
