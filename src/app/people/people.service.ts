import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export interface IPerson {
  id: number;
  name: string;
  surname: string;
  twitter: string;
}

@Injectable()
export class PeopleService {
  constructor() {
  }

  getPeople(): Observable<IPerson[]> {
    return Observable.of([
      {
        id: 1,
        name: 'Juri',
        surname: 'Strumpflohner',
        twitter: '@juristr'
      }
    ]);
  }
}
