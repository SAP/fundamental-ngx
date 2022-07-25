import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RtlService } from './services/rtl.service';
import { ThemesService } from './services/themes.service';
import { KeyboardSupportService } from './services/keyboard-support/keyboard-support.service';
import { FocusTrapService } from './services/focus-trap.service';

@NgModule({
    imports: [CommonModule],
    exports: [],
    providers: [RtlService, ThemesService, KeyboardSupportService, FocusTrapService]
})
export class UtilsModule {}
