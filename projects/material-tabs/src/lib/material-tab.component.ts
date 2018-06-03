import { Component, Input } from '@angular/core';

import { MaterialTabsService } from './material-tabs.service';

@Component({
  selector: 'vertical-material-tab',
  templateUrl: './material-tab.component.html',
  styles: [`
    .pane {
      padding: 1em;
    }
  `]
})
export class MaterialTabComponent {
  constructor(public tabsService: MaterialTabsService) {
  }

  @Input() tabTitle: string;
  @Input() active = false;
  @Input() template;
  @Input() dataContext;
  @Input() isCloseable = false;
}
