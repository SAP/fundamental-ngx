import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { 
    CONTROL, 
    DOWN_ARROW,  
    LEFT_ARROW, 
    RIGHT_ARROW, 
    UP_ARROW 
} from '@angular/cdk/keycodes';
import { KeyUtil } from '@fundamental-ngx/core/utils';
import { DndKeyboardGroupDirective } from '../dnd-keyboard-group/dnd-keyboard-group.directive';

@Directive({ selector: '[fdDndKeyboardItem]' })
export class DndKeyboardItemDirective implements OnInit {
    /** item index in group(column) */
    @Input()
    itemIndex: number;
    
    /** group(column) index */
    @Input()
    groupIndex: number;

    constructor(
        private _dndGroup: DndKeyboardGroupDirective, 
        private _elementRef: ElementRef, 
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._dndGroup._onDndItemFocus$.subscribe(([groupIndex, itemIndex]) => {
            if (this.groupIndex === groupIndex && this.itemIndex === itemIndex) {
                this._elementRef.nativeElement.focus();
            }
        });
    }
    
    /** @hidden disabled possibility to move card */
    @HostListener('keyup', ['$event'])
    _onKeyUp(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, CONTROL)) {
            this._dndGroup._enableKeyboard = false;
            this._dndGroup._onDndItemFocus$.unsubscribe();
            this._dndGroup._onDndItemFocus$ = new Subject<[number, number]>();
        }
    }

    /** @hidden allow card movement using keyboard */
    @HostListener('keydown', ['$event'])
    _onKeyDown(event: KeyboardEvent): void {
        const group = this._dndGroup.groups[this.groupIndex];
        if (KeyUtil.isKeyCode(event, CONTROL)) {
            this._dndGroup._enableKeyboard = true;
        }
        if (KeyUtil.isKeyCode(event, RIGHT_ARROW) 
            && this._dndGroup._enableKeyboard 
            && this._dndGroup.groups.length !== this.groupIndex + 1) {
                event.preventDefault();
                const nextGroup = this._dndGroup.groups[this.groupIndex + 1];
                const nextGroupIndex = this.groupIndex + 1;
                transferArrayItem(group, nextGroup, this.itemIndex, 0);   
                this._dndGroup.focusDndItem(nextGroupIndex, 0);
        } 
        if (KeyUtil.isKeyCode(event, DOWN_ARROW) 
            && this._dndGroup._enableKeyboard) { 
                event.preventDefault();        
                moveItemInArray(group, this.itemIndex, this.itemIndex + 1);
                this._dndGroup.focusDndItem(this.groupIndex, this.itemIndex + 1);
        } 
        if (KeyUtil.isKeyCode(event, UP_ARROW) 
            && this._dndGroup._enableKeyboard) {
                event.preventDefault();
                moveItemInArray(group, this.itemIndex, this.itemIndex - 1);
                this._dndGroup.focusDndItem(this.groupIndex, this.itemIndex - 1);
        } 
        if (KeyUtil.isKeyCode(event, LEFT_ARROW) 
            && this._dndGroup._enableKeyboard 
            && this.groupIndex) {
                event.preventDefault();
                const nextGroup = this._dndGroup.groups[this.groupIndex - 1];
                const nextGroupIndex = this.groupIndex - 1;
                transferArrayItem(group, nextGroup, this.itemIndex, 0);
                this._dndGroup.focusDndItem(nextGroupIndex, 0);
        }
    }
}
