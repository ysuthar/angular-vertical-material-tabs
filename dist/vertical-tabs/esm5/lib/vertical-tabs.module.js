/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDividerModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VerticalTabsComponent } from './vertical-tabs.component';
import { VerticalTabComponent } from './vertical-tab.component';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { VerticalTabsService } from './vertical-tabs.service';
var VerticalTabsModule = /** @class */ (function () {
    function VerticalTabsModule() {
    }
    /**
     * @return {?}
     */
    VerticalTabsModule.forRoot = /**
     * @return {?}
     */
    function () {
        return { ngModule: VerticalTabsModule, providers: [VerticalTabsService] };
    };
    VerticalTabsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule, FormsModule,
                        FlexLayoutModule,
                        MatListModule, MatDividerModule, MatButtonModule
                    ],
                    entryComponents: [VerticalTabComponent],
                    declarations: [DynamicTabAnchorDirective, VerticalTabComponent, VerticalTabsComponent],
                    exports: [VerticalTabComponent, VerticalTabsComponent]
                },] },
    ];
    return VerticalTabsModule;
}());
export { VerticalTabsModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92ZXJ0aWNhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL3ZlcnRpY2FsLXRhYnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7SUFjOUMsMEJBQU87Ozs7UUFDbkIsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQzs7O2dCQVo3RSxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVksRUFBRSxXQUFXO3dCQUN6QixnQkFBZ0I7d0JBQ2hCLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlO3FCQUNqRDtvQkFDRCxlQUFlLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDdkMsWUFBWSxFQUFFLENBQUMseUJBQXlCLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLENBQUM7b0JBQ3RGLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLHFCQUFxQixDQUFDO2lCQUN2RDs7NkJBdkJEOztTQXdCYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdERpdmlkZXJNb2R1bGUsIE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5cbmltcG9ydCB7IFZlcnRpY2FsVGFic0NvbXBvbmVudCB9IGZyb20gJy4vdmVydGljYWwtdGFicy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJDb21wb25lbnQgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSB9IGZyb20gJy4vZHluYW1pYy10YWItYW5jaG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi92ZXJ0aWNhbC10YWJzLnNlcnZpY2UnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSwgTWF0RGl2aWRlck1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1ZlcnRpY2FsVGFiQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSwgVmVydGljYWxUYWJDb21wb25lbnQsIFZlcnRpY2FsVGFic0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtWZXJ0aWNhbFRhYkNvbXBvbmVudCwgVmVydGljYWxUYWJzQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbFRhYnNNb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHsgbmdNb2R1bGU6IFZlcnRpY2FsVGFic01vZHVsZSwgcHJvdmlkZXJzOiBbVmVydGljYWxUYWJzU2VydmljZV0gfTtcbiAgfVxufVxuIl19