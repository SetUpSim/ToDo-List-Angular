import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppGlobalsService {
  private _editMode = new BehaviorSubject<boolean>(false);
  public isInEditMode = this._editMode.asObservable();

  constructor() {}

  setIsInEditMode(value: boolean) {
    this._editMode.next(value);
  }
}
