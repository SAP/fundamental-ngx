import { AfterViewInit, Component, ContentChild, Directive, HostListener, Input, ViewChild } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-content]',
    host: {
        class: 'fd-list__content'
    }
})
export class ListContentDirective {
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-thumbnail]',
    host: {
        '[class.fd-list__thumbnail]': 'true'
    }
})
export class ListContentThumbnail {
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-byline-text-left]',
    host: {
        class: 'fd-list__byline-left'
    }
})
export class ListBylineTextLeftDirective {
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-byline-text-right]',
    host: {
        class: 'fd-list__byline-right'
    }
})
export class ListBylineTextRightDirective {
}

@Component({
    // tslint:disable-next-line:directive-selector
    selector: 'fd-byline-text',
    host: {
        class: 'fd-list__byline',
        '[class.fd-list__byline--2-col]': 'hasColumns'
    },
    template: `
        <ng-content></ng-content>

        <ng-container #textLeft>
            <ng-content select="[fd-byline-text-left]"></ng-content>
        </ng-container>

        <ng-container #textRight>
            <ng-content select="[fd-byline-text-right]"></ng-content>
        </ng-container>
    `
})
export class ListBylineTextDirective {

    @ContentChild(ListBylineTextLeftDirective)
    @ContentChild(ListBylineTextRightDirective)
    set setHasColumns(directive: ListBylineTextLeftDirective | ListBylineTextRightDirective) {
        this.hasColumns = !!directive;
    }

    hasColumns: boolean = false;
}

let bylineUniqueId: number = 0;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'li[fd-byline]',
    host: {
        class: 'fd-list__item',
        role: 'listitem',
        tabindex: '0',
        '[attr.id]': 'id',
        '[class.is-selected]': 'isSelected'
    },
    template: `
        <div class="fd-form-item fd-list__form-item" (click)="$event.stopPropagation()">
            <input tabindex="-1" type="checkbox" class="fd-checkbox" [id]="id + '-checkbox'" [(ngModel)]="isSelected">
            <label class="fd-checkbox__label" [for]="id + '-checkbox'"></label>
        </div>

        <ng-content select="[fd-list-thumbnail]"></ng-content>

        <ng-content select="[fd-list-content]"></ng-content>
    `
})
export class ListBylineComponent {

    @Input()
    isSelected: boolean = false;

    @Input()
    id: string = `fd-byline-${bylineUniqueId++}`;

    @HostListener('click')
    checkListElement(): void {
        this.isSelected = !this.isSelected;
    }
}
