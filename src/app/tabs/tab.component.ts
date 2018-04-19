import { Component, Input } from '@angular/core';

@Component({
  selector: 'vertical-tab',
  styles: [
    `
    .pane{
      padding: 1em;
    }
  `
  ],
  template: `
    <div *ngIf="active" class="pane">
      <ng-content></ng-content>
      <ng-container *ngIf="template"
                    [ngTemplateOutlet]="template"
                    [ngTemplateOutletContext]="{person: dataContext}">
      </ng-container>
    </div>
  `
})
export class TabComponent {
  @Input() tabTitle: string;
  @Input() active = false;
  @Input() template;
  @Input() dataContext;
  @Input() isCloseable = false;
}
