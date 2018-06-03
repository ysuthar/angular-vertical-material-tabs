(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material'), require('@angular/common'), require('@angular/forms'), require('@angular/flex-layout')) :
    typeof define === 'function' && define.amd ? define('material-tabs', ['exports', '@angular/core', '@angular/material', '@angular/common', '@angular/forms', '@angular/flex-layout'], factory) :
    (factory((global['material-tabs'] = {}),global.ng.core,global.ng.material,global.ng.common,global.ng.forms,global.ng['flex-layout']));
}(this, (function (exports,i0,material,common,forms,flexLayout) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MaterialTabsService = (function () {
        function MaterialTabsService() {
            this.selectedOptions = [];
        }
        MaterialTabsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        MaterialTabsService.ctorParameters = function () { return []; };
        /** @nocollapse */ MaterialTabsService.ngInjectableDef = i0.defineInjectable({ factory: function MaterialTabsService_Factory() { return new MaterialTabsService(); }, token: MaterialTabsService, providedIn: "root" });
        return MaterialTabsService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DynamicTabAnchorDirective = (function () {
        function DynamicTabAnchorDirective(viewContainer) {
            this.viewContainer = viewContainer;
        }
        DynamicTabAnchorDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[verticalDynamicTabAnchor]'
                    },] },
        ];
        /** @nocollapse */
        DynamicTabAnchorDirective.ctorParameters = function () {
            return [
                { type: i0.ViewContainerRef, },
            ];
        };
        return DynamicTabAnchorDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MaterialTabComponent = (function () {
        function MaterialTabComponent(tabsService) {
            this.tabsService = tabsService;
            this.active = false;
            this.isCloseable = false;
        }
        MaterialTabComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'vertical-material-tab',
                        template: "<div *ngIf=\"active\" class=\"pane\">\n  <h3 class=\"tab-heading\" *ngIf=\"tabsService.multi && tabsService.selectedOptions.length > 1\">\n    {{tabTitle}}\n  </h3>\n  <ng-content></ng-content>\n  <ng-container *ngIf=\"template\"\n                [ngTemplateOutlet]=\"template\"\n                [ngTemplateOutletContext]=\"{person: dataContext}\">\n  </ng-container>\n</div>\n",
                        styles: ["\n    .pane {\n      padding: 1em;\n    }\n  "]
                    },] },
        ];
        /** @nocollapse */
        MaterialTabComponent.ctorParameters = function () {
            return [
                { type: MaterialTabsService, },
            ];
        };
        MaterialTabComponent.propDecorators = {
            "tabTitle": [{ type: i0.Input },],
            "active": [{ type: i0.Input },],
            "template": [{ type: i0.Input },],
            "dataContext": [{ type: i0.Input },],
            "isCloseable": [{ type: i0.Input },],
        };
        return MaterialTabComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MaterialTabsComponent = (function () {
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
                if (isCloseable === void 0) {
                    isCloseable = false;
                }
                var /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(MaterialTabComponent);
                // create a component instance
                var /** @type {?} */ componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);
                // set the according properties on our component instance
                var /** @type {?} */ instance = (componentRef.instance);
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
            { type: i0.Component, args: [{
                        selector: 'vertical-material-tabs',
                        template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\" fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"tabService.selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange()\"\n                        (selectionChange)=\"onNgModelChange()\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs.toArray(), dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n    <button mat-button color=\"primary\" id=\"select\"\n            (click)=\"toggleSelect()\" *ngIf=\"showSelectAll\">\n      {{allSelected ? 'Reset selection' : 'Select all'}}\n    </button>\n  </div>\n\n  <div fxFlex=\"66%\" *ngIf=\"tabService.selectedOptions.length\">\n    <ng-content></ng-content>\n    <ng-template verticalDynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n",
                        styles: []
                    },] },
        ];
        /** @nocollapse */
        MaterialTabsComponent.ctorParameters = function () {
            return [
                { type: i0.ComponentFactoryResolver, },
                { type: MaterialTabsService, },
            ];
        };
        MaterialTabsComponent.propDecorators = {
            "tabs": [{ type: i0.ContentChildren, args: [MaterialTabComponent,] },],
            "dynamicTabPlaceholder": [{ type: i0.ViewChild, args: [DynamicTabAnchorDirective,] },],
            "list": [{ type: i0.ViewChild, args: [material.MatSelectionList,] },],
            "multi": [{ type: i0.Input },],
            "selectFirstTab": [{ type: i0.Input },],
            "showSelectAll": [{ type: i0.Input },],
        };
        return MaterialTabsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MaterialTabsModule = (function () {
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
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule, forms.FormsModule,
                            flexLayout.FlexLayoutModule,
                            material.MatListModule, material.MatDividerModule, material.MatButtonModule
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

    exports.MaterialTabsService = MaterialTabsService;
    exports.MaterialTabsComponent = MaterialTabsComponent;
    exports.MaterialTabsModule = MaterialTabsModule;
    exports.ɵb = DynamicTabAnchorDirective;
    exports.ɵa = MaterialTabComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtdGFicy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL21hdGVyaWFsLXRhYnMvbGliL21hdGVyaWFsLXRhYnMuc2VydmljZS50cyIsIm5nOi8vbWF0ZXJpYWwtdGFicy9saWIvZHluYW1pYy10YWItYW5jaG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vbWF0ZXJpYWwtdGFicy9saWIvbWF0ZXJpYWwtdGFiLmNvbXBvbmVudC50cyIsIm5nOi8vbWF0ZXJpYWwtdGFicy9saWIvbWF0ZXJpYWwtdGFicy5jb21wb25lbnQudHMiLCJuZzovL21hdGVyaWFsLXRhYnMvbGliL21hdGVyaWFsLXRhYnMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxUYWJzU2VydmljZSB7XG4gIG11bHRpOiBib29sZWFuO1xuICBzZWxlY3RlZE9wdGlvbnM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdmVydGljYWxEeW5hbWljVGFiQW5jaG9yXSdcbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWF0ZXJpYWxUYWJzU2VydmljZSB9IGZyb20gJy4vbWF0ZXJpYWwtdGFicy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndmVydGljYWwtbWF0ZXJpYWwtdGFiJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiYWN0aXZlXCIgY2xhc3M9XCJwYW5lXCI+XG4gIDxoMyBjbGFzcz1cInRhYi1oZWFkaW5nXCIgKm5nSWY9XCJ0YWJzU2VydmljZS5tdWx0aSAmJiB0YWJzU2VydmljZS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMVwiPlxuICAgIHt7dGFiVGl0bGV9fVxuICA8L2gzPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0ZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cGVyc29uOiBkYXRhQ29udGV4dH1cIj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BcbiAgICAucGFuZSB7XG4gICAgICBwYWRkaW5nOiAxZW07XG4gICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbFRhYkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJzU2VydmljZTogTWF0ZXJpYWxUYWJzU2VydmljZSkge1xuICB9XG5cbiAgQElucHV0KCkgdGFiVGl0bGU6IHN0cmluZztcbiAgQElucHV0KCkgYWN0aXZlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRlbXBsYXRlO1xuICBASW5wdXQoKSBkYXRhQ29udGV4dDtcbiAgQElucHV0KCkgaXNDbG9zZWFibGUgPSBmYWxzZTtcbn1cbiIsImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U2VsZWN0aW9uTGlzdCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSB9IGZyb20gJy4vZHluYW1pYy10YWItYW5jaG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYXRlcmlhbFRhYkNvbXBvbmVudCB9IGZyb20gJy4vbWF0ZXJpYWwtdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9tYXRlcmlhbC10YWJzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2ZXJ0aWNhbC1tYXRlcmlhbC10YWJzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIxcHhcIiBmeExheW91dC54cz1cImNvbHVtblwiPlxuICA8ZGl2IGZ4RmxleD1cIjMzJVwiPlxuICAgIDxtYXQtc2VsZWN0aW9uLWxpc3QgI2xpc3QgWyhuZ01vZGVsKV09XCJ0YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJvbk5nTW9kZWxDaGFuZ2UoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoc2VsZWN0aW9uQ2hhbmdlKT1cIm9uTmdNb2RlbENoYW5nZSgpXCI+XG4gICAgICA8bWF0LWxpc3Qtb3B0aW9uICpuZ0Zvcj1cImxldCB0YWIgb2YgW10uY29uY2F0KHRhYnMudG9BcnJheSgpLCBkeW5hbWljVGFicylcIiBbdmFsdWVdPVwidGFiLnRhYlRpdGxlXCI+XG4gICAgICAgIHt7dGFiLnRhYlRpdGxlfX1cbiAgICAgIDwvbWF0LWxpc3Qtb3B0aW9uPlxuICAgIDwvbWF0LXNlbGVjdGlvbi1saXN0PlxuICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiBpZD1cInNlbGVjdFwiXG4gICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlU2VsZWN0KClcIiAqbmdJZj1cInNob3dTZWxlY3RBbGxcIj5cbiAgICAgIHt7YWxsU2VsZWN0ZWQgPyAnUmVzZXQgc2VsZWN0aW9uJyA6ICdTZWxlY3QgYWxsJ319XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4PVwiNjYlXCIgKm5nSWY9XCJ0YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGhcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG5nLXRlbXBsYXRlIHZlcnRpY2FsRHluYW1pY1RhYkFuY2hvciAjY29udGFpbmVyPjwvbmctdGVtcGxhdGU+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAQ29udGVudENoaWxkcmVuKE1hdGVyaWFsVGFiQ29tcG9uZW50KSB0YWJzOiBRdWVyeUxpc3Q8TWF0ZXJpYWxUYWJDb21wb25lbnQ+O1xuICBAVmlld0NoaWxkKER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUpIGR5bmFtaWNUYWJQbGFjZWhvbGRlcjogRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZTtcblxuICBAVmlld0NoaWxkKE1hdFNlbGVjdGlvbkxpc3QpIGxpc3Q6IE1hdFNlbGVjdGlvbkxpc3Q7XG5cbiAgQElucHV0KCkgbXVsdGkgPSB0cnVlO1xuICBASW5wdXQoKSBzZWxlY3RGaXJzdFRhYiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dTZWxlY3RBbGwgPSBmYWxzZTtcbiAgYWxsU2VsZWN0ZWQgPSB0cnVlO1xuXG4gIGR5bmFtaWNUYWJzOiBNYXRlcmlhbFRhYkNvbXBvbmVudFtdID0gW107XG5cbiAgbGFzdFNlbGVjdGVkT3B0aW9uczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgcHVibGljIHRhYlNlcnZpY2U6IE1hdGVyaWFsVGFic1NlcnZpY2UpIHtcbiAgICB0aGlzLnRhYlNlcnZpY2UubXVsdGkgPSB0aGlzLm11bHRpO1xuICB9XG5cbiAgLy8gY29udGVudENoaWxkcmVuIGFyZSBzZXRcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGFjdGl2ZSB0YWIgc2V0LCBhY3RpdmF0ZSB0aGUgZmlyc3RcbiAgICBpZiAodGhpcy5zZWxlY3RGaXJzdFRhYiAmJiAhdGhpcy50YWJzLmZpbHRlcih0YWIgPT4gdGFiLmFjdGl2ZSkubGVuZ3RoKVxuICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy50YWJzLmZpcnN0KTtcbiAgICBlbHNlIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlVGFiQWN0aXZhdGlvbnMoKSB7XG4gICAgY29uc3QgYXJyOiBNYXRlcmlhbFRhYkNvbXBvbmVudFtdID0gdGhpcy50YWJzLnRvQXJyYXkoKS5jb25jYXQodGhpcy5keW5hbWljVGFicyk7XG4gICAgaWYgKGFyciA9PSBudWxsIHx8IGFyci5sZW5ndGggPCAxKSByZXR1cm47XG4gICAgY29uc3QgcyA9IG5ldyBTZXQodGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyk7XG4gICAgYXJyLmZvckVhY2godGFiID0+IHRhYi5hY3RpdmUgPSBzLmhhcyh0YWIudGFiVGl0bGUpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucygpIHtcbiAgICBpZiAodGhpcy5tdWx0aSB8fCAhdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGggfHxcbiAgICAgICF0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMgfHwgIXRoaXMubGFzdFNlbGVjdGVkT3B0aW9ucy5sZW5ndGgpXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zID0gdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5maWx0ZXIoXG4gICAgICB0YWJUaXRsZSA9PiB0YWJUaXRsZSAhPT0gdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zW3RoaXMubGFzdFNlbGVjdGVkT3B0aW9ucy5sZW5ndGggLSAxXVxuICAgICk7XG5cbiAgICB0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zO1xuICB9XG5cbiAgb25OZ01vZGVsQ2hhbmdlKC8qc2VsZWN0ZWQ6IHN0cmluZ1tdKi8pIHtcbiAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICB0aGlzLnRvZ2dsZVRhYkFjdGl2YXRpb25zKCk7XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgc2VsZWN0VGFiKHRhYjogTWF0ZXJpYWxUYWJDb21wb25lbnQpIHtcbiAgICB0aGlzLm11bHRpID9cbiAgICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMucHVzaCh0YWIudGFiVGl0bGUpXG4gICAgICA6IHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSBbdGFiLnRhYlRpdGxlXTtcbiAgICB0YWIuYWN0aXZlID0gdHJ1ZTtcblxuICAgIGlmICghdGhpcy5saXN0Lm9wdGlvbnMpIHJldHVybjtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmxpc3Qub3B0aW9ucy5tYXAodCA9PiB0LnZhbHVlKTtcbiAgICBjb25zdCBzID0gbmV3IFNldCh0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zKTtcbiAgICB0aGlzLmxpc3Qub3B0aW9ucy5mb3JFYWNoKHQgPT4ge1xuICAgICAgdC5zZWxlY3RlZCA9IHMuaGFzKHQudmFsdWUpO1xuICAgICAgLy8gY29uc29sZS5pbmZvKGAnJHt0LnZhbHVlfScgc2VsZWN0ZWQ6YCwgdC5zZWxlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvcHRpb25zX3NldCA9IG5ldyBTZXQob3B0aW9ucyk7XG4gICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBpZiAoIW9wdGlvbnNfc2V0LmhhcyhvcHRpb24pKVxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoYCcke29wdGlvbn0nIG5vdCBmb3VuZCBpbiBtYXQtc2VsZWN0aW9uLWxpc3RgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tTZWxlY3RBbGwoKSB7XG4gICAgaWYgKCF0aGlzLmxpc3QgfHwgIXRoaXMubGlzdC5vcHRpb25zKSByZXR1cm47XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA9IHRoaXMubGlzdC5vcHRpb25zLmxlbmd0aCA8IDEgPyBmYWxzZVxuICAgICAgOiB0aGlzLmxpc3Qub3B0aW9ucy5yZWR1Y2UoKHAsIGMpID0+IHAgPyBjLnNlbGVjdGVkIDogcCwgdHJ1ZSk7XG4gIH1cblxuICBvcGVuVGFiKHRpdGxlOiBzdHJpbmcsIHRlbXBsYXRlLCBkYXRhLCBpc0Nsb3NlYWJsZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgTWF0ZXJpYWxUYWJDb21wb25lbnRcbiAgICApO1xuXG4gICAgLy8gY3JlYXRlIGEgY29tcG9uZW50IGluc3RhbmNlXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5keW5hbWljVGFiUGxhY2Vob2xkZXIudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAvLyBzZXQgdGhlIGFjY29yZGluZyBwcm9wZXJ0aWVzIG9uIG91ciBjb21wb25lbnQgaW5zdGFuY2VcbiAgICBjb25zdCBpbnN0YW5jZTogTWF0ZXJpYWxUYWJDb21wb25lbnQgPSBjb21wb25lbnRSZWYuaW5zdGFuY2UgYXMgTWF0ZXJpYWxUYWJDb21wb25lbnQ7XG4gICAgaW5zdGFuY2UudGFiVGl0bGUgPSB0aXRsZTtcbiAgICBpbnN0YW5jZS50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIGluc3RhbmNlLmRhdGFDb250ZXh0ID0gZGF0YTtcbiAgICBpbnN0YW5jZS5pc0Nsb3NlYWJsZSA9IGlzQ2xvc2VhYmxlO1xuICAgIGluc3RhbmNlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLmR5bmFtaWNUYWJzLnB1c2goaW5zdGFuY2UpO1xuICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMuZHluYW1pY1RhYnNbdGhpcy5keW5hbWljVGFicy5sZW5ndGggLSAxXSk7XG4gIH1cblxuXG4gIGNsb3NlVGFiKHRhYjogTWF0ZXJpYWxUYWJDb21wb25lbnQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZHluYW1pY1RhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmR5bmFtaWNUYWJzW2ldID09PSB0YWIpIHtcbiAgICAgICAgdGhpcy5keW5hbWljVGFicy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgdGhpcy5keW5hbWljVGFiUGxhY2Vob2xkZXIudmlld0NvbnRhaW5lci5yZW1vdmUoaSk7XG4gICAgICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMgPSBbdGFiLnRhYlRpdGxlXTsgIC8vIFRPRE86IGR1cGxpY2F0ZSBoYW5kbGluZ1xuICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnRhYnMuZmlyc3QpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgY2xvc2VBY3RpdmVUYWIoKSB7XG4gICAgaWYgKHRoaXMubXVsdGkpIGNvbnNvbGUud2FybignQ2xvc2luZyB0aGUgZmlyc3QgYWN0aXZlIHRhYicpO1xuICAgIGNvbnN0IGFjdGl2ZVRhYiA9IHRoaXMuZHluYW1pY1RhYnMuZmlsdGVyKHRhYiA9PiB0YWIuYWN0aXZlKTtcbiAgICBpZiAoYWN0aXZlVGFiLmxlbmd0aCA+IDApIHRoaXMuY2xvc2VUYWIoYWN0aXZlVGFiWzBdKTtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICB0b2dnbGVTZWxlY3QoKSB7XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA/IHRoaXMubGlzdC5kZXNlbGVjdEFsbCgpIDogdGhpcy5saXN0LnNlbGVjdEFsbCgpO1xuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSAhdGhpcy5hbGxTZWxlY3RlZDtcbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdERpdmlkZXJNb2R1bGUsIE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmUgfSBmcm9tICcuL2R5bmFtaWMtdGFiLWFuY2hvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxUYWJDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxUYWJzQ29tcG9uZW50IH0gZnJvbSAnLi9tYXRlcmlhbC10YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi9tYXRlcmlhbC10YWJzLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsIE1hdERpdmlkZXJNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtNYXRlcmlhbFRhYkNvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW01hdGVyaWFsVGFiQ29tcG9uZW50LCBNYXRlcmlhbFRhYnNDb21wb25lbnQsIER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTWF0ZXJpYWxUYWJzQ29tcG9uZW50LCBNYXRlcmlhbFRhYkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxUYWJzTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBNYXRlcmlhbFRhYnNNb2R1bGUsIHByb3ZpZGVyczogW01hdGVyaWFsVGFic1NlcnZpY2VdIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiRGlyZWN0aXZlIiwiVmlld0NvbnRhaW5lclJlZiIsIkNvbXBvbmVudCIsIklucHV0IiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiQ29udGVudENoaWxkcmVuIiwiVmlld0NoaWxkIiwiTWF0U2VsZWN0aW9uTGlzdCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJGbGV4TGF5b3V0TW9kdWxlIiwiTWF0TGlzdE1vZHVsZSIsIk1hdERpdmlkZXJNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQVNFO1lBQ0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7U0FDM0I7O29CQVRGQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7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