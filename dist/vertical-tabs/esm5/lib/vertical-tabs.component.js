/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ComponentFactoryResolver, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { VerticalTabComponent } from './vertical-tab.component';
import { VerticalTabsService } from './vertical-tabs.service';
var VerticalTabsComponent = /** @class */ (function () {
    function VerticalTabsComponent(componentFactoryResolver, tabService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.tabService = tabService;
        this.multi = true;
        this.selectFirstTab = true;
        this.showSelectAll = false;
        this.allSelected = true;
        this.dynamicTabs = [];
        this.tabService.multi = this.multi;
    }
    // contentChildren are set
    /**
     * @return {?}
     */
    VerticalTabsComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        // if there is no active tab set, activate the first
        if (this.selectFirstTab && !this.tabs.filter(function (tab) { return tab.active; }).length)
            this.selectTab(this.tabs.first);
        else
            this.checkSelectAll();
    };
    /**
     * @return {?}
     */
    VerticalTabsComponent.prototype.toggleTabActivations = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ arr = this.tabs.toArray().concat(this.dynamicTabs);
        if (arr == null || arr.length < 1)
            return;
        var /** @type {?} */ s = new Set(this.tabService.selectedOptions);
        arr.forEach(function (tab) { return tab.active = s.has(tab.tabTitle); });
    };
    /**
     * @return {?}
     */
    VerticalTabsComponent.prototype.setOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.multi || !this.tabService.selectedOptions.length ||
            !this.lastSelectedOptions || !this.lastSelectedOptions.length)
            return;
        this.tabService.selectedOptions = this.tabService.selectedOptions.filter(function (tabTitle) { return tabTitle !== _this.lastSelectedOptions[_this.lastSelectedOptions.length - 1]; });
        this.lastSelectedOptions = this.tabService.selectedOptions;
    };
    /**
     * @return {?}
     */
    VerticalTabsComponent.prototype.onNgModelChange = /**
     * @return {?}
     */
    function () {
        console.info('this.tabService.selectedOptions:', this.tabService.selectedOptions, ';');
        this.setOptions();
        this.toggleTabActivations();
        this.checkSelectAll();
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    VerticalTabsComponent.prototype.selectTab = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.multi ?
            this.tabService.selectedOptions.push(tab.tabTitle)
            : this.tabService.selectedOptions = [tab.tabTitle];
        tab.active = true;
        if (!this.list.options)
            return;
        var /** @type {?} */ options = this.list.options.map(function (t) { return t.value; });
        var /** @type {?} */ s = new Set(this.tabService.selectedOptions);
        this.list.options.forEach(function (t) {
            t.selected = s.has(t.value);
            // console.info(`'${t.value}' selected:`, t.selected);
        });
        var /** @type {?} */ options_set = new Set(options);
        this.tabService.selectedOptions.forEach(function (option) {
            if (!options_set.has(option))
                throw TypeError("'" + option + "' not found in mat-selection-list");
        });
        this.checkSelectAll();
    };
    /**
     * @return {?}
     */
    VerticalTabsComponent.prototype.checkSelectAll = /**
     * @return {?}
     */
    function () {
        if (!this.list || !this.list.options)
            return;
        this.allSelected = this.list.options.length < 1 ? false
            : this.list.options.reduce(function (p, c) { return p ? c.selected : p; }, true);
    };
    /**
     * @param {?} title
     * @param {?} template
     * @param {?} data
     * @param {?=} isCloseable
     * @return {?}
     */
    VerticalTabsComponent.prototype.openTab = /**
     * @param {?} title
     * @param {?} template
     * @param {?} data
     * @param {?=} isCloseable
     * @return {?}
     */
    function (title, template, data, isCloseable) {
        if (isCloseable === void 0) { isCloseable = false; }
        var /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(VerticalTabComponent);
        // create a component instance
        var /** @type {?} */ componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);
        // set the according properties on our component instance
        var /** @type {?} */ instance = /** @type {?} */ (componentRef.instance);
        instance.tabTitle = title;
        instance.template = template;
        instance.dataContext = data;
        instance.isCloseable = isCloseable;
        instance.active = true;
        this.dynamicTabs.push(instance);
        this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    VerticalTabsComponent.prototype.closeTab = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        for (var /** @type {?} */ i = 0; i < this.dynamicTabs.length; i++) {
            if (this.dynamicTabs[i] === tab) {
                this.dynamicTabs.splice(i, 1);
                this.dynamicTabPlaceholder.viewContainer.remove(i);
                this.tabService.selectedOptions = [tab.tabTitle]; // TODO: duplicate handling
                this.selectTab(this.tabs.first);
                break;
            }
        }
        this.checkSelectAll();
    };
    /**
     * @return {?}
     */
    VerticalTabsComponent.prototype.closeActiveTab = /**
     * @return {?}
     */
    function () {
        if (this.multi)
            console.warn('Closing the first active tab');
        var /** @type {?} */ activeTab = this.dynamicTabs.filter(function (tab) { return tab.active; });
        if (activeTab.length > 0)
            this.closeTab(activeTab[0]);
        this.checkSelectAll();
    };
    /**
     * @return {?}
     */
    VerticalTabsComponent.prototype.toggleSelect = /**
     * @return {?}
     */
    function () {
        this.allSelected ? this.list.deselectAll() : this.list.selectAll();
        this.allSelected = !this.allSelected;
        this.checkSelectAll();
    };
    VerticalTabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-vertical-tabs',
                    template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\" fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"tabService.selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange()\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs.toArray(), dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n    <button mat-button color=\"primary\" id=\"select\"\n            (click)=\"toggleSelect()\" *ngIf=\"showSelectAll\">\n      {{allSelected ? 'Reset selection' : 'Select all'}}\n    </button>\n  </div>\n\n  <div fxFlex=\"66%\" *ngIf=\"tabService.selectedOptions.length\">\n    <ng-content></ng-content>\n    <ng-template verticalDynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    VerticalTabsComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: VerticalTabsService }
    ]; };
    VerticalTabsComponent.propDecorators = {
        tabs: [{ type: ContentChildren, args: [VerticalTabComponent,] }],
        dynamicTabPlaceholder: [{ type: ViewChild, args: [DynamicTabAnchorDirective,] }],
        list: [{ type: ViewChild, args: [MatSelectionList,] }],
        multi: [{ type: Input }],
        selectFirstTab: [{ type: Input }],
        showSelectAll: [{ type: Input }]
    };
    return VerticalTabsComponent;
}());
export { VerticalTabsComponent };
function VerticalTabsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    VerticalTabsComponent.prototype.tabs;
    /** @type {?} */
    VerticalTabsComponent.prototype.dynamicTabPlaceholder;
    /** @type {?} */
    VerticalTabsComponent.prototype.list;
    /** @type {?} */
    VerticalTabsComponent.prototype.multi;
    /** @type {?} */
    VerticalTabsComponent.prototype.selectFirstTab;
    /** @type {?} */
    VerticalTabsComponent.prototype.showSelectAll;
    /** @type {?} */
    VerticalTabsComponent.prototype.allSelected;
    /** @type {?} */
    VerticalTabsComponent.prototype.dynamicTabs;
    /** @type {?} */
    VerticalTabsComponent.prototype.lastSelectedOptions;
    /** @type {?} */
    VerticalTabsComponent.prototype.componentFactoryResolver;
    /** @type {?} */
    VerticalTabsComponent.prototype.tabService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92ZXJ0aWNhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL3ZlcnRpY2FsLXRhYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEksT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBMEM1RCwrQkFBb0Isd0JBQWtELEVBQ25EO1FBREMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNuRCxlQUFVLEdBQVYsVUFBVTtxQkFWWixJQUFJOzhCQUNLLElBQUk7NkJBQ0wsS0FBSzsyQkFDaEIsSUFBSTsyQkFFb0IsRUFBRTtRQU10QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3BDO0lBRUQsMEJBQTBCOzs7O0lBQzFCLGtEQUFrQjs7O0lBQWxCOztRQUVFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxNQUFNLEVBQVYsQ0FBVSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJO1lBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQzVCOzs7O0lBRU8sb0RBQW9COzs7O1FBQzFCLHFCQUFNLEdBQUcsR0FBMkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDMUMscUJBQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQzs7Ozs7SUFHL0MsMENBQVU7Ozs7O1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxNQUFNO1lBQ3ZELENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztZQUM5RCxNQUFNLENBQUM7UUFFVCxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQ3RFLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxLQUFLLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUExRSxDQUEwRSxDQUN2RixDQUFDO1FBRUYsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDOzs7OztJQUc3RCwrQ0FBZTs7O0lBQWY7UUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7O0lBRUQseUNBQVM7Ozs7SUFBVCxVQUFVLEdBQXlCO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQ2xELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVsQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRS9CLHFCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxFQUFQLENBQU8sQ0FBQyxDQUFDO1FBQ3BELHFCQUFNLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDekIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7U0FFN0IsQ0FBQyxDQUFDO1FBRUgscUJBQU0sV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07WUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQixNQUFNLFNBQVMsQ0FBQyxNQUFJLE1BQU0sc0NBQW1DLENBQUMsQ0FBQztTQUNsRSxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7SUFFTyw4Q0FBYzs7OztRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDckQsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBbEIsQ0FBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBR25FLHVDQUFPOzs7Ozs7O0lBQVAsVUFBUSxLQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFtQjtRQUFuQiw0QkFBQSxFQUFBLG1CQUFtQjtRQUN4RCxxQkFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQzVFLG9CQUFvQixDQUNyQixDQUFDOztRQUdGLHFCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztRQUdoRyxxQkFBTSxRQUFRLHFCQUF5QixZQUFZLENBQUMsUUFBZ0MsQ0FBQSxDQUFDO1FBQ3JGLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRXZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQy9EOzs7OztJQUdELHdDQUFROzs7O0lBQVIsVUFBUyxHQUF5QjtRQUNoQyxHQUFHLENBQUMsQ0FBQyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUU5QixJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEMsS0FBSyxDQUFDO2FBQ1A7U0FDRjtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7OztJQUVELDhDQUFjOzs7SUFBZDtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDN0QscUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLE1BQU0sRUFBVixDQUFVLENBQUMsQ0FBQztRQUM3RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOzs7O0lBRUQsNENBQVk7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7O2dCQTNKRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLDgwQkFvQlg7b0JBQ0MsTUFBTSxFQUFFLEVBQUU7aUJBQ1g7Ozs7Z0JBL0JxQyx3QkFBd0I7Z0JBS3JELG1CQUFtQjs7O3VCQTRCekIsZUFBZSxTQUFDLG9CQUFvQjt3Q0FDcEMsU0FBUyxTQUFDLHlCQUF5Qjt1QkFFbkMsU0FBUyxTQUFDLGdCQUFnQjt3QkFFMUIsS0FBSztpQ0FDTCxLQUFLO2dDQUNMLEtBQUs7O2dDQXhDUjs7U0FnQ2EscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTZWxlY3Rpb25MaXN0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9keW5hbWljLXRhYi1hbmNob3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IFZlcnRpY2FsVGFiQ29tcG9uZW50IH0gZnJvbSAnLi92ZXJ0aWNhbC10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IFZlcnRpY2FsVGFic1NlcnZpY2UgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXZlcnRpY2FsLXRhYnMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjFweFwiIGZ4TGF5b3V0LnhzPVwiY29sdW1uXCI+XG4gIDxkaXYgZnhGbGV4PVwiMzMlXCI+XG4gICAgPG1hdC1zZWxlY3Rpb24tbGlzdCAjbGlzdCBbKG5nTW9kZWwpXT1cInRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uTmdNb2RlbENoYW5nZSgpXCI+XG4gICAgICA8bWF0LWxpc3Qtb3B0aW9uICpuZ0Zvcj1cImxldCB0YWIgb2YgW10uY29uY2F0KHRhYnMudG9BcnJheSgpLCBkeW5hbWljVGFicylcIiBbdmFsdWVdPVwidGFiLnRhYlRpdGxlXCI+XG4gICAgICAgIHt7dGFiLnRhYlRpdGxlfX1cbiAgICAgIDwvbWF0LWxpc3Qtb3B0aW9uPlxuICAgIDwvbWF0LXNlbGVjdGlvbi1saXN0PlxuICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiBpZD1cInNlbGVjdFwiXG4gICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlU2VsZWN0KClcIiAqbmdJZj1cInNob3dTZWxlY3RBbGxcIj5cbiAgICAgIHt7YWxsU2VsZWN0ZWQgPyAnUmVzZXQgc2VsZWN0aW9uJyA6ICdTZWxlY3QgYWxsJ319XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4PVwiNjYlXCIgKm5nSWY9XCJ0YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGhcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG5nLXRlbXBsYXRlIHZlcnRpY2FsRHluYW1pY1RhYkFuY2hvciAjY29udGFpbmVyPjwvbmctdGVtcGxhdGU+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFZlcnRpY2FsVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAQ29udGVudENoaWxkcmVuKFZlcnRpY2FsVGFiQ29tcG9uZW50KSB0YWJzOiBRdWVyeUxpc3Q8VmVydGljYWxUYWJDb21wb25lbnQ+O1xuICBAVmlld0NoaWxkKER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUpIGR5bmFtaWNUYWJQbGFjZWhvbGRlcjogRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZTtcblxuICBAVmlld0NoaWxkKE1hdFNlbGVjdGlvbkxpc3QpIGxpc3Q6IE1hdFNlbGVjdGlvbkxpc3Q7XG5cbiAgQElucHV0KCkgbXVsdGkgPSB0cnVlO1xuICBASW5wdXQoKSBzZWxlY3RGaXJzdFRhYiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dTZWxlY3RBbGwgPSBmYWxzZTtcbiAgYWxsU2VsZWN0ZWQgPSB0cnVlO1xuXG4gIGR5bmFtaWNUYWJzOiBWZXJ0aWNhbFRhYkNvbXBvbmVudFtdID0gW107XG5cbiAgbGFzdFNlbGVjdGVkT3B0aW9uczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgcHVibGljIHRhYlNlcnZpY2U6IFZlcnRpY2FsVGFic1NlcnZpY2UpIHtcbiAgICB0aGlzLnRhYlNlcnZpY2UubXVsdGkgPSB0aGlzLm11bHRpO1xuICB9XG5cbiAgLy8gY29udGVudENoaWxkcmVuIGFyZSBzZXRcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGFjdGl2ZSB0YWIgc2V0LCBhY3RpdmF0ZSB0aGUgZmlyc3RcbiAgICBpZiAodGhpcy5zZWxlY3RGaXJzdFRhYiAmJiAhdGhpcy50YWJzLmZpbHRlcih0YWIgPT4gdGFiLmFjdGl2ZSkubGVuZ3RoKVxuICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy50YWJzLmZpcnN0KTtcbiAgICBlbHNlIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlVGFiQWN0aXZhdGlvbnMoKSB7XG4gICAgY29uc3QgYXJyOiBWZXJ0aWNhbFRhYkNvbXBvbmVudFtdID0gdGhpcy50YWJzLnRvQXJyYXkoKS5jb25jYXQodGhpcy5keW5hbWljVGFicyk7XG4gICAgaWYgKGFyciA9PSBudWxsIHx8IGFyci5sZW5ndGggPCAxKSByZXR1cm47XG4gICAgY29uc3QgcyA9IG5ldyBTZXQodGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyk7XG4gICAgYXJyLmZvckVhY2godGFiID0+IHRhYi5hY3RpdmUgPSBzLmhhcyh0YWIudGFiVGl0bGUpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucygpIHtcbiAgICBpZiAodGhpcy5tdWx0aSB8fCAhdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGggfHxcbiAgICAgICF0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMgfHwgIXRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucy5sZW5ndGgpXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zID0gdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5maWx0ZXIoXG4gICAgICB0YWJUaXRsZSA9PiB0YWJUaXRsZSAhPT0gdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zW3RoaXMubGFzdFNlbGVjdGVkT3B0aW9ucy5sZW5ndGggLSAxXVxuICAgICk7XG5cbiAgICB0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zO1xuICB9XG5cbiAgb25OZ01vZGVsQ2hhbmdlKC8qc2VsZWN0ZWQ6IHN0cmluZ1tdKi8pIHtcbiAgICBjb25zb2xlLmluZm8oJ3RoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnM6JywgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucywgJzsnKTtcbiAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICB0aGlzLnRvZ2dsZVRhYkFjdGl2YXRpb25zKCk7XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgc2VsZWN0VGFiKHRhYjogVmVydGljYWxUYWJDb21wb25lbnQpIHtcbiAgICB0aGlzLm11bHRpID9cbiAgICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMucHVzaCh0YWIudGFiVGl0bGUpXG4gICAgICA6IHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSBbdGFiLnRhYlRpdGxlXTtcbiAgICB0YWIuYWN0aXZlID0gdHJ1ZTtcblxuICAgIGlmICghdGhpcy5saXN0Lm9wdGlvbnMpIHJldHVybjtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmxpc3Qub3B0aW9ucy5tYXAodCA9PiB0LnZhbHVlKTtcbiAgICBjb25zdCBzID0gbmV3IFNldCh0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zKTtcbiAgICB0aGlzLmxpc3Qub3B0aW9ucy5mb3JFYWNoKHQgPT4ge1xuICAgICAgdC5zZWxlY3RlZCA9IHMuaGFzKHQudmFsdWUpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKGAnJHt0LnZhbHVlfScgc2VsZWN0ZWQ6YCwgdC5zZWxlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvcHRpb25zX3NldCA9IG5ldyBTZXQob3B0aW9ucyk7XG4gICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBpZiAoIW9wdGlvbnNfc2V0LmhhcyhvcHRpb24pKVxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoYCcke29wdGlvbn0nIG5vdCBmb3VuZCBpbiBtYXQtc2VsZWN0aW9uLWxpc3RgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tTZWxlY3RBbGwoKSB7XG4gICAgaWYgKCF0aGlzLmxpc3QgfHwgIXRoaXMubGlzdC5vcHRpb25zKSByZXR1cm47XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA9IHRoaXMubGlzdC5vcHRpb25zLmxlbmd0aCA8IDEgPyBmYWxzZVxuICAgICAgOiB0aGlzLmxpc3Qub3B0aW9ucy5yZWR1Y2UoKHAsIGMpID0+IHAgPyBjLnNlbGVjdGVkIDogcCwgdHJ1ZSk7XG4gIH1cblxuICBvcGVuVGFiKHRpdGxlOiBzdHJpbmcsIHRlbXBsYXRlLCBkYXRhLCBpc0Nsb3NlYWJsZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgVmVydGljYWxUYWJDb21wb25lbnRcbiAgICApO1xuXG4gICAgLy8gY3JlYXRlIGEgY29tcG9uZW50IGluc3RhbmNlXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5keW5hbWljVGFiUGxhY2Vob2xkZXIudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAvLyBzZXQgdGhlIGFjY29yZGluZyBwcm9wZXJ0aWVzIG9uIG91ciBjb21wb25lbnQgaW5zdGFuY2VcbiAgICBjb25zdCBpbnN0YW5jZTogVmVydGljYWxUYWJDb21wb25lbnQgPSBjb21wb25lbnRSZWYuaW5zdGFuY2UgYXMgVmVydGljYWxUYWJDb21wb25lbnQ7XG4gICAgaW5zdGFuY2UudGFiVGl0bGUgPSB0aXRsZTtcbiAgICBpbnN0YW5jZS50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIGluc3RhbmNlLmRhdGFDb250ZXh0ID0gZGF0YTtcbiAgICBpbnN0YW5jZS5pc0Nsb3NlYWJsZSA9IGlzQ2xvc2VhYmxlO1xuICAgIGluc3RhbmNlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLmR5bmFtaWNUYWJzLnB1c2goaW5zdGFuY2UpO1xuICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMuZHluYW1pY1RhYnNbdGhpcy5keW5hbWljVGFicy5sZW5ndGggLSAxXSk7XG4gIH1cblxuXG4gIGNsb3NlVGFiKHRhYjogVmVydGljYWxUYWJDb21wb25lbnQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZHluYW1pY1RhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmR5bmFtaWNUYWJzW2ldID09PSB0YWIpIHtcbiAgICAgICAgdGhpcy5keW5hbWljVGFicy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgdGhpcy5keW5hbWljVGFiUGxhY2Vob2xkZXIudmlld0NvbnRhaW5lci5yZW1vdmUoaSk7XG4gICAgICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSBbdGFiLnRhYlRpdGxlXTsgIC8vIFRPRE86IGR1cGxpY2F0ZSBoYW5kbGluZ1xuICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnMuZmlyc3QpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgY2xvc2VBY3RpdmVUYWIoKSB7XG4gICAgaWYgKHRoaXMubXVsdGkpIGNvbnNvbGUud2FybignQ2xvc2luZyB0aGUgZmlyc3QgYWN0aXZlIHRhYicpO1xuICAgIGNvbnN0IGFjdGl2ZVRhYiA9IHRoaXMuZHluYW1pY1RhYnMuZmlsdGVyKHRhYiA9PiB0YWIuYWN0aXZlKTtcbiAgICBpZiAoYWN0aXZlVGFiLmxlbmd0aCA+IDApIHRoaXMuY2xvc2VUYWIoYWN0aXZlVGFiWzBdKTtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICB0b2dnbGVTZWxlY3QoKSB7XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA/IHRoaXMubGlzdC5kZXNlbGVjdEFsbCgpIDogdGhpcy5saXN0LnNlbGVjdEFsbCgpO1xuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSAhdGhpcy5hbGxTZWxlY3RlZDtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cbn1cbiJdfQ==