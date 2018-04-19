import { Component, Input, Directive, ViewContainerRef, ComponentFactoryResolver, ContentChildren, ViewChild, NgModule } from '@angular/core';
import { MatSelectionList, MatDividerModule, MatListModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

var TabComponent = /** @class */ (function () {
    function TabComponent() {
        this.active = false;
        this.isCloseable = false;
    }
    return TabComponent;
}());
TabComponent.decorators = [
    { type: Component, args: [{
                selector: 'vertical-tab',
                styles: [
                    "\n    .pane{\n      padding: 1em;\n    }\n  "
                ],
                template: "\n    <div *ngIf=\"active\" class=\"pane\">\n      <ng-content></ng-content>\n      <ng-container *ngIf=\"template\"\n                    [ngTemplateOutlet]=\"template\"\n                    [ngTemplateOutletContext]=\"{person: dataContext}\">\n      </ng-container>\n    </div>\n  "
            },] },
];
TabComponent.propDecorators = {
    "tabTitle": [{ type: Input },],
    "active": [{ type: Input },],
    "template": [{ type: Input },],
    "dataContext": [{ type: Input },],
    "isCloseable": [{ type: Input },],
};
var DynamicTabAnchorDirective = /** @class */ (function () {
    function DynamicTabAnchorDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    return DynamicTabAnchorDirective;
}());
DynamicTabAnchorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[dynamicTabAnchor]'
            },] },
];
DynamicTabAnchorDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
var TabsComponent = /** @class */ (function () {
    function TabsComponent(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.multi = true;
        this.selectFirstTab = true;
        this.dynamicTabs = [];
        this.selectedOptions = [];
    }
    TabsComponent.prototype.ngAfterContentInit = function () {
        if (this.selectFirstTab && !this.tabs.filter(function (tab) { return tab.active; }).length)
            this.selectTab(this.tabs.first);
    };
    TabsComponent.prototype.toggleTabActivations = function () {
        var arr = this.tabs.toArray().concat(this.dynamicTabs);
        if (arr == null || arr.length < 1)
            return;
        var s = new Set(this.selectedOptions);
        arr.forEach(function (tab) { return tab.active = s.has(tab.tabTitle); });
    };
    TabsComponent.prototype.setOptions = function () {
        var _this = this;
        if (this.multi || !this.selectedOptions.length ||
            !this.lastSelectedOptions || !this.lastSelectedOptions.length)
            return;
        this.selectedOptions = this.selectedOptions.filter(function (tabTitle) { return tabTitle !== _this.lastSelectedOptions[_this.lastSelectedOptions.length - 1]; });
        this.lastSelectedOptions = this.selectedOptions;
    };
    TabsComponent.prototype.onNgModelChange = function () {
        this.setOptions();
        this.toggleTabActivations();
    };
    TabsComponent.prototype.selectTab = function (tab) {
        this.multi ?
            this.selectedOptions.push(tab.tabTitle)
            : this.selectedOptions = [tab.tabTitle];
        tab.active = true;
        if (!this.list.options)
            return;
        var options = this.list.options.map(function (t) { return t.value; });
        var s = new Set(this.selectedOptions);
        this.list.options.forEach(function (t) {
            t.selected = s.has(t.value);
        });
        var options_set = new Set(options);
        this.selectedOptions.forEach(function (option) {
            if (!options_set.has(option))
                throw TypeError("'" + option + "' not found in mat-selection-list");
        });
    };
    TabsComponent.prototype.openTab = function (title, template, data, isCloseable) {
        if (isCloseable === void 0) { isCloseable = false; }
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(TabComponent);
        var componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);
        var instance = (componentRef.instance);
        instance.tabTitle = title;
        instance.template = template;
        instance.dataContext = data;
        instance.isCloseable = isCloseable;
        instance.active = true;
        this.dynamicTabs.push(instance);
        this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
    };
    TabsComponent.prototype.closeTab = function (tab) {
        for (var i = 0; i < this.dynamicTabs.length; i++) {
            if (this.dynamicTabs[i] === tab) {
                this.dynamicTabs.splice(i, 1);
                this.dynamicTabPlaceholder.viewContainer.remove(i);
                this.selectedOptions = [tab.tabTitle];
                this.selectTab(this.tabs.first);
                break;
            }
        }
    };
    TabsComponent.prototype.closeActiveTab = function () {
        if (this.multi)
            console.warn('Closing the first active tab');
        var activeTab = this.dynamicTabs.filter(function (tab) { return tab.active; });
        if (activeTab.length > 0)
            this.closeTab(activeTab[0]);
    };
    return TabsComponent;
}());
TabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vertical-tabs',
                template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\"\n     fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange($event)\"\n                        (selectionChange)=\"onNgModelChange($event)\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs._results, dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n  </div>\n\n  <div fxFlex=\"66%\">\n    <ng-content></ng-content>\n    <ng-template dynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n"
            },] },
];
TabsComponent.ctorParameters = function () { return [
    { type: ComponentFactoryResolver, },
]; };
TabsComponent.propDecorators = {
    "tabs": [{ type: ContentChildren, args: [TabComponent,] },],
    "dynamicTabPlaceholder": [{ type: ViewChild, args: [DynamicTabAnchorDirective,] },],
    "list": [{ type: ViewChild, args: [MatSelectionList,] },],
    "multi": [{ type: Input },],
    "selectFirstTab": [{ type: Input },],
};
var TabsModule = /** @class */ (function () {
    function TabsModule() {
    }
    return TabsModule;
}());
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

export { TabsComponent, TabComponent, TabsModule, DynamicTabAnchorDirective as ɵa };
//# sourceMappingURL=angular-vertical-tabs.js.map
