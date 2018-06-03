import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialTabsService {
  multi: boolean;
  selectedOptions: string[];

  constructor() {
    this.selectedOptions = [];
  }
}
