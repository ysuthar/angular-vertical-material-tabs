import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TabsModule } from './tabs/tabs.module';
import { PeopleModule } from './people/people.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FlexLayoutModule, TabsModule, PeopleModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
