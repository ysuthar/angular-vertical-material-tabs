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
export class VerticalTabsModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: VerticalTabsModule, providers: [VerticalTabsService] };
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92ZXJ0aWNhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL3ZlcnRpY2FsLXRhYnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFhOUQsTUFBTTs7OztJQUNHLE1BQU0sQ0FBQyxPQUFPO1FBQ25CLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7Ozs7WUFaN0UsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZLEVBQUUsV0FBVztvQkFDekIsZ0JBQWdCO29CQUNoQixhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZTtpQkFDakQ7Z0JBQ0QsZUFBZSxFQUFFLENBQUMsb0JBQW9CLENBQUM7Z0JBQ3ZDLFlBQVksRUFBRSxDQUFDLHlCQUF5QixFQUFFLG9CQUFvQixFQUFFLHFCQUFxQixDQUFDO2dCQUN0RixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxxQkFBcUIsQ0FBQzthQUN2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0RGl2aWRlck1vZHVsZSwgTWF0TGlzdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuaW1wb3J0IHsgVmVydGljYWxUYWJzQ29tcG9uZW50IH0gZnJvbSAnLi92ZXJ0aWNhbC10YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWZXJ0aWNhbFRhYkNvbXBvbmVudCB9IGZyb20gJy4vdmVydGljYWwtdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9keW5hbWljLXRhYi1hbmNob3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IFZlcnRpY2FsVGFic1NlcnZpY2UgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYnMuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLCBNYXREaXZpZGVyTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbVmVydGljYWxUYWJDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlLCBWZXJ0aWNhbFRhYkNvbXBvbmVudCwgVmVydGljYWxUYWJzQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1ZlcnRpY2FsVGFiQ29tcG9uZW50LCBWZXJ0aWNhbFRhYnNDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFZlcnRpY2FsVGFic01vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4geyBuZ01vZHVsZTogVmVydGljYWxUYWJzTW9kdWxlLCBwcm92aWRlcnM6IFtWZXJ0aWNhbFRhYnNTZXJ2aWNlXSB9O1xuICB9XG59XG4iXX0=