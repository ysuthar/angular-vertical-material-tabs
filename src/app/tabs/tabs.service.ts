import { Injectable } from '@angular/core';

@Injectable()
export class TabsService {
  multi: boolean;
  selectedOptions: string[];

  constructor() {
    this.selectedOptions = [];
  }
}
