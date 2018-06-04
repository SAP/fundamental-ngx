import { Directive, HostListener, Component, Input } from '@angular/core';

@Component({
    selector: 'fd-dropdown',
    host: {
        class: 'fd-dropdown'
    },
    templateUrl: './dropdown.component.html'
})
export class DropdownComponent {
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
