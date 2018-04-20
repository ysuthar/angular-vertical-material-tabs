import { Component, Input } from '@angular/core';

import { TabsService } from './tabs.service';

@Component({
  selector: 'vertical-tab',
  styles: [
    `
    .pane {
      padding: 1em;
    }
  `
  ],
  templateUrl: './tab.component.html'
})
export class TabComponent {
  constructor(public tabsService: TabsService)  {
  }

  @Input() tabTitle: string;
  @Input() active = false;
  @Input() template;
  @Input() dataContext;
  @Input() isCloseable = false;
}
