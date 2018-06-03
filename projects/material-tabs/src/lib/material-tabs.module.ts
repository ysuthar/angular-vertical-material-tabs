import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatListModule } from '@angular/material';

import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { MaterialTabComponent } from './material-tab.component';
import { MaterialTabsComponent } from './material-tabs.component';
import { MaterialTabsService } from './material-tabs.service';

@NgModule({
  imports: [
    CommonModule, FormsModule,
    FlexLayoutModule,
    MatListModule, MatDividerModule, MatButtonModule
  ],
  entryComponents: [MaterialTabComponent],
  declarations: [MaterialTabComponent, MaterialTabsComponent, DynamicTabAnchorDirective],
  exports: [MaterialTabsComponent, MaterialTabComponent]
})
export class MaterialTabsModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: MaterialTabsModule, providers: [MaterialTabsService] };
  }
}
