import { Directive, HostListener, Component, Input } from '@angular/core';

@Component({
    selector: 'fd-dropdown',
    host: {
        class: 'fd-dropdown'
    },
    template: `
  <div class="fd-dropdown">
    <ng-container *ngIf="isContextualMenu">
      <button 
              [attr.aria-controls]="id"
              [attr.aria-expanded]="isOpen"
              [attr.aria-label]="'More'"
              [disabled]="disabled"
              aria-haspopup="true"
              [ngClass]="{' fd-button fd-button--secondary fd-button--l sap-icon--vertical-grip' : true}">
        <ng-content></ng-content>
      </button>
    </ng-container>
    <ng-container *ngIf="!isContextualMenu">
      <button class="fd-dropdown__control fd-button--toolbar"
              [attr.aria-controls]="id"
              [attr.aria-expanded]="isOpen"   
              [disabled]="disabled"
              aria-haspopup="true"
              [ngClass]="(glyph ? 'sap-icon--' + glyph + ' ' : ' ') + (size ? 'fd-button--' + size : '')">
        <ng-content></ng-content>
      </button>
    </ng-container>
    <nav class="fd-dropdown__menu" 
              [attr.aria-hidden]="(this.disabled === true ? true : !isOpen)" 
              [id]="id" [ngClass]="(isContextualMenu ? ' fd-contextual-menu' : '')">
      <ul class="fd-dropdown__list">
        <li *ngFor="let item of items"></li>
        <ng-content select="fd-dropdown-item"></ng-content>
        <ng-content select="fd-dropdown-group"></ng-content>
      </ul>
    </nav>
</div>
  `
})
export class Dropdown {
    @Input() id = 123;

    @Input() disabled;

    @Input() glyph;

    @Input() size;

    isOpen = false;
    @HostListener('click')
    toggleOpen() {
        this.isOpen = !this.isOpen;
    }

    @Input() isContextualMenu: boolean = false;
}

@Component({
    selector: 'fd-dropdown-item',
    template: `
      <a class="fd-dropdown__item" style="cursor: pointer;"><ng-content></ng-content></a>
  `
})
export class DropdownItem {}

@Component({
    selector: 'fd-dropdown-group',
    host: {
        class: 'fd-dropdown__group'
    },
    template: `
    <ng-content></ng-content>
  `
})
export class DropdownGroup {}

@Directive({
    selector: '[fd-dropdown-control]',
    host: {
        class: 'fd-dropdown__control'
    }
})
export class DropdownControl {}

@Directive({
    selector: '[fd-dropdown-control-no-border]',
    host: {
        class: 'fd-dropdown__control--no-border'
    }
})
export class DropdownControlNoBorder {}

@Directive({
    selector: 'fd-dropdown-header',
    host: {
        class: 'fd-dropdown__title',
        role: 'separator'
    }
})
export class DropdownGroupHeader {}
