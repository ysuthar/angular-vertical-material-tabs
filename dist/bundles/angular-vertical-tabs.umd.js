(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material'), require('@angular/common'), require('@angular/forms'), require('@angular/flex-layout')) :
	typeof define === 'function' && define.amd ? define('angular-vertical-tabs', ['exports', '@angular/core', '@angular/material', '@angular/common', '@angular/forms', '@angular/flex-layout'], factory) :
	(factory((global['angular-vertical-tabs'] = {}),global.ng.core,global.ng.material,global.ng.common,global.ng.forms,global.ng['flex-layout']));
}(this, (function (exports,core,material,common,forms,flexLayout) { 'use strict';

var TabsService = /** @class */ (function () {
    function TabsService() {
        this.selectedOptions = [];
    }
    return TabsService;
}());
TabsService.decorators = [
    { type: core.Injectable },
];
TabsService.ctorParameters = function () { return []; };
var TabComponent = /** @class */ (function () {
    function TabComponent(tabsService) {
        this.tabsService = tabsService;
        this.active = false;
        this.isCloseable = false;
    }
    return TabComponent;
}());
TabComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'vertical-tab',
                styles: [
                    "\n    .pane {\n      padding: 1em;\n    }\n  "
                ],
                template: "<div *ngIf=\"active\" class=\"pane\">\n  <h3 class=\"tab-heading\" *ngIf=\"tabsService.multi && tabsService.selectedOptions.length > 1\">\n    {{tabTitle}}\n  </h3>\n  <ng-content></ng-content>\n  <ng-container *ngIf=\"template\"\n                [ngTemplateOutlet]=\"template\"\n                [ngTemplateOutletContext]=\"{person: dataContext}\">\n  </ng-container>\n</div>\n"
            },] },
];
TabComponent.ctorParameters = function () { return [
    { type: TabsService, },
]; };
TabComponent.propDecorators = {
    "tabTitle": [{ type: core.Input },],
    "active": [{ type: core.Input },],
    "template": [{ type: core.Input },],
    "dataContext": [{ type: core.Input },],
    "isCloseable": [{ type: core.Input },],
};
var DynamicTabAnchorDirective = /** @class */ (function () {
    function DynamicTabAnchorDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    return DynamicTabAnchorDirective;
}());
DynamicTabAnchorDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[dynamicTabAnchor]'
            },] },
];
DynamicTabAnchorDirective.ctorParameters = function () { return [
    { type: core.ViewContainerRef, },
]; };
var TabsComponent = /** @class */ (function () {
    function TabsComponent(componentFactoryResolver, tabService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.tabService = tabService;
        this.multi = true;
        this.selectFirstTab = true;
        this.showSelectAll = false;
        this.allSelected = true;
        this.dynamicTabs = [];
        this.tabService.multi = this.multi;
    }
    TabsComponent.prototype.ngAfterContentInit = function () {
        if (this.selectFirstTab && !this.tabs.filter(function (tab) { return tab.active; }).length)
            this.selectTab(this.tabs.first);
        else
            this.checkSelectAll();
    };
    TabsComponent.prototype.toggleTabActivations = function () {
        var arr = this.tabs.toArray().concat(this.dynamicTabs);
        if (arr == null || arr.length < 1)
            return;
        var s = new Set(this.tabService.selectedOptions);
        arr.forEach(function (tab) { return tab.active = s.has(tab.tabTitle); });
    };
    TabsComponent.prototype.setOptions = function () {
        var _this = this;
        if (this.multi || !this.tabService.selectedOptions.length ||
            !this.lastSelectedOptions || !this.lastSelectedOptions.length)
            return;
        this.tabService.selectedOptions = this.tabService.selectedOptions.filter(function (tabTitle) { return tabTitle !== _this.lastSelectedOptions[_this.lastSelectedOptions.length - 1]; });
        this.lastSelectedOptions = this.tabService.selectedOptions;
    };
    TabsComponent.prototype.onNgModelChange = function () {
        this.setOptions();
        this.toggleTabActivations();
        this.checkSelectAll();
    };
    TabsComponent.prototype.selectTab = function (tab) {
        this.multi ?
            this.tabService.selectedOptions.push(tab.tabTitle)
            : this.tabService.selectedOptions = [tab.tabTitle];
        tab.active = true;
        if (!this.list.options)
            return;
        var options = this.list.options.map(function (t) { return t.value; });
        var s = new Set(this.tabService.selectedOptions);
        this.list.options.forEach(function (t) {
            t.selected = s.has(t.value);
        });
        var options_set = new Set(options);
        this.tabService.selectedOptions.forEach(function (option) {
            if (!options_set.has(option))
                throw TypeError("'" + option + "' not found in mat-selection-list");
        });
        this.checkSelectAll();
    };
    TabsComponent.prototype.checkSelectAll = function () {
        if (!this.list || !this.list.options)
            return;
        this.allSelected = this.list.options.length < 1 ? false
            : this.list.options.reduce(function (p, c) { return p ? c.selected : p; }, true);
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
                this.tabService.selectedOptions = [tab.tabTitle];
                this.selectTab(this.tabs.first);
                break;
            }
        }
        this.checkSelectAll();
    };
    TabsComponent.prototype.closeActiveTab = function () {
        if (this.multi)
            console.warn('Closing the first active tab');
        var activeTab = this.dynamicTabs.filter(function (tab) { return tab.active; });
        if (activeTab.length > 0)
            this.closeTab(activeTab[0]);
        this.checkSelectAll();
    };
    TabsComponent.prototype.toggleSelect = function () {
        this.allSelected ? this.list.deselectAll() : this.list.selectAll();
        this.allSelected = !this.allSelected;
        this.checkSelectAll();
    };
    return TabsComponent;
}());
TabsComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'vertical-tabs',
                template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\" fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"tabService.selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange($event)\"\n                        (selectionChange)=\"onNgModelChange($event)\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs._results, dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n    <button mat-button color=\"primary\" id=\"select\"\n            (click)=\"toggleSelect()\" *ngIf=\"showSelectAll\">\n      {{allSelected ? 'Reset selection' : 'Select all'}}\n    </button>\n  </div>\n\n  <div fxFlex=\"66%\" *ngIf=\"tabService.selectedOptions.length\">\n    <ng-content></ng-content>\n    <ng-template dynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n"
            },] },
];
TabsComponent.ctorParameters = function () { return [
    { type: core.ComponentFactoryResolver, },
    { type: TabsService, },
]; };
TabsComponent.propDecorators = {
    "tabs": [{ type: core.ContentChildren, args: [TabComponent,] },],
    "dynamicTabPlaceholder": [{ type: core.ViewChild, args: [DynamicTabAnchorDirective,] },],
    "list": [{ type: core.ViewChild, args: [material.MatSelectionList,] },],
    "multi": [{ type: core.Input },],
    "selectFirstTab": [{ type: core.Input },],
    "showSelectAll": [{ type: core.Input },],
};
var TabsModule = /** @class */ (function () {
    function TabsModule() {
    }
    TabsModule.forRoot = function () {
        return { ngModule: TabsModule, providers: [TabsService] };
    };
    return TabsModule;
}());
TabsModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule, forms.FormsModule,
                    flexLayout.FlexLayoutModule,
                    material.MatListModule, material.MatDividerModule, material.MatButtonModule
                ],
                declarations: [TabsComponent, TabComponent, DynamicTabAnchorDirective],
                exports: [TabsComponent, TabComponent],
                entryComponents: [TabComponent]
            },] },
];

exports.TabsService = TabsService;
exports.TabsComponent = TabsComponent;
exports.TabComponent = TabComponent;
exports.TabsModule = TabsModule;
exports.ɵa = DynamicTabAnchorDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-vertical-tabs.umd.js.map
