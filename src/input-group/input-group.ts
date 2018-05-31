import {Component, Directive, OnChanges, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'fd-input-group',
  host: {
    'class': ''
  },
  template: `
    <div class="fd-input-group" [ngClass]="{'fd-input-group--after': placement !== 'before',
        'fd-input-group--before': placement === 'before', 'fd-input-group--inline': inline === true }">
      <input [(ngModel)]="inputText" [disabled]="disabled" *ngIf="placement !== 'before'" type="text" class="" id="" 
             placeholder="{{placeholder}}">
      <span *ngIf="!button" class="fd-input-group__addon" [ngClass]="{'fd-input-group__addon--after': placement !== 'before', 
          'fd-input-group__addon--before': placement === 'before'}">
        <ng-container *ngIf="!glyph">{{addOnText}}</ng-container>
        <span *ngIf="glyph" [ngClass]="'sap-icon--' + glyph"></span>
      </span>
      <span *ngIf="button" class="fd-input-group__addon fd-input-group__addon--button"
            [ngClass]="{'fd-input-group__addon--after': placement !== 'before', 'fd-input-group__addon--before': placement === 'before'}">
        <button *ngIf="!glyph" (click)="buttonClicked($event)" class="fd-button--secondary">{{addOnText}}</button>
        <button *ngIf="glyph" (click)="buttonClicked($event)" class="fd-button--icon fd-button--secondary"
                [ngClass]="'sap-icon--' + glyph"></button>
      </span>
      <input [(ngModel)]="inputText" *ngIf="placement === 'before'" [disabled]="disabled" type="text" class="" id="" 
             placeholder="{{placeholder}}">
    </div>
  `
})
export class InputGroup {

  @Input()
  placement: string;

  @Input()
  inline: boolean;

  @Input()
  placeholder: string;

  @Input()
  addOnText: string;

  @Input()
  glyph: string;

  @Input()
  inputText: string;

  @Input()
  button: boolean;

  @Output()
  addOnButtonClicked: EventEmitter<any> = new EventEmitter<any>();

  buttonClicked($event) {
    this.addOnButtonClicked.emit($event);
  }

}

@Component({
  selector: 'fd-input-group-number',
  host: {
    'class': ''
  },
  template: `
    <div class="fd-input-group fd-input-group--after">
      <input class="" type="number" name="" [disabled]="disabled" [(ngModel)]="inputText" placeholder="{{placeholder}}"/>
      <span class="fd-input-group__addon fd-input-group__addon--button fd-input-group__addon fd-input-group__addon--after">
        <button class="fd-input-group__button fd-input-group__button--step-up" 
                aria-label="Step up" 
                (click)="stepUpClicked()"></button>
        <button class="fd-input-group__button fd-input-group__button--step-down" 
                aria-label="Step down" 
                (click)="stepDownClicked()"></button>
      </span>
    </div>
  `
})
export class InputGroupNumber {

  @Input()
  disabled: boolean;

  @Input()
  inputText: number;

  @Input()
  placeholder: string;

  getInput() {
    return this.inputText;
  }

  stepUpClicked() {
    this.inputText++;
  }

  stepDownClicked() {
    this.inputText--;
  }

}

@Component({
  selector: 'fd-input-group-search',
  host: {
    'class': ''
  },
  template: `
    <div class="fd-input-group">
      <input class="" type="search" id="search-2" name="" [disabled]="disabled" [(ngModel)]="inputText" placeholder="{{placeholder}}"/>
      <span class="fd-input-group__addon fd-input-group__addon--button fd-input-group__addon">
        <button *ngIf="inputText"
                class="fd-input-group__button fd-input-group__button--clear" 
                aria-label="Clear" 
                (click)="inputText = '';"></button>
      </span>
    </div>
  `
})
export class InputGroupSearch {

  @Input()
  disabled: boolean;

  @Input()
  inputText: string;

  @Input()
  placeholder;

  getInput() {
    return this.inputText;
  }

}
