import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }

  get(key: string): Todo[] {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem(key));
    }
    return null;
  }

  set(key: string, value: Todo[]): void {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  remove(key: string): void {
    //if you need to clean the local storage
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
    }
  }
}
