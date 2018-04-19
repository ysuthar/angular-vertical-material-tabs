import { Component, Input, Directive, ViewContainerRef, ComponentFactoryResolver, ContentChildren, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDividerModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabComponent {
    constructor() {
        this.active = false;
        this.isCloseable = false;
    }
}
TabComponent.decorators = [
    { type: Component, args: [{
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
            },] },
];
/** @nocollapse */
TabComponent.propDecorators = {
    "tabTitle": [{ type: Input },],
    "active": [{ type: Input },],
    "template": [{ type: Input },],
    "dataContext": [{ type: Input },],
    "isCloseable": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DynamicTabAnchorDirective {
    /**
     * @param {?} viewContainer
     */
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
    }
}
DynamicTabAnchorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[dynamicTabAnchor]'
            },] },
];
/** @nocollapse */
DynamicTabAnchorDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabsComponent {
    /**
     * @param {?} componentFactoryResolver
     */
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.multitab = true;
        // @ViewChild('container', { read: ViewContainerRef })
        // dynamicTabPlaceholder;
        this.dynamicTabs = [];
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // get all active tabs
        const /** @type {?} */ activeTabs = this.tabs.filter(tab => tab.active);
        // if there is no active tab set, activate the first
        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onNgModelChange(event) {
        if (!this.multitab) {
            // TODO: Get it so only one tab is selected at a time. Attempt:
            // TODO: Get it so only one tab is selected at a time. Attempt:
            if (this.selectedOptions && this.selectedOptions.length > 1)
                delete this.selectedOptions[this.selectedOptions.indexOf(this.lastSelectedOptions[0])];
            this.lastSelectedOptions = this.selectedOptions;
        }
        this.deactivateTabs();
        const /** @type {?} */ activate = (arr) => {
            if (arr == null || arr.length < 1)
                return;
            const /** @type {?} */ s = new Set(this.selectedOptions);
            for (let /** @type {?} */ i = 0; i < arr.length; i++)
                if (s.has(arr[i].tabTitle)) {
                    arr[i].active = true;
                    if (!this.multitab)
                        return;
                }
                else
                    arr[i].active = false;
        };
        activate(this.tabs.toArray());
        activate(this.dynamicTabs);
    }
    /**
     * @param {?} title
     * @param {?} template
     * @param {?} data
     * @param {?=} isCloseable
     * @return {?}
     */
    openTab(title, template, data, isCloseable = false) {
        const /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(TabComponent);
        // create a component instance
        const /** @type {?} */ componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);
        // set the according properties on our component instance
        const /** @type {?} */ instance = /** @type {?} */ (componentRef.instance);
        instance.tabTitle = title;
        instance.template = template;
        instance.dataContext = data;
        instance.isCloseable = isCloseable;
        this.dynamicTabs.push(instance);
        this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
    }
    /**
     * @return {?}
     */
    deactivateTabs() {
        this.tabs.toArray().forEach(_tab => _tab.active = false);
        this.dynamicTabs.forEach(_tab => _tab.active = false);
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    selectTab(tab) {
        this.deactivateTabs();
        // activate the tab the user has clicked on.
        tab.active = true;
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
                this.selectTab(this.tabs.first);
                break;
            }
        }
    }
    /**
     * @return {?}
     */
    closeActiveTab() {
        const /** @type {?} */ activeTab = this.dynamicTabs.filter(tab => tab.active);
        if (activeTab.length > 0) {
            this.closeTab(activeTab[0]);
        }
    }
}
TabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vertical-tabs',
                template: `<div fxLayout="row" fxLayoutGap="1px"
     fxLayout.xs="column">
  <div fxFlex="33%">
    <mat-selection-list #list [(ngModel)]="selectedOptions" (ngModelChange)="onNgModelChange($event)" role="option">
      <mat-list-option *ngFor="let tab of [].concat(tabs._results, dynamicTabs)" [value]="tab.tabTitle">
        {{tab.tabTitle}}
      </mat-list-option>
    </mat-selection-list>
    <mat-divider></mat-divider>
  </div>

  <div fxFlex="66%">
    <ng-content></ng-content>
    <ng-template dynamicTabAnchor #container></ng-template>
  </div>
</div>
`
            },] },
];
/** @nocollapse */
TabsComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
];
TabsComponent.propDecorators = {
    "tabs": [{ type: ContentChildren, args: [TabComponent,] },],
    "dynamicTabPlaceholder": [{ type: ViewChild, args: [DynamicTabAnchorDirective,] },],
    "multitab": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabsModule {
}
TabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule, FormsModule,
                    FlexLayoutModule,
                    MatListModule, MatDividerModule
                ],
                declarations: [TabsComponent, TabComponent, DynamicTabAnchorDirective],
                exports: [TabsComponent, TabComponent],
                entryComponents: [TabComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { TabsComponent, TabComponent, TabsModule, DynamicTabAnchorDirective as ɵa };
//# sourceMappingURL=angular-vertical-tabs.js.map
