import { Inject, Injectable, NgZone } from '@angular/core';
import { DndRef } from './dnd.ref';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DragDrop, DragRef } from '@angular/cdk/drag-drop';

@Injectable()
export class DndService {

  private _dndItems$$: BehaviorSubject<DragRef[]> = new BehaviorSubject<DragRef[]>([]);

  get dndItems$(): Observable<DragRef[]> {
    return this._dndItems$$.asObservable();
  }

  constructor(
      private _dragDrop: DragDrop,
  ) {}


  createDrag(dragRef: DragRef): void {
    const items = this._dndItems$$.getValue();
    items.push(dragRef);
    this._dndItems$$.next(items);
  }

  removeDrag(dragRef: DragRef): void {
    const items = this._dndItems$$.getValue();
    const filteredItems = items.filter(item => item !== dragRef);
    this._dndItems$$.next(filteredItems);
  }


/*

  private _dndItems$$: BehaviorSubject<DndRef[]> = new BehaviorSubject<DndRef[]>([]);

  get dndItems$(): Observable<DndRef[]> {
    return this._dndItems$$.asObservable();
  }

  constructor(
      private _ngZone: NgZone,
      @Inject(DOCUMENT) private _document: any,
  ) {}


  createDrag(element: HTMLElement): DndRef {
    const dndRef = new DndRef(element, this._document, this._ngZone);
    const items = this._dndItems$$.getValue();
    items.push(dndRef);
    this._dndItems$$.next(items);
    return dndRef;
  }

  removeDrag(dndRef: DndRef): void {
    const items = this._dndItems$$.getValue();
    const filteredItems = items.filter(item => item !== dndRef);
    this._dndItems$$.next(filteredItems);
  }*/
}
