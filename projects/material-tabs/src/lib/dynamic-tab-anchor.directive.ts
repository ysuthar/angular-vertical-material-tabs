import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[verticalDynamicTabAnchor]'
})
export class DynamicTabAnchorDirective {
  constructor(public viewContainer: ViewContainerRef) {
  }
}
