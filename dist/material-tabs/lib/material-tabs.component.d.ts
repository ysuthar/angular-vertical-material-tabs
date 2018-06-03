import { AfterContentInit, ComponentFactoryResolver, QueryList } from '@angular/core';
import { MatSelectionList } from '@angular/material';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { MaterialTabComponent } from './material-tab.component';
import { MaterialTabsService } from './material-tabs.service';
export declare class MaterialTabsComponent implements AfterContentInit {
    private componentFactoryResolver;
    tabService: MaterialTabsService;
    tabs: QueryList<MaterialTabComponent>;
    dynamicTabPlaceholder: DynamicTabAnchorDirective;
    list: MatSelectionList;
    multi: boolean;
    selectFirstTab: boolean;
    showSelectAll: boolean;
    allSelected: boolean;
    dynamicTabs: MaterialTabComponent[];
    lastSelectedOptions: string[];
    constructor(componentFactoryResolver: ComponentFactoryResolver, tabService: MaterialTabsService);
    ngAfterContentInit(): void;
    private toggleTabActivations();
    private setOptions();
    onNgModelChange(): void;
    selectTab(tab: MaterialTabComponent): void;
    private checkSelectAll();
    openTab(title: string, template: any, data: any, isCloseable?: boolean): void;
    closeTab(tab: MaterialTabComponent): void;
    closeActiveTab(): void;
    toggleSelect(): void;
}
