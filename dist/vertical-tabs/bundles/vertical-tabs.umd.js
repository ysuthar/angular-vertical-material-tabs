(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material'), require('@angular/forms'), require('@angular/common'), require('@angular/flex-layout')) :
    typeof define === 'function' && define.amd ? define('vertical-tabs', ['exports', '@angular/core', '@angular/material', '@angular/forms', '@angular/common', '@angular/flex-layout'], factory) :
    (factory((global['vertical-tabs'] = {}),global.ng.core,global.ng.material,global.ng.forms,global.ng.common,global.ng['flex-layout']));
}(this, (function (exports,i0,material,forms,common,flexLayout) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var VerticalTabsService = (function () {
        function VerticalTabsService() {
            this.selectedOptions = [];
        }
        VerticalTabsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        VerticalTabsService.ctorParameters = function () { return []; };
        /** @nocollapse */ VerticalTabsService.ngInjectableDef = i0.defineInjectable({ factory: function VerticalTabsService_Factory() { return new VerticalTabsService(); }, token: VerticalTabsService, providedIn: "root" });
        return VerticalTabsService;
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
                { type: i0.ViewContainerRef }
            ];
        };
        return DynamicTabAnchorDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var VerticalTabComponent = (function () {
        function VerticalTabComponent(tabsService) {
            this.tabsService = tabsService;
            this.active = false;
            this.isCloseable = false;
        }
        VerticalTabComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ng-vertical-tab',
                        template: "<div *ngIf=\"active\" class=\"pane\">\n  <h3 class=\"tab-heading\" *ngIf=\"tabsService.multi && tabsService.selectedOptions.length > 1\">\n    {{tabTitle}}\n  </h3>\n  <ng-content></ng-content>\n  <ng-container *ngIf=\"template\"\n                [ngTemplateOutlet]=\"template\"\n                [ngTemplateOutletContext]=\"{person: dataContext}\">\n  </ng-container>\n</div>\n",
                        styles: ["\n    .pane {\n      padding: 1em;\n    }\n  "]
                    },] },
        ];
        /** @nocollapse */
        VerticalTabComponent.ctorParameters = function () {
            return [
                { type: VerticalTabsService }
            ];
        };
        VerticalTabComponent.propDecorators = {
            tabTitle: [{ type: i0.Input }],
            active: [{ type: i0.Input }],
            template: [{ type: i0.Input }],
            dataContext: [{ type: i0.Input }],
            isCloseable: [{ type: i0.Input }]
        };
        return VerticalTabComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var VerticalTabsComponent = (function () {
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
                if (isCloseable === void 0) {
                    isCloseable = false;
                }
                var /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(VerticalTabComponent);
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
            { type: i0.Component, args: [{
                        selector: 'ng-vertical-tabs',
                        template: "<div fxLayout=\"row\" fxLayoutGap=\"1px\" fxLayout.xs=\"column\">\n  <div fxFlex=\"33%\">\n    <mat-selection-list #list [(ngModel)]=\"tabService.selectedOptions\"\n                        (ngModelChange)=\"onNgModelChange()\">\n      <mat-list-option *ngFor=\"let tab of [].concat(tabs.toArray(), dynamicTabs)\" [value]=\"tab.tabTitle\">\n        {{tab.tabTitle}}\n      </mat-list-option>\n    </mat-selection-list>\n    <mat-divider></mat-divider>\n    <button mat-button color=\"primary\" id=\"select\"\n            (click)=\"toggleSelect()\" *ngIf=\"showSelectAll\">\n      {{allSelected ? 'Reset selection' : 'Select all'}}\n    </button>\n  </div>\n\n  <div fxFlex=\"66%\" *ngIf=\"tabService.selectedOptions.length\">\n    <ng-content></ng-content>\n    <ng-template verticalDynamicTabAnchor #container></ng-template>\n  </div>\n</div>\n",
                        styles: []
                    },] },
        ];
        /** @nocollapse */
        VerticalTabsComponent.ctorParameters = function () {
            return [
                { type: i0.ComponentFactoryResolver },
                { type: VerticalTabsService }
            ];
        };
        VerticalTabsComponent.propDecorators = {
            tabs: [{ type: i0.ContentChildren, args: [VerticalTabComponent,] }],
            dynamicTabPlaceholder: [{ type: i0.ViewChild, args: [DynamicTabAnchorDirective,] }],
            list: [{ type: i0.ViewChild, args: [material.MatSelectionList,] }],
            multi: [{ type: i0.Input }],
            selectFirstTab: [{ type: i0.Input }],
            showSelectAll: [{ type: i0.Input }]
        };
        return VerticalTabsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var VerticalTabsModule = (function () {
        function VerticalTabsModule() {
        }
        /**
         * @return {?}
         */
        VerticalTabsModule.forRoot = /**
         * @return {?}
         */
            function () {
                return { ngModule: VerticalTabsModule, providers: [VerticalTabsService] };
            };
        VerticalTabsModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule, forms.FormsModule,
                            flexLayout.FlexLayoutModule,
                            material.MatListModule, material.MatDividerModule, material.MatButtonModule
                        ],
                        entryComponents: [VerticalTabComponent],
                        declarations: [DynamicTabAnchorDirective, VerticalTabComponent, VerticalTabsComponent],
                        exports: [VerticalTabComponent, VerticalTabsComponent]
                    },] },
        ];
        return VerticalTabsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.VerticalTabsService = VerticalTabsService;
    exports.VerticalTabsComponent = VerticalTabsComponent;
    exports.VerticalTabsModule = VerticalTabsModule;
    exports.ɵb = DynamicTabAnchorDirective;
    exports.ɵa = VerticalTabComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtdGFicy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL3ZlcnRpY2FsLXRhYnMvbGliL3ZlcnRpY2FsLXRhYnMuc2VydmljZS50cyIsIm5nOi8vdmVydGljYWwtdGFicy9saWIvZHluYW1pYy10YWItYW5jaG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vdmVydGljYWwtdGFicy9saWIvdmVydGljYWwtdGFiLmNvbXBvbmVudC50cyIsIm5nOi8vdmVydGljYWwtdGFicy9saWIvdmVydGljYWwtdGFicy5jb21wb25lbnQudHMiLCJuZzovL3ZlcnRpY2FsLXRhYnMvbGliL3ZlcnRpY2FsLXRhYnMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVmVydGljYWxUYWJzU2VydmljZSB7XG4gIG11bHRpOiBib29sZWFuO1xuICBzZWxlY3RlZE9wdGlvbnM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdmVydGljYWxEeW5hbWljVGFiQW5jaG9yXSdcbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZlcnRpY2FsVGFic1NlcnZpY2UgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYnMuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctdmVydGljYWwtdGFiJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiYWN0aXZlXCIgY2xhc3M9XCJwYW5lXCI+XG4gIDxoMyBjbGFzcz1cInRhYi1oZWFkaW5nXCIgKm5nSWY9XCJ0YWJzU2VydmljZS5tdWx0aSAmJiB0YWJzU2VydmljZS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMVwiPlxuICAgIHt7dGFiVGl0bGV9fVxuICA8L2gzPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0ZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cGVyc29uOiBkYXRhQ29udGV4dH1cIj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BcbiAgICAucGFuZSB7XG4gICAgICBwYWRkaW5nOiAxZW07XG4gICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbFRhYkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJzU2VydmljZTogVmVydGljYWxUYWJzU2VydmljZSkge1xuICB9XG5cbiAgQElucHV0KCkgdGFiVGl0bGU6IHN0cmluZztcbiAgQElucHV0KCkgYWN0aXZlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRlbXBsYXRlO1xuICBASW5wdXQoKSBkYXRhQ29udGV4dDtcbiAgQElucHV0KCkgaXNDbG9zZWFibGUgPSBmYWxzZTtcbn1cbiIsImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U2VsZWN0aW9uTGlzdCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSB9IGZyb20gJy4vZHluYW1pYy10YWItYW5jaG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbFRhYkNvbXBvbmVudCB9IGZyb20gJy4vdmVydGljYWwtdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWZXJ0aWNhbFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi92ZXJ0aWNhbC10YWJzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy12ZXJ0aWNhbC10YWJzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIxcHhcIiBmeExheW91dC54cz1cImNvbHVtblwiPlxuICA8ZGl2IGZ4RmxleD1cIjMzJVwiPlxuICAgIDxtYXQtc2VsZWN0aW9uLWxpc3QgI2xpc3QgWyhuZ01vZGVsKV09XCJ0YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJvbk5nTW9kZWxDaGFuZ2UoKVwiPlxuICAgICAgPG1hdC1saXN0LW9wdGlvbiAqbmdGb3I9XCJsZXQgdGFiIG9mIFtdLmNvbmNhdCh0YWJzLnRvQXJyYXkoKSwgZHluYW1pY1RhYnMpXCIgW3ZhbHVlXT1cInRhYi50YWJUaXRsZVwiPlxuICAgICAgICB7e3RhYi50YWJUaXRsZX19XG4gICAgICA8L21hdC1saXN0LW9wdGlvbj5cbiAgICA8L21hdC1zZWxlY3Rpb24tbGlzdD5cbiAgICA8bWF0LWRpdmlkZXI+PC9tYXQtZGl2aWRlcj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgaWQ9XCJzZWxlY3RcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVNlbGVjdCgpXCIgKm5nSWY9XCJzaG93U2VsZWN0QWxsXCI+XG4gICAgICB7e2FsbFNlbGVjdGVkID8gJ1Jlc2V0IHNlbGVjdGlvbicgOiAnU2VsZWN0IGFsbCd9fVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cblxuICA8ZGl2IGZ4RmxleD1cIjY2JVwiICpuZ0lmPVwidGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxuZy10ZW1wbGF0ZSB2ZXJ0aWNhbER5bmFtaWNUYWJBbmNob3IgI2NvbnRhaW5lcj48L25nLXRlbXBsYXRlPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbFRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihWZXJ0aWNhbFRhYkNvbXBvbmVudCkgdGFiczogUXVlcnlMaXN0PFZlcnRpY2FsVGFiQ29tcG9uZW50PjtcbiAgQFZpZXdDaGlsZChEeW5hbWljVGFiQW5jaG9yRGlyZWN0aXZlKSBkeW5hbWljVGFiUGxhY2Vob2xkZXI6IER5bmFtaWNUYWJBbmNob3JEaXJlY3RpdmU7XG5cbiAgQFZpZXdDaGlsZChNYXRTZWxlY3Rpb25MaXN0KSBsaXN0OiBNYXRTZWxlY3Rpb25MaXN0O1xuXG4gIEBJbnB1dCgpIG11bHRpID0gdHJ1ZTtcbiAgQElucHV0KCkgc2VsZWN0Rmlyc3RUYWIgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93U2VsZWN0QWxsID0gZmFsc2U7XG4gIGFsbFNlbGVjdGVkID0gdHJ1ZTtcblxuICBkeW5hbWljVGFiczogVmVydGljYWxUYWJDb21wb25lbnRbXSA9IFtdO1xuXG4gIGxhc3RTZWxlY3RlZE9wdGlvbnM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyB0YWJTZXJ2aWNlOiBWZXJ0aWNhbFRhYnNTZXJ2aWNlKSB7XG4gICAgdGhpcy50YWJTZXJ2aWNlLm11bHRpID0gdGhpcy5tdWx0aTtcbiAgfVxuXG4gIC8vIGNvbnRlbnRDaGlsZHJlbiBhcmUgc2V0XG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBpZiB0aGVyZSBpcyBubyBhY3RpdmUgdGFiIHNldCwgYWN0aXZhdGUgdGhlIGZpcnN0XG4gICAgaWYgKHRoaXMuc2VsZWN0Rmlyc3RUYWIgJiYgIXRoaXMudGFicy5maWx0ZXIodGFiID0+IHRhYi5hY3RpdmUpLmxlbmd0aClcbiAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMudGFicy5maXJzdCk7XG4gICAgZWxzZSB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZVRhYkFjdGl2YXRpb25zKCkge1xuICAgIGNvbnN0IGFycjogVmVydGljYWxUYWJDb21wb25lbnRbXSA9IHRoaXMudGFicy50b0FycmF5KCkuY29uY2F0KHRoaXMuZHluYW1pY1RhYnMpO1xuICAgIGlmIChhcnIgPT0gbnVsbCB8fCBhcnIubGVuZ3RoIDwgMSkgcmV0dXJuO1xuICAgIGNvbnN0IHMgPSBuZXcgU2V0KHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMpO1xuICAgIGFyci5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gcy5oYXModGFiLnRhYlRpdGxlKSk7XG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMubXVsdGkgfHwgIXRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoIHx8XG4gICAgICAhdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zIHx8ICF0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMubGVuZ3RoKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyA9IHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMuZmlsdGVyKFxuICAgICAgdGFiVGl0bGUgPT4gdGFiVGl0bGUgIT09IHRoaXMubGFzdFNlbGVjdGVkT3B0aW9uc1t0aGlzLmxhc3RTZWxlY3RlZE9wdGlvbnMubGVuZ3RoIC0gMV1cbiAgICApO1xuXG4gICAgdGhpcy5sYXN0U2VsZWN0ZWRPcHRpb25zID0gdGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucztcbiAgfVxuXG4gIG9uTmdNb2RlbENoYW5nZSgvKnNlbGVjdGVkOiBzdHJpbmdbXSovKSB7XG4gICAgY29uc29sZS5pbmZvKCd0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zOicsIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMsICc7Jyk7XG4gICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgdGhpcy50b2dnbGVUYWJBY3RpdmF0aW9ucygpO1xuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIHNlbGVjdFRhYih0YWI6IFZlcnRpY2FsVGFiQ29tcG9uZW50KSB7XG4gICAgdGhpcy5tdWx0aSA/XG4gICAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zLnB1c2godGFiLnRhYlRpdGxlKVxuICAgICAgOiB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zID0gW3RhYi50YWJUaXRsZV07XG4gICAgdGFiLmFjdGl2ZSA9IHRydWU7XG5cbiAgICBpZiAoIXRoaXMubGlzdC5vcHRpb25zKSByZXR1cm47XG5cbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5saXN0Lm9wdGlvbnMubWFwKHQgPT4gdC52YWx1ZSk7XG4gICAgY29uc3QgcyA9IG5ldyBTZXQodGhpcy50YWJTZXJ2aWNlLnNlbGVjdGVkT3B0aW9ucyk7XG4gICAgdGhpcy5saXN0Lm9wdGlvbnMuZm9yRWFjaCh0ID0+IHtcbiAgICAgIHQuc2VsZWN0ZWQgPSBzLmhhcyh0LnZhbHVlKTtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbyhgJyR7dC52YWx1ZX0nIHNlbGVjdGVkOmAsIHQuc2VsZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgb3B0aW9uc19zZXQgPSBuZXcgU2V0KG9wdGlvbnMpO1xuICAgIHRoaXMudGFiU2VydmljZS5zZWxlY3RlZE9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgaWYgKCFvcHRpb25zX3NldC5oYXMob3B0aW9uKSlcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKGAnJHtvcHRpb259JyBub3QgZm91bmQgaW4gbWF0LXNlbGVjdGlvbi1saXN0YCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNoZWNrU2VsZWN0QWxsKCk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrU2VsZWN0QWxsKCkge1xuICAgIGlmICghdGhpcy5saXN0IHx8ICF0aGlzLmxpc3Qub3B0aW9ucykgcmV0dXJuO1xuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSB0aGlzLmxpc3Qub3B0aW9ucy5sZW5ndGggPCAxID8gZmFsc2VcbiAgICAgIDogdGhpcy5saXN0Lm9wdGlvbnMucmVkdWNlKChwLCBjKSA9PiBwID8gYy5zZWxlY3RlZCA6IHAsIHRydWUpO1xuICB9XG5cbiAgb3BlblRhYih0aXRsZTogc3RyaW5nLCB0ZW1wbGF0ZSwgZGF0YSwgaXNDbG9zZWFibGUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgIFZlcnRpY2FsVGFiQ29tcG9uZW50XG4gICAgKTtcblxuICAgIC8vIGNyZWF0ZSBhIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuZHluYW1pY1RhYlBsYWNlaG9sZGVyLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgLy8gc2V0IHRoZSBhY2NvcmRpbmcgcHJvcGVydGllcyBvbiBvdXIgY29tcG9uZW50IGluc3RhbmNlXG4gICAgY29uc3QgaW5zdGFuY2U6IFZlcnRpY2FsVGFiQ29tcG9uZW50ID0gY29tcG9uZW50UmVmLmluc3RhbmNlIGFzIFZlcnRpY2FsVGFiQ29tcG9uZW50O1xuICAgIGluc3RhbmNlLnRhYlRpdGxlID0gdGl0bGU7XG4gICAgaW5zdGFuY2UudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICBpbnN0YW5jZS5kYXRhQ29udGV4dCA9IGRhdGE7XG4gICAgaW5zdGFuY2UuaXNDbG9zZWFibGUgPSBpc0Nsb3NlYWJsZTtcbiAgICBpbnN0YW5jZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy5keW5hbWljVGFicy5wdXNoKGluc3RhbmNlKTtcbiAgICB0aGlzLnNlbGVjdFRhYih0aGlzLmR5bmFtaWNUYWJzW3RoaXMuZHluYW1pY1RhYnMubGVuZ3RoIC0gMV0pO1xuICB9XG5cblxuICBjbG9zZVRhYih0YWI6IFZlcnRpY2FsVGFiQ29tcG9uZW50KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmR5bmFtaWNUYWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5keW5hbWljVGFic1tpXSA9PT0gdGFiKSB7XG4gICAgICAgIHRoaXMuZHluYW1pY1RhYnMuc3BsaWNlKGksIDEpO1xuXG4gICAgICAgIHRoaXMuZHluYW1pY1RhYlBsYWNlaG9sZGVyLnZpZXdDb250YWluZXIucmVtb3ZlKGkpO1xuICAgICAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0ZWRPcHRpb25zID0gW3RhYi50YWJUaXRsZV07ICAvLyBUT0RPOiBkdXBsaWNhdGUgaGFuZGxpbmdcbiAgICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy50YWJzLmZpcnN0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2hlY2tTZWxlY3RBbGwoKTtcbiAgfVxuXG4gIGNsb3NlQWN0aXZlVGFiKCkge1xuICAgIGlmICh0aGlzLm11bHRpKSBjb25zb2xlLndhcm4oJ0Nsb3NpbmcgdGhlIGZpcnN0IGFjdGl2ZSB0YWInKTtcbiAgICBjb25zdCBhY3RpdmVUYWIgPSB0aGlzLmR5bmFtaWNUYWJzLmZpbHRlcih0YWIgPT4gdGFiLmFjdGl2ZSk7XG4gICAgaWYgKGFjdGl2ZVRhYi5sZW5ndGggPiAwKSB0aGlzLmNsb3NlVGFiKGFjdGl2ZVRhYlswXSk7XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG5cbiAgdG9nZ2xlU2VsZWN0KCkge1xuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPyB0aGlzLmxpc3QuZGVzZWxlY3RBbGwoKSA6IHRoaXMubGlzdC5zZWxlY3RBbGwoKTtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID0gIXRoaXMuYWxsU2VsZWN0ZWQ7XG4gICAgdGhpcy5jaGVja1NlbGVjdEFsbCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdERpdmlkZXJNb2R1bGUsIE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5cbmltcG9ydCB7IFZlcnRpY2FsVGFic0NvbXBvbmVudCB9IGZyb20gJy4vdmVydGljYWwtdGFicy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmVydGljYWxUYWJDb21wb25lbnQgfSBmcm9tICcuL3ZlcnRpY2FsLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSB9IGZyb20gJy4vZHluYW1pYy10YWItYW5jaG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBWZXJ0aWNhbFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi92ZXJ0aWNhbC10YWJzLnNlcnZpY2UnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSwgTWF0RGl2aWRlck1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1ZlcnRpY2FsVGFiQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbRHluYW1pY1RhYkFuY2hvckRpcmVjdGl2ZSwgVmVydGljYWxUYWJDb21wb25lbnQsIFZlcnRpY2FsVGFic0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtWZXJ0aWNhbFRhYkNvbXBvbmVudCwgVmVydGljYWxUYWJzQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBWZXJ0aWNhbFRhYnNNb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHsgbmdNb2R1bGU6IFZlcnRpY2FsVGFic01vZHVsZSwgcHJvdmlkZXJzOiBbVmVydGljYWxUYWJzU2VydmljZV0gfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJEaXJlY3RpdmUiLCJWaWV3Q29udGFpbmVyUmVmIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIiLCJDb250ZW50Q2hpbGRyZW4iLCJWaWV3Q2hpbGQiLCJNYXRTZWxlY3Rpb25MaXN0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIkZsZXhMYXlvdXRNb2R1bGUiLCJNYXRMaXN0TW9kdWxlIiwiTWF0RGl2aWRlck1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBU0U7WUFDRSxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztTQUMzQjs7b0JBVEZBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7O2tDQUpEOzs7Ozs7O0FDQUE7UUFNRSxtQ0FBbUIsYUFBK0I7WUFBL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1NBQ2pEOztvQkFMRkMsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSw0QkFBNEI7cUJBQ3ZDOzs7Ozt3QkFKbUJDLG1CQUFnQjs7O3dDQUFwQzs7Ozs7OztBQ0FBO1FBd0JFLDhCQUFtQixXQUFnQztZQUFoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBcUI7MEJBSWpDLEtBQUs7K0JBR0EsS0FBSztTQU4zQjs7b0JBckJGQyxZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjt3QkFDM0IsUUFBUSxFQUFFLDJYQVVYO3dCQUNDLE1BQU0sRUFBRSxDQUFDLCtDQUlSLENBQUM7cUJBQ0g7Ozs7O3dCQXJCUSxtQkFBbUI7Ozs7K0JBMEJ6QkMsUUFBSzs2QkFDTEEsUUFBSzsrQkFDTEEsUUFBSztrQ0FDTEEsUUFBSztrQ0FDTEEsUUFBSzs7bUNBL0JSOzs7Ozs7O0FDQUE7UUErQ0UsK0JBQW9CLHdCQUFrRCxFQUNuRDtZQURDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7WUFDbkQsZUFBVSxHQUFWLFVBQVU7eUJBVlosSUFBSTtrQ0FDSyxJQUFJO2lDQUNMLEtBQUs7K0JBQ2hCLElBQUk7K0JBRW9CLEVBQUU7WUFNdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNwQzs7Ozs7UUFHRCxrREFBa0I7OztZQUFsQjs7Z0JBRUUsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsTUFBTSxHQUFBLENBQUMsQ0FBQyxNQUFNO29CQUNwRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O29CQUM3QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDNUI7Ozs7UUFFTyxvREFBb0I7Ozs7Z0JBQzFCLHFCQUFNLEdBQUcsR0FBMkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNqRixJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUFFLE9BQU87Z0JBQzFDLHFCQUFNLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNuRCxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBQSxDQUFDLENBQUM7Ozs7O1FBRy9DLDBDQUFVOzs7OztnQkFDaEIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsTUFBTTtvQkFDdkQsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTTtvQkFDN0QsT0FBTztnQkFFVCxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQ3RFLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxLQUFLLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFBLENBQ3ZGLENBQUM7Z0JBRUYsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDOzs7OztRQUc3RCwrQ0FBZTs7O1lBQWY7Z0JBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDdkYsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3ZCOzs7OztRQUVELHlDQUFTOzs7O1lBQVQsVUFBVSxHQUF5QjtnQkFDakMsSUFBSSxDQUFDLEtBQUs7b0JBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7c0JBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNyRCxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFFbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztvQkFBRSxPQUFPO2dCQUUvQixxQkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssR0FBQSxDQUFDLENBQUM7Z0JBQ3BELHFCQUFNLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO29CQUN6QixDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDOztpQkFFN0IsQ0FBQyxDQUFDO2dCQUVILHFCQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtvQkFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO3dCQUMxQixNQUFNLFNBQVMsQ0FBQyxNQUFJLE1BQU0sc0NBQW1DLENBQUMsQ0FBQztpQkFDbEUsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2Qjs7OztRQUVPLDhDQUFjOzs7O2dCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztvQkFBRSxPQUFPO2dCQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsS0FBSztzQkFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBQSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7UUFHbkUsdUNBQU87Ozs7Ozs7WUFBUCxVQUFRLEtBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQW1CO2dCQUFuQiw0QkFBQTtvQkFBQSxtQkFBbUI7O2dCQUN4RCxxQkFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQzVFLG9CQUFvQixDQUNyQixDQUFDOztnQkFHRixxQkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7Z0JBR2hHLHFCQUFNLFFBQVEsSUFBeUIsWUFBWSxDQUFDLFFBQWdDLENBQUEsQ0FBQztnQkFDckYsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQzFCLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUM3QixRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDNUIsUUFBUSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7Z0JBQ25DLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUV2QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0Q7Ozs7O1FBR0Qsd0NBQVE7Ozs7WUFBUixVQUFTLEdBQXlCO2dCQUNoQyxLQUFLLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNoRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO3dCQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBRTlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNoQyxNQUFNO3FCQUNQO2lCQUNGO2dCQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2Qjs7OztRQUVELDhDQUFjOzs7WUFBZDtnQkFDRSxJQUFJLElBQUksQ0FBQyxLQUFLO29CQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztnQkFDN0QscUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLE1BQU0sR0FBQSxDQUFDLENBQUM7Z0JBQzdELElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2Qjs7OztRQUVELDRDQUFZOzs7WUFBWjtnQkFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2Qjs7b0JBM0pGRCxZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjt3QkFDNUIsUUFBUSxFQUFFLDgwQkFvQlg7d0JBQ0MsTUFBTSxFQUFFLEVBQUU7cUJBQ1g7Ozs7O3dCQS9CcUNFLDJCQUF3Qjt3QkFLckQsbUJBQW1COzs7OzJCQTRCekJDLGtCQUFlLFNBQUMsb0JBQW9COzRDQUNwQ0MsWUFBUyxTQUFDLHlCQUF5QjsyQkFFbkNBLFlBQVMsU0FBQ0MseUJBQWdCOzRCQUUxQkosUUFBSztxQ0FDTEEsUUFBSztvQ0FDTEEsUUFBSzs7b0NBeENSOzs7Ozs7O0FDQUE7Ozs7OztRQXlCZ0IsMEJBQU87Ozs7Z0JBQ25CLE9BQU8sRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDOzs7b0JBWjdFSyxXQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFOzRCQUNQQyxtQkFBWSxFQUFFQyxpQkFBVzs0QkFDekJDLDJCQUFnQjs0QkFDaEJDLHNCQUFhLEVBQUVDLHlCQUFnQixFQUFFQyx3QkFBZTt5QkFDakQ7d0JBQ0QsZUFBZSxFQUFFLENBQUMsb0JBQW9CLENBQUM7d0JBQ3ZDLFlBQVksRUFBRSxDQUFDLHlCQUF5QixFQUFFLG9CQUFvQixFQUFFLHFCQUFxQixDQUFDO3dCQUN0RixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxxQkFBcUIsQ0FBQztxQkFDdkQ7O2lDQXZCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9