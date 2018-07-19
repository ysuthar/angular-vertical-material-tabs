/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { VerticalTabsService } from './vertical-tabs.service';
export class VerticalTabComponent {
    /**
     * @param {?} tabsService
     */
    constructor(tabsService) {
        this.tabsService = tabsService;
        this.active = false;
        this.isCloseable = false;
    }
}
VerticalTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-vertical-tab',
                template: `<div *ngIf="active" class="pane">
  <h3 class="tab-heading" *ngIf="tabsService.multi && tabsService.selectedOptions.length > 1">
    {{tabTitle}}
  </h3>
  <ng-content></ng-content>
  <ng-container *ngIf="template"
                [ngTemplateOutlet]="template"
                [ngTemplateOutletContext]="{person: dataContext}">
  </ng-container>
</div>
`,
                styles: [`
    .pane {
      padding: 1em;
    }
  `]
            },] },
];
/** @nocollapse */
VerticalTabComponent.ctorParameters = () => [
    { type: VerticalTabsService }
];
VerticalTabComponent.propDecorators = {
    tabTitle: [{ type: Input }],
    active: [{ type: Input }],
    template: [{ type: Input }],
    dataContext: [{ type: Input }],
    isCloseable: [{ type: Input }]
};
function VerticalTabComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    VerticalTabComponent.prototype.tabTitle;
    /** @type {?} */
    VerticalTabComponent.prototype.active;
    /** @type {?} */
    VerticalTabComponent.prototype.template;
    /** @type {?} */
    VerticalTabComponent.prototype.dataContext;
    /** @type {?} */
    VerticalTabComponent.prototype.isCloseable;
    /** @type {?} */
    VerticalTabComponent.prototype.tabsService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZlcnRpY2FsLXRhYnMvIiwic291cmNlcyI6WyJsaWIvdmVydGljYWwtdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFzQjlELE1BQU07Ozs7SUFDSixZQUFtQixXQUFnQztRQUFoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBcUI7c0JBSWpDLEtBQUs7MkJBR0EsS0FBSztLQU4zQjs7O1lBckJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Q0FVWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQzs7OztHQUlSLENBQUM7YUFDSDs7OztZQXJCUSxtQkFBbUI7Ozt1QkEwQnpCLEtBQUs7cUJBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZlcnRpY2FsVGFic1NlcnZpY2UgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYnMuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctdmVydGljYWwtdGFiJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiYWN0aXZlXCIgY2xhc3M9XCJwYW5lXCI+XG4gIDxoMyBjbGFzcz1cInRhYi1oZWFkaW5nXCIgKm5nSWY9XCJ0YWJzU2VydmljZS5tdWx0aSAmJiB0YWJzU2VydmljZS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMVwiPlxuICAgIHt7dGFiVGl0bGV9fVxuICA8L2gzPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0ZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cGVyc29uOiBkYXRhQ29udGV4dH1cIj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BcbiAgICAucGFuZSB7XG4gICAgICBwYWRkaW5nOiAxZW07XG4gICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbFRhYkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJzU2VydmljZTogVmVydGljYWxUYWJzU2VydmljZSkge1xuICB9XG5cbiAgQElucHV0KCkgdGFiVGl0bGU6IHN0cmluZztcbiAgQElucHV0KCkgYWN0aXZlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRlbXBsYXRlO1xuICBASW5wdXQoKSBkYXRhQ29udGV4dDtcbiAgQElucHV0KCkgaXNDbG9zZWFibGUgPSBmYWxzZTtcbn1cbiJdfQ==