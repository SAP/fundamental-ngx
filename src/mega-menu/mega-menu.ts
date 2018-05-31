import {Component, HostListener, Input} from '@angular/core';

@Component({
  selector: 'fd-mega-menu',
  template: `
    <nav class="fd-mega-menu">
      <ng-content></ng-content>
    </nav>
  `
}) export class MegaMenu { }

@Component({
  selector: 'fd-mega-menu-group',
  template: `
    <div class="fd-mega-menu__group">
      <ng-content select="fd-mega-menu-title"></ng-content>
      <ng-content select="fd-mega-menu-list"></ng-content>
    </div>
  `
}) export class MegaMenuGroup { }

@Component({
  selector: 'fd-mega-menu-title',
  template: `
    <h1 class="fd-mega-menu__title">
      <ng-content></ng-content>
    </h1>
  `
}) export class MegaMenuTitle { }

@Component({
  selector: 'fd-mega-menu-list',
  template: `
    <ul class="fd-mega-menu__list">
      <ng-content></ng-content>
    </ul>
  `
}) export class MegaMenuList { }

@Component({
  selector: 'fd-mega-menu-item',
  template: `
    <li class="fd-mega-menu__item">
      <ng-content select="fd-mega-menu-link"></ng-content>
      <ng-content select="fd-mega-menu-sublist"></ng-content>
    </li>
  `
}) export class MegaMenuItem { }

@Component({
  selector: 'fd-mega-menu-link',
  template: `
    <a class="fd-mega-menu__link " [ngClass]="{'has-child': hasSublist === true}" [attr.aria-haspopup]="hasSublist" 
       [attr.href]="url ? url : null" (click)="sublistIsOpen = !sublistIsOpen" [attr.aria-expanded]="sublistIsOpen" 
       style="cursor: pointer;">
      <ng-content></ng-content>
    </a>
    <ul class="fd-mega-menu__sublist" *ngIf="hasSublist" [attr.aria-hidden]="!sublistIsOpen">
      <ng-content select="fd-mega-menu-subitem"></ng-content>
    </ul>
  `
}) export class MegaMenuLink {

  @Input()
  url: string;

  @Input()
  hasSublist: boolean;

  sublistIsOpen = false;

}

@Component({
  selector: 'fd-mega-menu-sublist',
  template: `
    <ul class="fd-mega-menu__sublist">
      <ng-content></ng-content>
    </ul>
  `
}) export class MegaMenuSubList { }

@Component({
  selector: 'fd-mega-menu-subitem',
  template: `
    <li class="fd-mega-menu__subitem">
      <a class="fd-mega-menu__sublink" href="{{url}}">
        <ng-content></ng-content>
      </a>
    </li>
  `
}) export class MegaMenuSubItem {

  @Input()
  url: string;

}
