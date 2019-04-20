import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiInputComponent } from './multi-input.component';
import { TokenModule } from '../token/token.module';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { PopoverModule } from '../popover/popover.module';
import { SearchHighlightPipe } from '../utils/search-highlight.pipe';
import { DisplayFnPipe } from '../utils/displayFn.pipe';

@NgModule({
    declarations: [MultiInputComponent, SearchHighlightPipe, DisplayFnPipe],
    imports: [CommonModule, TokenModule, FormsModule, MenuModule, PopoverModule],
    exports: [MultiInputComponent]
})
export class MultiInputModule {}
