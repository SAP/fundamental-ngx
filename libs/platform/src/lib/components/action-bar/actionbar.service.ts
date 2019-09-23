import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActionbarService {

  private isEditTitle = new BehaviorSubject<boolean>(false);
  private isEditModeOn = new BehaviorSubject<boolean>(false);


  castEditTitle = this.isEditTitle.asObservable();
  castEditMode = this.isEditModeOn.asObservable();
  constructor() { }

  setEditTitle(isTitleEditable: boolean) {
    this.isEditTitle.next(isTitleEditable)
  }

  setEditMode(isEditModeOn: boolean) {
    console.log("From service:", isEditModeOn);
    this.isEditModeOn.next(isEditModeOn);
  }


}
