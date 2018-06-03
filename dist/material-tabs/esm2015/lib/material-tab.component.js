/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { MaterialTabsService } from './material-tabs.service';
export class MaterialTabComponent {
    /**
     * @param {?} tabsService
     */
    constructor(tabsService) {
        this.tabsService = tabsService;
        this.active = false;
        this.isCloseable = false;
    }
}
MaterialTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'vertical-material-tab',
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
MaterialTabComponent.ctorParameters = () => [
    { type: MaterialTabsService, },
];
MaterialTabComponent.propDecorators = {
    "tabTitle": [{ type: Input },],
    "active": [{ type: Input },],
    "template": [{ type: Input },],
    "dataContext": [{ type: Input },],
    "isCloseable": [{ type: Input },],
};
function MaterialTabComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MaterialTabComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MaterialTabComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MaterialTabComponent.propDecorators;
    /** @type {?} */
    MaterialTabComponent.prototype.tabTitle;
    /** @type {?} */
    MaterialTabComponent.prototype.active;
    /** @type {?} */
    MaterialTabComponent.prototype.template;
    /** @type {?} */
    MaterialTabComponent.prototype.dataContext;
    /** @type {?} */
    MaterialTabComponent.prototype.isCloseable;
    /** @type {?} */
    MaterialTabComponent.prototype.tabsService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtdGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLXRhYnMvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwtdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFxQjlELE1BQU07Ozs7SUFDSixZQUFtQixXQUFnQztRQUFoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBcUI7c0JBSWpDLEtBQUs7MkJBR0EsS0FBSztLQU4zQjs7O1lBckJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Q0FVWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQzs7OztHQUlSLENBQUM7YUFDSDs7OztZQXBCUSxtQkFBbUI7Ozt5QkF5QnpCLEtBQUs7dUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzRCQUNMLEtBQUs7NEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWF0ZXJpYWxUYWJzU2VydmljZSB9IGZyb20gJy4vbWF0ZXJpYWwtdGFicy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndmVydGljYWwtbWF0ZXJpYWwtdGFiJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiYWN0aXZlXCIgY2xhc3M9XCJwYW5lXCI+XG4gIDxoMyBjbGFzcz1cInRhYi1oZWFkaW5nXCIgKm5nSWY9XCJ0YWJzU2VydmljZS5tdWx0aSAmJiB0YWJzU2VydmljZS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMVwiPlxuICAgIHt7dGFiVGl0bGV9fVxuICA8L2gzPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0ZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cGVyc29uOiBkYXRhQ29udGV4dH1cIj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BcbiAgICAucGFuZSB7XG4gICAgICBwYWRkaW5nOiAxZW07XG4gICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbFRhYkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJzU2VydmljZTogTWF0ZXJpYWxUYWJzU2VydmljZSkge1xuICB9XG5cbiAgQElucHV0KCkgdGFiVGl0bGU6IHN0cmluZztcbiAgQElucHV0KCkgYWN0aXZlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRlbXBsYXRlO1xuICBASW5wdXQoKSBkYXRhQ29udGV4dDtcbiAgQElucHV0KCkgaXNDbG9zZWFibGUgPSBmYWxzZTtcbn1cbiJdfQ==