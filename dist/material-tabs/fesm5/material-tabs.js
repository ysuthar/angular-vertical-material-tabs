import { Injectable, Directive, ViewContainerRef, Component, Input, ComponentFactoryResolver, ContentChildren, ViewChild, NgModule, defineInjectable } from '@angular/core';
import { MatSelectionList, MatButtonModule, MatDividerModule, MatListModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MaterialTabsService = /** @class */ (function () {
    function MaterialTabsService() {
        this.selectedOptions = [];
    }
    MaterialTabsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    MaterialTabsService.ctorParameters = function () { return []; };
    /** @nocollapse */ MaterialTabsService.ngInjectableDef = defineInjectable({ factory: function MaterialTabsService_Factory() { return new MaterialTabsService(); }, token: MaterialTabsService, providedIn: "root" });
    return MaterialTabsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DynamicTabAnchorDirective = /** @class */ (function () {
    function DynamicTabAnchorDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    DynamicTabAnchorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[verticalDynamicTabAnchor]'
                },] },
    ];
    /** @nocollapse */
    DynamicTabAnchorDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
    ]; };
    return DynamicTabAnchorDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MaterialTabComponent = /** @class */ (function () {
    function MaterialTabComponent(tabsService) {
        this.tabsService = tabsService;
        this.active = false;
        this.isCloseable = false;
    }
    MaterialTabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vertical-material-tab',
                    template: "<div *ngIf=\"active\" class=\"pane\">\n  <h3 class=\"tab-heading\" *ngIf=\"tabsService.multi && tabsService.selectedOptions.length > 1\">\n    {{tabTitle}}\n  </h3>\n  <ng-content></ng-content>\n  <ng-container *ngIf=\"template\"\n                [ngTemplateOutlet]=\"template\"\n                [ngTemplateOutletContext]=\"{person: dataContext}\">\n  </ng-container>\n</div>\n",
                    styles: ["\n    .pane {\n      padding: 1em;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    MaterialTabComponent.ctorParameters = function () { return [
        { type: MaterialTabsService, },
    ]; };
    MaterialTabComponent.propDecorators = {
        "tabTitle": [{ type: Input },],
        "active": [{ type: Input },],
        "template": [{ type: Input },],
        "dataContext": [{ type: Input },],
        "isCloseable": [{ type: Input },],
    };
    return MaterialTabComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MaterialTabsComponent = /** @class */ (function () {
    function MaterialTabsComponent(componentFactoryResolver, tabService) {
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
    MaterialTabsComponent.prototype.ngAfterContentInit = /**
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
    MaterialTabsComponent.prototype.toggleTabActivations = /**
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
    MaterialTabsComponent.prototype.setOptions = /**
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
    MaterialTabsComponent.prototype.onNgModelChange = /**
     * @return {?}
     */
    function () {
        this.setOptions();
        this.toggleTabActivations();
        this.checkSelectAll();
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    MaterialTabsComponent.prototype.selectTab = /**
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
    MaterialTabsComponent.prototype.checkSelectAll = /**
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
    MaterialTabsComponent.prototype.openTab = /**
     * @param {?} title
     * @param {?} template
     * @param {?} data
     * @param {?=} isCloseable
     * @return {?}
     */
    function (title, template, data, isCloseable) {
        if (isCloseable === void 0) { isCloseable = false; }
        var /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(MaterialTabComponent);
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
    MaterialTabsComponent.prototype.closeTab = /**
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
    MaterialTabsComponent.prototype.closeActiveTab = /**
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
    MaterialTabsComponent.prototype.toggleSelect = /**
     * @return {?}
     */
    function () {
        this.allSelected ? this.list.deselectAll() : this.list.selectAll();
        this.allSelected = !this.allSelected;
        this.checkSelectAll();
    };
    MaterialTabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vertical-material-tabs',
                    template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\" fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"tabService.selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange()\"\n                        (selectionChange)=\"onNgModelChange()\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs.toArray(), dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n    <button mat-button color=\"primary\" id=\"select\"\n            (click)=\"toggleSelect()\" *ngIf=\"showSelectAll\">\n      {{allSelected ? 'Reset selection' : 'Select all'}}\n    </button>\n  </div>\n\n  <div fxFlex=\"66%\" *ngIf=\"tabService.selectedOptions.length\">\n    <ng-content></ng-content>\n    <ng-template verticalDynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    MaterialTabsComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
        { type: MaterialTabsService, },
    ]; };
    MaterialTabsComponent.propDecorators = {
        "tabs": [{ type: ContentChildren, args: [MaterialTabComponent,] },],
        "dynamicTabPlaceholder": [{ type: ViewChild, args: [DynamicTabAnchorDirective,] },],
        "list": [{ type: ViewChild, args: [MatSelectionList,] },],
        "multi": [{ type: Input },],
        "selectFirstTab": [{ type: Input },],
        "showSelectAll": [{ type: Input },],
    };
    return MaterialTabsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { MaterialTabsService, MaterialTabsComponent, MaterialTabsModule, DynamicTabAnchorDirective as ɵb, MaterialTabComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtdGFicy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbWF0ZXJpYWwtdGFicy9saWIvbWF0ZXJpYWwtdGFicy5zZXJ2aWNlLnRzIiwibmc6Ly9tYXRlcmlhbC10YWJzL2xpYi9keW5hbWljLXRhYi1hbmNob3IuZGlyZWN0aXZlLnRzIiwibmc6Ly9tYXRlcmlhbC10YWJzL2xpYi9tYXRlcmlhbC10YWIuY29tcG9uZW50LnRzIiwibmc6Ly9tYXRlcmlhbC10YWJzL2xpYi9tYXRlcmlhbC10YWJzLmNvbXBvbmVudC50cyIsIm5nOi8vbWF0ZXJpYWwtdGFicy9saWIvbWF0ZXJpYWwtdGFicy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbFRhYnNTZXJ2aWNlIHtcbiAgbXVsdGk6IGJvb2xlYW47XG4gIHNlbGVjdGVkT3B0aW9uczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t2ZXJ0aWNhbER5bmFtaWNUYWJBbmNob3JdJ1xufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNYXRlcmlhbFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9tYXRlcmlhbC10YWJzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2ZXJ0aWNhbC1tYXRlcmlhbC10YWInLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJhY3RpdmVcIiBjbGFzcz1cInBhbmVcIj5cbiAgPGgzIGNsYXNzPVwidGFiLWhlYWRpbmdcIiAqbmdJZj1cInRhYnNTZXJ2aWNlLm11bHRpICYmIHRhYnNTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGggPiAxXCI+XG4gICAge3t0YWJUaXRsZX19XG4gIDwvaDM+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntwZXJzb246IGRhdGFDb250ZXh0fVwiPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYFxuICAgIC5wYW5lIHtcbiAgICAgIHBhZGRpbmc6IDFlbTtcbiAgICB9XG4gIGBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsVGFiQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRhYnNTZXJ2aWNlOiBNYXRlcmlhbFRhYnNTZXJ2aWNlKSB7XG4gIH1cblxuICBASW5wdXQoKSB0YWJUaXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSBhY3RpdmUgPSBmYWxzZTtcbiAgQElucHV0KCkgdGVtcGxhdGU7XG4gIEBJbnB1dCgpIGRhdGFDb250ZXh0O1xuICBASW5wdXQoKSBpc0Nsb3NlYWJsZSA9IGZhbHNlO1xufVxuIiwiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTZWxlY3Rpb25MaXN0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9keW5hbWljLXRhYi1hbmNob3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hdGVyaWFsVGFiQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsVGFic1NlcnZpY2UgfSBmcm9tICcuL21hdGVyaWFsLXRhYnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3ZlcnRpY2FsLW1hdGVyaWFsLXRhYnMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjFweFwiIGZ4TGF5b3V0LnhzPVwiY29sdW1uXCI+XG4gIDxkaXYgZnhGbGV4PVwiMzMlXCI+XG4gICAgPG1hdC1zZWxlY3Rpb24tbGlzdCAjbGlzdCBbKG5nTW9kZWwpXT1cInRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uTmdNb2RlbENoYW5nZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChzZWxlY3Rpb25DaGFuZ2UpPVwib25OZ01vZGVsQ2hhbmdlKClcIj5cbiAgICAgIDxtYXQtbGlzdC1vcHRpb24gKm5nRm9yPVwibGV0IHRhYiBvZiBbXS5jb25jYXQodGFicy50b0FycmF5KCksIGR5bmFtaWNUYWJzKVwiIFt2YWx1ZV09XCJ0YWIudGFiVGl0bGVcIj5cbiAgICAgICAge3t0YWIudGFiVGl0bGV9fVxuICAgICAgPC9tYXQtbGlzdC1vcHRpb24+XG4gICAgPC9tYXQtc2VsZWN0aW9uLWxpc3Q+XG4gICAgPG1hdC1kaXZpZGVyPjwvbWF0LWRpdmlkZXI+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIGlkPVwic2VsZWN0XCJcbiAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVTZWxlY3QoKVwiICpuZ0lmPVwic2hvd1NlbGVjdEFsbFwiPlxuICAgICAge3thbGxTZWxlY3RlZCA/ICdSZXNldCBzZWxlY3Rpb24nIDogJ1NlbGVjdCBhbGwnfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBmeEZsZXg9XCI2NiVcIiAqbmdJZj1cInRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aFwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8bmctdGVtcGxhdGUgdmVydGljYWxEeW5hbWljVGFiQW5jaG9yICNjb250YWluZXI+PC9uZy10ZW1wbGF0ZT5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0ZXJpYWxUYWJDb21wb25lbnQpIHRhYnM6IFF1ZXJ5TGlzdDxNYXRlcmlhbFRhYkNvbXBvbmVudD47XG4gIEBWaWV3Q2hpbGQoRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSkgZHluYW1pY1RhYlBsYWNlaG9sZGVyOiBEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlO1xuXG4gIEBWaWV3Q2hpbGQoTWF0U2VsZWN0aW9uTGlzdCkgbGlzdDogTWF0U2VsZWN0aW9uTGlzdDtcblxuICBASW5wdXQoKSBtdWx0aSA9IHRydWU7XG4gIEBJbnB1dCgpIHNlbGVjdEZpcnN0VGFiID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1NlbGVjdEFsbCA9IGZhbHNlO1xuICBhbGxTZWxlY3RlZCA9IHRydWU7XG5cbiAgZHluYW1pY1RhYnM6IE1hdGVyaWFsVGFiQ29tcG9uZW50W10gPSBbXTtcblxuICBsYXN0U2VsZWN0ZWRPcHRpb25zOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgdGFiU2VydmljZTogTWF0ZXJpYWxUYWJzU2VydmljZSkge1xuICAgIHRoaXMudGFiU2VydmljZS5tdWx0aSA9IHRoaXMubXVsdGk7XG4gIH1cblxuICAvLyBjb250ZW50Q2hpbGRyZW4gYXJlIHNldFxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gYWN0aXZlIHRhYiBzZXQsIGFjdGl2YXRlIHRoZSBmaXJzdFxuICAgIGlmICh0aGlzLnNlbGVjdEZpcnN0VGFiICYmICF0aGlzLnRhYnMuZmlsdGVyKHRhYiA9PiB0YWIuYWN0aXZlKS5sZW5ndGgpXG4gICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnMuZmlyc3QpO1xuICAgIGVsc2UgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVUYWJBY3RpdmF0aW9ucygpIHtcbiAgICBjb25zdCBhcnI6IE1hdGVyaWFsVGFiQ29tcG9uZW50W10gPSB0aGlzLnRhYnMudG9BcnJheSgpLmNvbmNhdCh0aGlzLmR5bmFtaWNUYWJzKTtcbiAgICBpZiAoYXJyID09IG51bGwgfHwgYXJyLmxlbmd0aCA8IDEpIHJldHVybjtcbiAgICBjb25zdCBzID0gbmV3IFNldCh0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zKTtcbiAgICBhcnIuZm9yRWFjaCh0YWIgPT4gdGFiLmFjdGl2ZSA9IHMuaGFzKHRhYi50YWJUaXRsZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRPcHRpb25zKCkge1xuICAgIGlmICh0aGlzLm11bHRpIHx8ICF0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCB8fFxuICAgICAgIXRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucyB8fCAhdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zLmxlbmd0aClcbiAgICAgIHJldHVybjtcblxuICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmZpbHRlcihcbiAgICAgIHRhYlRpdGxlID0+IHRhYlRpdGxlICE9PSB0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnNbdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zLmxlbmd0aCAtIDFdXG4gICAgKTtcblxuICAgIHRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucyA9IHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnM7XG4gIH1cblxuICBvbk5nTW9kZWxDaGFuZ2UoLypzZWxlY3RlZDogc3RyaW5nW10qLykge1xuICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgIHRoaXMudG9nZ2xlVGFiQWN0aXZhdGlvbnMoKTtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBzZWxlY3RUYWIodGFiOiBNYXRlcmlhbFRhYkNvbXBvbmVudCkge1xuICAgIHRoaXMubXVsdGkgP1xuICAgICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5wdXNoKHRhYi50YWJUaXRsZSlcbiAgICAgIDogdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IFt0YWIudGFiVGl0bGVdO1xuICAgIHRhYi5hY3RpdmUgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLmxpc3Qub3B0aW9ucykgcmV0dXJuO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMubGlzdC5vcHRpb25zLm1hcCh0ID0+IHQudmFsdWUpO1xuICAgIGNvbnN0IHMgPSBuZXcgU2V0KHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMpO1xuICAgIHRoaXMubGlzdC5vcHRpb25zLmZvckVhY2godCA9PiB7XG4gICAgICB0LnNlbGVjdGVkID0gcy5oYXModC52YWx1ZSk7XG4gICAgICAvLyBjb25zb2xlLmluZm8oYCcke3QudmFsdWV9JyBzZWxlY3RlZDpgLCB0LnNlbGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG9wdGlvbnNfc2V0ID0gbmV3IFNldChvcHRpb25zKTtcbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGlmICghb3B0aW9uc19zZXQuaGFzKG9wdGlvbikpXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihgJyR7b3B0aW9ufScgbm90IGZvdW5kIGluIG1hdC1zZWxlY3Rpb24tbGlzdGApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1NlbGVjdEFsbCgpIHtcbiAgICBpZiAoIXRoaXMubGlzdCB8fCAhdGhpcy5saXN0Lm9wdGlvbnMpIHJldHVybjtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID0gdGhpcy5saXN0Lm9wdGlvbnMubGVuZ3RoIDwgMSA/IGZhbHNlXG4gICAgICA6IHRoaXMubGlzdC5vcHRpb25zLnJlZHVjZSgocCwgYykgPT4gcCA/IGMuc2VsZWN0ZWQgOiBwLCB0cnVlKTtcbiAgfVxuXG4gIG9wZW5UYWIodGl0bGU6IHN0cmluZywgdGVtcGxhdGUsIGRhdGEsIGlzQ2xvc2VhYmxlID0gZmFsc2UpIHtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXG4gICAgICBNYXRlcmlhbFRhYkNvbXBvbmVudFxuICAgICk7XG5cbiAgICAvLyBjcmVhdGUgYSBjb21wb25lbnQgaW5zdGFuY2VcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmR5bmFtaWNUYWJQbGFjZWhvbGRlci52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblxuICAgIC8vIHNldCB0aGUgYWNjb3JkaW5nIHByb3BlcnRpZXMgb24gb3VyIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgIGNvbnN0IGluc3RhbmNlOiBNYXRlcmlhbFRhYkNvbXBvbmVudCA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZSBhcyBNYXRlcmlhbFRhYkNvbXBvbmVudDtcbiAgICBpbnN0YW5jZS50YWJUaXRsZSA9IHRpdGxlO1xuICAgIGluc3RhbmNlLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgaW5zdGFuY2UuZGF0YUNvbnRleHQgPSBkYXRhO1xuICAgIGluc3RhbmNlLmlzQ2xvc2VhYmxlID0gaXNDbG9zZWFibGU7XG4gICAgaW5zdGFuY2UuYWN0aXZlID0gdHJ1ZTtcblxuICAgIHRoaXMuZHluYW1pY1RhYnMucHVzaChpbnN0YW5jZSk7XG4gICAgdGhpcy5zZWxlY3RUYWIodGhpcy5keW5hbWljVGFic1t0aGlzLmR5bmFtaWNUYWJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuXG5cbiAgY2xvc2VUYWIodGFiOiBNYXRlcmlhbFRhYkNvbXBvbmVudCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5keW5hbWljVGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZHluYW1pY1RhYnNbaV0gPT09IHRhYikge1xuICAgICAgICB0aGlzLmR5bmFtaWNUYWJzLnNwbGljZShpLCAxKTtcblxuICAgICAgICB0aGlzLmR5bmFtaWNUYWJQbGFjZWhvbGRlci52aWV3Q29udGFpbmVyLnJlbW92ZShpKTtcbiAgICAgICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IFt0YWIudGFiVGl0bGVdOyAgLy8gVE9ETzogZHVwbGljYXRlIGhhbmRsaW5nXG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFicy5maXJzdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBjbG9zZUFjdGl2ZVRhYigpIHtcbiAgICBpZiAodGhpcy5tdWx0aSkgY29uc29sZS53YXJuKCdDbG9zaW5nIHRoZSBmaXJzdCBhY3RpdmUgdGFiJyk7XG4gICAgY29uc3QgYWN0aXZlVGFiID0gdGhpcy5keW5hbWljVGFicy5maWx0ZXIodGFiID0+IHRhYi5hY3RpdmUpO1xuICAgIGlmIChhY3RpdmVUYWIubGVuZ3RoID4gMCkgdGhpcy5jbG9zZVRhYihhY3RpdmVUYWJbMF0pO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHRvZ2dsZVNlbGVjdCgpIHtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID8gdGhpcy5saXN0LmRlc2VsZWN0QWxsKCkgOiB0aGlzLmxpc3Quc2VsZWN0QWxsKCk7XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA9ICF0aGlzLmFsbFNlbGVjdGVkO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0RGl2aWRlck1vZHVsZSwgTWF0TGlzdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSB9IGZyb20gJy4vZHluYW1pYy10YWItYW5jaG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYXRlcmlhbFRhYkNvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbFRhYnNDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLXRhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsVGFic1NlcnZpY2UgfSBmcm9tICcuL21hdGVyaWFsLXRhYnMuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSwgTWF0RGl2aWRlck1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW01hdGVyaWFsVGFiQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0ZXJpYWxUYWJDb21wb25lbnQsIE1hdGVyaWFsVGFic0NvbXBvbmVudCwgRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtNYXRlcmlhbFRhYnNDb21wb25lbnQsIE1hdGVyaWFsVGFiQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbFRhYnNNb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHsgbmdNb2R1bGU6IE1hdGVyaWFsVGFic01vZHVsZSwgcHJvdmlkZXJzOiBbTWF0ZXJpYWxUYWJzU2VydmljZV0gfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtJQVNFO1FBQ0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7S0FDM0I7O2dCQVRGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7OzhCQUpEOzs7Ozs7O0FDQUE7SUFNRSxtQ0FBbUIsYUFBK0I7UUFBL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO0tBQ2pEOztnQkFMRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtpQkFDdkM7Ozs7Z0JBSm1CLGdCQUFnQjs7b0NBQXBDOzs7Ozs7O0FDQUE7SUF3QkUsOEJBQW1CLFdBQWdDO1FBQWhDLGdCQUFXLEdBQVgsV0FBVyxDQUFxQjtzQkFJakMsS0FBSzsyQkFHQSxLQUFLO0tBTjNCOztnQkFyQkYsU0FBUyxTQUFDO29CQUNULFFB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