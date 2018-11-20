import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NavbarGroupDirective } from './navbar-group.directive';
import { NavbarActionsDirective } from './navbar-actions.directive';
import { NavbarContextMenuDirective } from './navbar-context-menu.directive';

@NgModule({
    declarations: [NavbarComponent, NavbarGroupDirective, NavbarActionsDirective, NavbarContextMenuDirective],
    imports: [CommonModule],
    exports: [NavbarComponent, NavbarGroupDirective, NavbarActionsDirective, NavbarContextMenuDirective]
})
export class NavbarModule {}
