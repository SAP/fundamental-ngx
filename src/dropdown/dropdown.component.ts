import { Directive, Component, Input } from '@angular/core';

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

    @Input() isContextualMenu: boolean = false;

    isOpen = false;

    toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}

@Component({
    selector: 'fd-dropdown-item',
    template: `
      <a class="fd-dropdown__item" style="cursor: pointer;"><ng-content></ng-content></a>
  `
})
export class DropdownItemComponent {}

@Component({
    selector: 'fd-dropdown-group',
    host: {
        class: 'fd-dropdown__group'
    },
    template: `
    <ng-content></ng-content>
  `
})
export class DropdownGroupComponent {}

@Directive({
    selector: '[fd-dropdown-control]',
    host: {
        class: 'fd-dropdown__control'
    }
})
export class DropdownControlDirective {}

@Directive({
    selector: '[fd-dropdown-control-no-border]',
    host: {
        class: 'fd-dropdown__control--no-border'
    }
})
export class DropdownControlNoBorderDirective {}

@Directive({
    selector: 'fd-dropdown-header',
    host: {
        class: 'fd-dropdown__title',
        role: 'separator'
    }
})
export class DropdownGroupHeaderDirective {}
