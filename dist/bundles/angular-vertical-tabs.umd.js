(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@angular/material'), require('@angular/flex-layout')) :
	typeof define === 'function' && define.amd ? define('angular-vertical-tabs', ['exports', '@angular/core', '@angular/common', '@angular/forms', '@angular/material', '@angular/flex-layout'], factory) :
	(factory((global['angular-vertical-tabs'] = {}),global.ng.core,global.ng.common,global.ng.forms,global.ng.material,global.ng['flex-layout']));
}(this, (function (exports,core,common,forms,material,flexLayout) { 'use strict';

var TabComponent = /** @class */ (function () {
    function TabComponent() {
        this.active = false;
        this.isCloseable = false;
    }
    return TabComponent;
}());
TabComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'vertical-tab',
                styles: [
                    "\n    .pane{\n      padding: 1em;\n    }\n  "
                ],
                template: "\n    <div *ngIf=\"active\" class=\"pane\">\n      <ng-content></ng-content>\n      <ng-container *ngIf=\"template\"\n        [ngTemplateOutlet]=\"template\"\n        [ngTemplateOutletContext]=\"{person: dataContext}\">\n      </ng-container>\n    </div>\n  "
            },] },
];
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
    function TabsComponent(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.multitab = true;
        this.dynamicTabs = [];
    }
    TabsComponent.prototype.ngAfterContentInit = function () {
        var activeTabs = this.tabs.filter(function (tab) { return tab.active; });
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    };
    TabsComponent.prototype.onNgModelChange = function (event) {
        var _this = this;
        if (!this.multitab) {
            if (this.selectedOptions && this.selectedOptions.length > 1)
                delete this.selectedOptions[this.selectedOptions.indexOf(this.lastSelectedOptions[0])];
            this.lastSelectedOptions = this.selectedOptions;
        }
        this.deactivateTabs();
        var activate = function (arr) {
            if (arr == null || arr.length < 1)
                return;
            var s = new Set(_this.selectedOptions);
            for (var i = 0; i < arr.length; i++)
                if (s.has(arr[i].tabTitle)) {
                    arr[i].active = true;
                    if (!_this.multitab)
                        return;
                }
                else
                    arr[i].active = false;
        };
        activate(this.tabs.toArray());
        activate(this.dynamicTabs);
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
        this.dynamicTabs.push(instance);
        this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
    };
    TabsComponent.prototype.deactivateTabs = function () {
        this.tabs.toArray().forEach(function (_tab) { return _tab.active = false; });
        this.dynamicTabs.forEach(function (_tab) { return _tab.active = false; });
    };
    TabsComponent.prototype.selectTab = function (tab) {
        this.deactivateTabs();
        tab.active = true;
        this.selectedOptions = [tab.tabTitle];
    };
    TabsComponent.prototype.closeTab = function (tab) {
        for (var i = 0; i < this.dynamicTabs.length; i++) {
            if (this.dynamicTabs[i] === tab) {
                this.dynamicTabs.splice(i, 1);
                this.dynamicTabPlaceholder.viewContainer.remove(i);
                this.selectTab(this.tabs.first);
                break;
            }
        }
    };
    TabsComponent.prototype.closeActiveTab = function () {
        var activeTab = this.dynamicTabs.filter(function (tab) { return tab.active; });
        if (activeTab.length > 0) {
            this.closeTab(activeTab[0]);
        }
    };
    return TabsComponent;
}());
TabsComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'vertical-tabs',
                template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\"\n     fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"selectedOptions\" (ngModelChange)=\"onNgModelChange($event)\" role=\"option\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs._results, dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n  </div>\n\n  <div fxFlex=\"66%\">\n    <ng-content></ng-content>\n    <ng-template dynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n"
            },] },
];
TabsComponent.ctorParameters = function () { return [
    { type: core.ComponentFactoryResolver, },
]; };
TabsComponent.propDecorators = {
    "tabs": [{ type: core.ContentChildren, args: [TabComponent,] },],
    "dynamicTabPlaceholder": [{ type: core.ViewChild, args: [DynamicTabAnchorDirective,] },],
    "multitab": [{ type: core.Input },],
};
var TabsModule = /** @class */ (function () {
    function TabsModule() {
    }
    return TabsModule;
}());
TabsModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule, forms.FormsModule,
                    flexLayout.FlexLayoutModule,
                    material.MatListModule, material.MatDividerModule
                ],
                declarations: [TabsComponent, TabComponent, DynamicTabAnchorDirective],
                exports: [TabsComponent, TabComponent],
                entryComponents: [TabComponent]
            },] },
];

exports.TabsComponent = TabsComponent;
exports.TabComponent = TabComponent;
exports.TabsModule = TabsModule;
exports.ɵa = DynamicTabAnchorDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-vertical-tabs.umd.js.map
