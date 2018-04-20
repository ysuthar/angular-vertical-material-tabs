import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDividerModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab.component';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { TabsService } from './tabs.service';


@NgModule({
  imports: [
    CommonModule, FormsModule,
    FlexLayoutModule,
    MatListModule, MatDividerModule, MatButtonModule
  ],
  declarations: [TabsComponent, TabComponent, DynamicTabAnchorDirective],
  // providers: [TabsService],
  exports: [TabsComponent, TabComponent],
  entryComponents: [TabComponent]
})
export class TabsModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: TabsModule, providers: [TabsService]};
  }
}
