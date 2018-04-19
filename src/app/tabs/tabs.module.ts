import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDividerModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab.component';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';


@NgModule({
  imports: [
    CommonModule, FormsModule,
    FlexLayoutModule,
    MatListModule, MatDividerModule
  ],
  declarations: [TabsComponent, TabComponent, DynamicTabAnchorDirective],
  exports: [TabsComponent, TabComponent],
  entryComponents: [TabComponent]
})
export class TabsModule {
}
