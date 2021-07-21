import { Inject, Injectable, NgZone } from '@angular/core';
import { DndRef } from './dnd.ref';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class DndService {

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
  }
}
