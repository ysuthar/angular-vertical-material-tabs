import { AfterContentInit, ComponentFactoryResolver, QueryList } from '@angular/core';
import { MatSelectionList } from '@angular/material';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { VerticalTabComponent } from './vertical-tab.component';
import { VerticalTabsService } from './vertical-tabs.service';
export declare class VerticalTabsComponent implements AfterContentInit {
    private componentFactoryResolver;
    tabService: VerticalTabsService;
    tabs: QueryList<VerticalTabComponent>;
    dynamicTabPlaceholder: DynamicTabAnchorDirective;
    list: MatSelectionList;
    multi: boolean;
    selectFirstTab: boolean;
    showSelectAll: boolean;
    allSelected: boolean;
    dynamicTabs: VerticalTabComponent[];
    lastSelectedOptions: string[];
    constructor(componentFactoryResolver: ComponentFactoryResolver, tabService: VerticalTabsService);
    ngAfterContentInit(): void;
    private toggleTabActivations();
    private setOptions();
    onNgModelChange(): void;
    selectTab(tab: VerticalTabComponent): void;
    private checkSelectAll();
    openTab(title: string, template: any, data: any, isCloseable?: boolean): void;
    closeTab(tab: VerticalTabComponent): void;
    closeActiveTab(): void;
    toggleSelect(): void;
}
