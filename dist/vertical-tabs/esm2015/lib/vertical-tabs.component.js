/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ComponentFactoryResolver, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { VerticalTabComponent } from './vertical-tab.component';
import { VerticalTabsService } from './vertical-tabs.service';
export class VerticalTabsComponent {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} tabService
     */
    constructor(componentFactoryResolver, tabService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.tabService = tabService;
        this.multi = true;
        this.selectFirstTab = true;
        this.showSelectAll = false;
        this.allSelected = true;
        this.dynamicTabs = [];
        this.tabService.multi = this.multi;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // if there is no active tab set, activate the first
        if (this.selectFirstTab && !this.tabs.filter(tab => tab.active).length)
            this.selectTab(this.tabs.first);
        else
            this.checkSelectAll();
    }
    /**
     * @return {?}
     */
    toggleTabActivations() {
        const /** @type {?} */ arr = this.tabs.toArray().concat(this.dynamicTabs);
        if (arr == null || arr.length < 1)
            return;
        const /** @type {?} */ s = new Set(this.tabService.selectedOptions);
        arr.forEach(tab => tab.active = s.has(tab.tabTitle));
    }
    /**
     * @return {?}
     */
    setOptions() {
        if (this.multi || !this.tabService.selectedOptions.length ||
            !this.lastSelectedOptions || !this.lastSelectedOptions.length)
            return;
        this.tabService.selectedOptions = this.tabService.selectedOptions.filter(tabTitle => tabTitle !== this.lastSelectedOptions[this.lastSelectedOptions.length - 1]);
        this.lastSelectedOptions = this.tabService.selectedOptions;
    }
    /**
     * @return {?}
     */
    onNgModelChange() {
        console.info('this.tabService.selectedOptions:', this.tabService.selectedOptions, ';');
        this.setOptions();
        this.toggleTabActivations();
        this.checkSelectAll();
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    selectTab(tab) {
        this.multi ?
            this.tabService.selectedOptions.push(tab.tabTitle)
            : this.tabService.selectedOptions = [tab.tabTitle];
        tab.active = true;
        if (!this.list.options)
            return;
        const /** @type {?} */ options = this.list.options.map(t => t.value);
        const /** @type {?} */ s = new Set(this.tabService.selectedOptions);
        this.list.options.forEach(t => {
            t.selected = s.has(t.value);
            // console.info(`'${t.value}' selected:`, t.selected);
        });
        const /** @type {?} */ options_set = new Set(options);
        this.tabService.selectedOptions.forEach(option => {
            if (!options_set.has(option))
                throw TypeError(`'${option}' not found in mat-selection-list`);
        });
        this.checkSelectAll();
    }
    /**
     * @return {?}
     */
    checkSelectAll() {
        if (!this.list || !this.list.options)
            return;
        this.allSelected = this.list.options.length < 1 ? false
            : this.list.options.reduce((p, c) => p ? c.selected : p, true);
    }
    /**
     * @param {?} title
     * @param {?} template
     * @param {?} data
     * @param {?=} isCloseable
     * @return {?}
     */
    openTab(title, template, data, isCloseable = false) {
        const /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(VerticalTabComponent);
        // create a component instance
        const /** @type {?} */ componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);
        // set the according properties on our component instance
        const /** @type {?} */ instance = /** @type {?} */ (componentRef.instance);
        instance.tabTitle = title;
        instance.template = template;
        instance.dataContext = data;
        instance.isCloseable = isCloseable;
        instance.active = true;
        this.dynamicTabs.push(instance);
        this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    closeTab(tab) {
        for (let /** @type {?} */ i = 0; i < this.dynamicTabs.length; i++) {
            if (this.dynamicTabs[i] === tab) {
                this.dynamicTabs.splice(i, 1);
                this.dynamicTabPlaceholder.viewContainer.remove(i);
                this.tabService.selectedOptions = [tab.tabTitle]; // TODO: duplicate handling
                this.selectTab(this.tabs.first);
                break;
            }
        }
        this.checkSelectAll();
    }
    /**
     * @return {?}
     */
    closeActiveTab() {
        if (this.multi)
            console.warn('Closing the first active tab');
        const /** @type {?} */ activeTab = this.dynamicTabs.filter(tab => tab.active);
        if (activeTab.length > 0)
            this.closeTab(activeTab[0]);
        this.checkSelectAll();
    }
    /**
     * @return {?}
     */
    toggleSelect() {
        this.allSelected ? this.list.deselectAll() : this.list.selectAll();
        this.allSelected = !this.allSelected;
        this.checkSelectAll();
    }
}
VerticalTabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-vertical-tabs',
                template: `<div fxLayout="row" fxLayoutGap="1px" fxLayout.xs="column">
  <div fxFlex="33%">
    <mat-selection-list #list [(ngModel)]="tabService.selectedOptions"
                        (ngModelChange)="onNgModelChange()">
      <mat-list-option *ngFor="let tab of [].concat(tabs.toArray(), dynamicTabs)" [value]="tab.tabTitle">
        {{tab.tabTitle}}
      </mat-list-option>
    </mat-selection-list>
    <mat-divider></mat-divider>
    <button mat-button color="primary" id="select"
            (click)="toggleSelect()" *ngIf="showSelectAll">
      {{allSelected ? 'Reset selection' : 'Select all'}}
    </button>
  </div>

  <div fxFlex="66%" *ngIf="tabService.selectedOptions.length">
    <ng-content></ng-content>
    <ng-template verticalDynamicTabAnchor #container></ng-template>
  </div>
</div>
`,
                styles: []
            },] },
];
/** @nocollapse */
VerticalTabsComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: VerticalTabsService }
];
VerticalTabsComponent.propDecorators = {
    tabs: [{ type: ContentChildren, args: [VerticalTabComponent,] }],
    dynamicTabPlaceholder: [{ type: ViewChild, args: [DynamicTabAnchorDirective,] }],
    list: [{ type: ViewChild, args: [MatSelectionList,] }],
    multi: [{ type: Input }],
    selectFirstTab: [{ type: Input }],
    showSelectAll: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92ZXJ0aWNhbC10YWJzLyIsInNvdXJjZXMiOlsibGliL3ZlcnRpY2FsLXRhYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEksT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUEyQjlELE1BQU07Ozs7O0lBZUosWUFBb0Isd0JBQWtELEVBQ25EO1FBREMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNuRCxlQUFVLEdBQVYsVUFBVTtxQkFWWixJQUFJOzhCQUNLLElBQUk7NkJBQ0wsS0FBSzsyQkFDaEIsSUFBSTsyQkFFb0IsRUFBRTtRQU10QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3BDOzs7O0lBR0Qsa0JBQWtCOztRQUVoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJO1lBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQzVCOzs7O0lBRU8sb0JBQW9CO1FBQzFCLHVCQUFNLEdBQUcsR0FBMkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDMUMsdUJBQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFHL0MsVUFBVTtRQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsTUFBTTtZQUN2RCxDQUFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUM7WUFDOUQsTUFBTSxDQUFDO1FBRVQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUN0RSxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FDdkYsQ0FBQztRQUVGLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQzs7Ozs7SUFHN0QsZUFBZTtRQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7Ozs7SUFFRCxTQUFTLENBQUMsR0FBeUI7UUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDbEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRWxCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFL0IsdUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRCx1QkFBTSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7U0FFN0IsQ0FBQyxDQUFDO1FBRUgsdUJBQU0sV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sU0FBUyxDQUFDLElBQUksTUFBTSxtQ0FBbUMsQ0FBQyxDQUFDO1NBQ2xFLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7OztJQUVPLGNBQWM7UUFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQ3JELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBR25FLE9BQU8sQ0FBQyxLQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUcsS0FBSztRQUN4RCx1QkFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQzVFLG9CQUFvQixDQUNyQixDQUFDOztRQUdGLHVCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztRQUdoRyx1QkFBTSxRQUFRLHFCQUF5QixZQUFZLENBQUMsUUFBZ0MsQ0FBQSxDQUFDO1FBQ3JGLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRXZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQy9EOzs7OztJQUdELFFBQVEsQ0FBQyxHQUF5QjtRQUNoQyxHQUFHLENBQUMsQ0FBQyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUU5QixJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEMsS0FBSyxDQUFDO2FBQ1A7U0FDRjtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7OztJQUVELGNBQWM7UUFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzdELHVCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOzs7WUEzSkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FvQlg7Z0JBQ0MsTUFBTSxFQUFFLEVBQUU7YUFDWDs7OztZQS9CcUMsd0JBQXdCO1lBS3JELG1CQUFtQjs7O21CQTRCekIsZUFBZSxTQUFDLG9CQUFvQjtvQ0FDcEMsU0FBUyxTQUFDLHlCQUF5QjttQkFFbkMsU0FBUyxTQUFDLGdCQUFnQjtvQkFFMUIsS0FBSzs2QkFDTCxLQUFLOzRCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNlbGVjdGlvbkxpc3QgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUgfSBmcm9tICcuL2R5bmFtaWMtdGFiLWFuY2hvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJDb21wb25lbnQgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJzU2VydmljZSB9IGZyb20gJy4vdmVydGljYWwtdGFicy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctdmVydGljYWwtdGFicycsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMXB4XCIgZnhMYXlvdXQueHM9XCJjb2x1bW5cIj5cbiAgPGRpdiBmeEZsZXg9XCIzMyVcIj5cbiAgICA8bWF0LXNlbGVjdGlvbi1saXN0ICNsaXN0IFsobmdNb2RlbCldPVwidGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25OZ01vZGVsQ2hhbmdlKClcIj5cbiAgICAgIDxtYXQtbGlzdC1vcHRpb24gKm5nRm9yPVwibGV0IHRhYiBvZiBbXS5jb25jYXQodGFicy50b0FycmF5KCksIGR5bmFtaWNUYWJzKVwiIFt2YWx1ZV09XCJ0YWIudGFiVGl0bGVcIj5cbiAgICAgICAge3t0YWIudGFiVGl0bGV9fVxuICAgICAgPC9tYXQtbGlzdC1vcHRpb24+XG4gICAgPC9tYXQtc2VsZWN0aW9uLWxpc3Q+XG4gICAgPG1hdC1kaXZpZGVyPjwvbWF0LWRpdmlkZXI+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIGlkPVwic2VsZWN0XCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVTZWxlY3QoKVwiICpuZ0lmPVwic2hvd1NlbGVjdEFsbFwiPlxuICAgICAge3thbGxTZWxlY3RlZCA/ICdSZXNldCBzZWxlY3Rpb24nIDogJ1NlbGVjdCBhbGwnfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBmeEZsZXg9XCI2NiVcIiAqbmdJZj1cInRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aFwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8bmctdGVtcGxhdGUgdmVydGljYWxEeW5hbWljVGFiQW5jaG9yICNjb250YWluZXI+PC9uZy10ZW1wbGF0ZT5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgVmVydGljYWxUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oVmVydGljYWxUYWJDb21wb25lbnQpIHRhYnM6IFF1ZXJ5TGlzdDxWZXJ0aWNhbFRhYkNvbXBvbmVudD47XG4gIEBWaWV3Q2hpbGQoRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSkgZHluYW1pY1RhYlBsYWNlaG9sZGVyOiBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlO1xuXG4gIEBWaWV3Q2hpbGQoTWF0U2VsZWN0aW9uTGlzdCkgbGlzdDogTWF0U2VsZWN0aW9uTGlzdDtcblxuICBASW5wdXQoKSBtdWx0aSA9IHRydWU7XG4gIEBJbnB1dCgpIHNlbGVjdEZpcnN0VGFiID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1NlbGVjdEFsbCA9IGZhbHNlO1xuICBhbGxTZWxlY3RlZCA9IHRydWU7XG5cbiAgZHluYW1pY1RhYnM6IFZlcnRpY2FsVGFiQ29tcG9uZW50W10gPSBbXTtcblxuICBsYXN0U2VsZWN0ZWRPcHRpb25zOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgdGFiU2VydmljZTogVmVydGljYWxUYWJzU2VydmljZSkge1xuICAgIHRoaXMudGFiU2VydmljZS5tdWx0aSA9IHRoaXMubXVsdGk7XG4gIH1cblxuICAvLyBjb250ZW50Q2hpbGRyZW4gYXJlIHNldFxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gYWN0aXZlIHRhYiBzZXQsIGFjdGl2YXRlIHRoZSBmaXJzdFxuICAgIGlmICh0aGlzLnNlbGVjdEZpcnN0VGFiICYmICF0aGlzLnRhYnMuZmlsdGVyKHRhYiA9PiB0YWIuYWN0aXZlKS5sZW5ndGgpXG4gICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnMuZmlyc3QpO1xuICAgIGVsc2UgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVUYWJBY3RpdmF0aW9ucygpIHtcbiAgICBjb25zdCBhcnI6IFZlcnRpY2FsVGFiQ29tcG9uZW50W10gPSB0aGlzLnRhYnMudG9BcnJheSgpLmNvbmNhdCh0aGlzLmR5bmFtaWNUYWJzKTtcbiAgICBpZiAoYXJyID09IG51bGwgfHwgYXJyLmxlbmd0aCA8IDEpIHJldHVybjtcbiAgICBjb25zdCBzID0gbmV3IFNldCh0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zKTtcbiAgICBhcnIuZm9yRWFjaCh0YWIgPT4gdGFiLmFjdGl2ZSA9IHMuaGFzKHRhYi50YWJUaXRsZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRPcHRpb25zKCkge1xuICAgIGlmICh0aGlzLm11bHRpIHx8ICF0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCB8fFxuICAgICAgIXRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucyB8fCAhdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zLmxlbmd0aClcbiAgICAgIHJldHVybjtcblxuICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmZpbHRlcihcbiAgICAgIHRhYlRpdGxlID0+IHRhYlRpdGxlICE9PSB0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnNbdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zLmxlbmd0aCAtIDFdXG4gICAgKTtcblxuICAgIHRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucyA9IHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnM7XG4gIH1cblxuICBvbk5nTW9kZWxDaGFuZ2UoLypzZWxlY3RlZDogc3RyaW5nW10qLykge1xuICAgIGNvbnNvbGUuaW5mbygndGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uczonLCB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLCAnOycpO1xuICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgIHRoaXMudG9nZ2xlVGFiQWN0aXZhdGlvbnMoKTtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBzZWxlY3RUYWIodGFiOiBWZXJ0aWNhbFRhYkNvbXBvbmVudCkge1xuICAgIHRoaXMubXVsdGkgP1xuICAgICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5wdXNoKHRhYi50YWJUaXRsZSlcbiAgICAgIDogdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IFt0YWIudGFiVGl0bGVdO1xuICAgIHRhYi5hY3RpdmUgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLmxpc3Qub3B0aW9ucykgcmV0dXJuO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMubGlzdC5vcHRpb25zLm1hcCh0ID0+IHQudmFsdWUpO1xuICAgIGNvbnN0IHMgPSBuZXcgU2V0KHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMpO1xuICAgIHRoaXMubGlzdC5vcHRpb25zLmZvckVhY2godCA9PiB7XG4gICAgICB0LnNlbGVjdGVkID0gcy5oYXModC52YWx1ZSk7XG4gICAgICAvLyBjb25zb2xlLmluZm8oYCcke3QudmFsdWV9JyBzZWxlY3RlZDpgLCB0LnNlbGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG9wdGlvbnNfc2V0ID0gbmV3IFNldChvcHRpb25zKTtcbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGlmICghb3B0aW9uc19zZXQuaGFzKG9wdGlvbikpXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihgJyR7b3B0aW9ufScgbm90IGZvdW5kIGluIG1hdC1zZWxlY3Rpb24tbGlzdGApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1NlbGVjdEFsbCgpIHtcbiAgICBpZiAoIXRoaXMubGlzdCB8fCAhdGhpcy5saXN0Lm9wdGlvbnMpIHJldHVybjtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID0gdGhpcy5saXN0Lm9wdGlvbnMubGVuZ3RoIDwgMSA/IGZhbHNlXG4gICAgICA6IHRoaXMubGlzdC5vcHRpb25zLnJlZHVjZSgocCwgYykgPT4gcCA/IGMuc2VsZWN0ZWQgOiBwLCB0cnVlKTtcbiAgfVxuXG4gIG9wZW5UYWIodGl0bGU6IHN0cmluZywgdGVtcGxhdGUsIGRhdGEsIGlzQ2xvc2VhYmxlID0gZmFsc2UpIHtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXG4gICAgICBWZXJ0aWNhbFRhYkNvbXBvbmVudFxuICAgICk7XG5cbiAgICAvLyBjcmVhdGUgYSBjb21wb25lbnQgaW5zdGFuY2VcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmR5bmFtaWNUYWJQbGFjZWhvbGRlci52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblxuICAgIC8vIHNldCB0aGUgYWNjb3JkaW5nIHByb3BlcnRpZXMgb24gb3VyIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgIGNvbnN0IGluc3RhbmNlOiBWZXJ0aWNhbFRhYkNvbXBvbmVudCA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZSBhcyBWZXJ0aWNhbFRhYkNvbXBvbmVudDtcbiAgICBpbnN0YW5jZS50YWJUaXRsZSA9IHRpdGxlO1xuICAgIGluc3RhbmNlLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgaW5zdGFuY2UuZGF0YUNvbnRleHQgPSBkYXRhO1xuICAgIGluc3RhbmNlLmlzQ2xvc2VhYmxlID0gaXNDbG9zZWFibGU7XG4gICAgaW5zdGFuY2UuYWN0aXZlID0gdHJ1ZTtcblxuICAgIHRoaXMuZHluYW1pY1RhYnMucHVzaChpbnN0YW5jZSk7XG4gICAgdGhpcy5zZWxlY3RUYWIodGhpcy5keW5hbWljVGFic1t0aGlzLmR5bmFtaWNUYWJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuXG5cbiAgY2xvc2VUYWIodGFiOiBWZXJ0aWNhbFRhYkNvbXBvbmVudCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5keW5hbWljVGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZHluYW1pY1RhYnNbaV0gPT09IHRhYikge1xuICAgICAgICB0aGlzLmR5bmFtaWNUYWJzLnNwbGljZShpLCAxKTtcblxuICAgICAgICB0aGlzLmR5bmFtaWNUYWJQbGFjZWhvbGRlci52aWV3Q29udGFpbmVyLnJlbW92ZShpKTtcbiAgICAgICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IFt0YWIudGFiVGl0bGVdOyAgLy8gVE9ETzogZHVwbGljYXRlIGhhbmRsaW5nXG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFicy5maXJzdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBjbG9zZUFjdGl2ZVRhYigpIHtcbiAgICBpZiAodGhpcy5tdWx0aSkgY29uc29sZS53YXJuKCdDbG9zaW5nIHRoZSBmaXJzdCBhY3RpdmUgdGFiJyk7XG4gICAgY29uc3QgYWN0aXZlVGFiID0gdGhpcy5keW5hbWljVGFicy5maWx0ZXIodGFiID0+IHRhYi5hY3RpdmUpO1xuICAgIGlmIChhY3RpdmVUYWIubGVuZ3RoID4gMCkgdGhpcy5jbG9zZVRhYihhY3RpdmVUYWJbMF0pO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHRvZ2dsZVNlbGVjdCgpIHtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID8gdGhpcy5saXN0LmRlc2VsZWN0QWxsKCkgOiB0aGlzLmxpc3Quc2VsZWN0QWxsKCk7XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA9ICF0aGlzLmFsbFNlbGVjdGVkO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxufVxuIl19