/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { MaterialTabsService } from './material-tabs.service';
var MaterialTabComponent = /** @class */ (function () {
    function MaterialTabComponent(tabsService) {
        this.tabsService = tabsService;
        this.active = false;
        this.isCloseable = false;
    }
    MaterialTabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vertical-material-tab',
                    template: "<div *ngIf=\"active\" class=\"pane\">\n  <h3 class=\"tab-heading\" *ngIf=\"tabsService.multi && tabsService.selectedOptions.length > 1\">\n    {{tabTitle}}\n  </h3>\n  <ng-content></ng-content>\n  <ng-container *ngIf=\"template\"\n                [ngTemplateOutlet]=\"template\"\n                [ngTemplateOutletContext]=\"{person: dataContext}\">\n  </ng-container>\n</div>\n",
                    styles: ["\n    .pane {\n      padding: 1em;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    MaterialTabComponent.ctorParameters = function () { return [
        { type: MaterialTabsService, },
    ]; };
    MaterialTabComponent.propDecorators = {
        "tabTitle": [{ type: Input },],
        "active": [{ type: Input },],
        "template": [{ type: Input },],
        "dataContext": [{ type: Input },],
        "isCloseable": [{ type: Input },],
    };
    return MaterialTabComponent;
}());
export { MaterialTabComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtdGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLXRhYnMvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwtdGFiLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBc0I1RCw4QkFBbUIsV0FBZ0M7UUFBaEMsZ0JBQVcsR0FBWCxXQUFXLENBQXFCO3NCQUlqQyxLQUFLOzJCQUdBLEtBQUs7S0FOM0I7O2dCQXJCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLDJYQVVYO29CQUNDLE1BQU0sRUFBRSxDQUFDLCtDQUlSLENBQUM7aUJBQ0g7Ozs7Z0JBcEJRLG1CQUFtQjs7OzZCQXlCekIsS0FBSzsyQkFDTCxLQUFLOzZCQUNMLEtBQUs7Z0NBQ0wsS0FBSztnQ0FDTCxLQUFLOzsrQkEvQlI7O1NBdUJhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWF0ZXJpYWxUYWJzU2VydmljZSB9IGZyb20gJy4vbWF0ZXJpYWwtdGFicy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndmVydGljYWwtbWF0ZXJpYWwtdGFiJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiYWN0aXZlXCIgY2xhc3M9XCJwYW5lXCI+XG4gIDxoMyBjbGFzcz1cInRhYi1oZWFkaW5nXCIgKm5nSWY9XCJ0YWJzU2VydmljZS5tdWx0aSAmJiB0YWJzU2VydmljZS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMVwiPlxuICAgIHt7dGFiVGl0bGV9fVxuICA8L2gzPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0ZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cGVyc29uOiBkYXRhQ29udGV4dH1cIj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BcbiAgICAucGFuZSB7XG4gICAgICBwYWRkaW5nOiAxZW07XG4gICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbFRhYkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJzU2VydmljZTogTWF0ZXJpYWxUYWJzU2VydmljZSkge1xuICB9XG5cbiAgQElucHV0KCkgdGFiVGl0bGU6IHN0cmluZztcbiAgQElucHV0KCkgYWN0aXZlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRlbXBsYXRlO1xuICBASW5wdXQoKSBkYXRhQ29udGV4dDtcbiAgQElucHV0KCkgaXNDbG9zZWFibGUgPSBmYWxzZTtcbn1cbiJdfQ==