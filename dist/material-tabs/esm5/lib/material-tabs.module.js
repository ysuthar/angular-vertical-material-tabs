/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatListModule } from '@angular/material';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { MaterialTabComponent } from './material-tab.component';
import { MaterialTabsComponent } from './material-tabs.component';
import { MaterialTabsService } from './material-tabs.service';
var MaterialTabsModule = /** @class */ (function () {
    function MaterialTabsModule() {
    }
    /**
     * @return {?}
     */
    MaterialTabsModule.forRoot = /**
     * @return {?}
     */
    function () {
        return { ngModule: MaterialTabsModule, providers: [MaterialTabsService] };
    };
    MaterialTabsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule, FormsModule,
                        FlexLayoutModule,
                        MatListModule, MatDividerModule, MatButtonModule
                    ],
                    entryComponents: [MaterialTabComponent],
                    declarations: [MaterialTabComponent, MaterialTabsComponent, DynamicTabAnchorDirective],
                    exports: [MaterialTabsComponent, MaterialTabComponent]
                },] },
    ];
    return MaterialTabsModule;
}());
export { MaterialTabsModule };
function MaterialTabsModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MaterialTabsModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MaterialTabsModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtdGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL21hdGVyaWFsLXRhYnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7SUFhOUMsMEJBQU87Ozs7UUFDbkIsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQzs7O2dCQVo3RSxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVksRUFBRSxXQUFXO3dCQUN6QixnQkFBZ0I7d0JBQ2hCLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlO3FCQUNqRDtvQkFDRCxlQUFlLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDdkMsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUseUJBQXlCLENBQUM7b0JBQ3RGLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLG9CQUFvQixDQUFDO2lCQUN2RDs7NkJBckJEOztTQXNCYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9keW5hbWljLXRhYi1hbmNob3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hdGVyaWFsVGFiQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsVGFic0NvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtdGFicy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxUYWJzU2VydmljZSB9IGZyb20gJy4vbWF0ZXJpYWwtdGFicy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTWF0ZXJpYWxUYWJDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRlcmlhbFRhYkNvbXBvbmVudCwgTWF0ZXJpYWxUYWJzQ29tcG9uZW50LCBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW01hdGVyaWFsVGFic0NvbXBvbmVudCwgTWF0ZXJpYWxUYWJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsVGFic01vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4geyBuZ01vZHVsZTogTWF0ZXJpYWxUYWJzTW9kdWxlLCBwcm92aWRlcnM6IFtNYXRlcmlhbFRhYnNTZXJ2aWNlXSB9O1xuICB9XG59XG4iXX0=