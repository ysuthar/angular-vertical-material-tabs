import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialTabsModule } from '../../projects/material-tabs/src/lib/material-tabs.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PeopleModule } from './people/people.module';
import { PeopleService } from './people/people.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialTabsModule.forRoot(),
    PeopleModule
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
