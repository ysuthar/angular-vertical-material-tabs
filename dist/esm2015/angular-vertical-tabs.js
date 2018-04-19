import { Component, Input, Directive, ViewContainerRef, ComponentFactoryResolver, ContentChildren, ViewChild, NgModule } from '@angular/core';
import { MatSelectionList, MatDividerModule, MatListModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
        this.multi = true;
        this.dynamicTabs = [];
        this.selectedOptions = [];
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // if there is no active tab set, activate the first
        // if there is no active tab set, activate the first
        if (!this.tabs.filter(tab => tab.active).length)
            this.selectTab(this.tabs.first);
    }
    /**
     * @return {?}
     */
    toggleTabActivations() {
        const /** @type {?} */ arr = this.tabs.toArray().concat(this.dynamicTabs);
        if (arr == null || arr.length < 1)
            return;
        const /** @type {?} */ s = new Set(this.selectedOptions);
        arr.forEach(tab => tab.active = s.has(tab.tabTitle));
    }
    /**
     * @return {?}
     */
    setOptions() {
        if (this.multi || !this.selectedOptions.length ||
            !this.lastSelectedOptions || !this.lastSelectedOptions.length)
            return;
        this.selectedOptions = this.selectedOptions.filter(tabTitle => tabTitle !== this.lastSelectedOptions[this.lastSelectedOptions.length - 1]);
        this.lastSelectedOptions = this.selectedOptions;
    }
    /**
     * @return {?}
     */
    onNgModelChange() {
        this.setOptions();
        this.toggleTabActivations();
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    selectTab(tab) {
        this.multi ?
            this.selectedOptions.push(tab.tabTitle)
            : this.selectedOptions = [tab.tabTitle];
        tab.active = true;
        if (!this.list.options)
            return;
        const /** @type {?} */ options = this.list.options.map(t => t.value);
        const /** @type {?} */ s = new Set(this.selectedOptions);
        this.list.options.forEach(t => {
            t.selected = s.has(t.value);
            // console.info(`'${t.value}' selected:`, t.selected);
        });
        const /** @type {?} */ options_set = new Set(options);
        this.selectedOptions.forEach(option => {
            if (!options_set.has(option))
                throw TypeError(`'${option}' not found in mat-selection-list`);
        });
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
                this.selectedOptions = [tab.tabTitle]; // TODO: duplicate handling
                this.selectTab(this.tabs.first);
                break;
            }
        }
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
    }
}
TabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vertical-tabs',
                template: `<div fxLayout="row" fxLayoutGap="1px"
     fxLayout.xs="column">
  <div fxFlex="33%">
    <mat-selection-list #list [(ngModel)]="selectedOptions"
                        (ngModelChange)="onNgModelChange($event)"
                        (selectionChange)="onNgModelChange($event)">
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
    "list": [{ type: ViewChild, args: [MatSelectionList,] },],
    "multi": [{ type: Input },],
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
