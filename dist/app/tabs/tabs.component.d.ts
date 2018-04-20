import { AfterContentInit, ComponentFactoryResolver, QueryList } from '@angular/core';
import { MatSelectionList } from '@angular/material';
import { TabComponent } from './tab.component';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { TabsService } from './tabs.service';
export declare class TabsComponent implements AfterContentInit {
    private componentFactoryResolver;
    tabService: TabsService;
    tabs: QueryList<TabComponent>;
    dynamicTabPlaceholder: DynamicTabAnchorDirective;
    list: MatSelectionList;
    multi: boolean;
    selectFirstTab: boolean;
    showSelectAll: boolean;
    dynamicTabs: TabComponent[];
    lastSelectedOptions: string[];
    constructor(componentFactoryResolver: ComponentFactoryResolver, tabService: TabsService);
    ngAfterContentInit(): void;
    private toggleTabActivations();
    private setOptions();
    onNgModelChange(): void;
    selectTab(tab: TabComponent): void;
    openTab(title: string, template: any, data: any, isCloseable?: boolean): void;
    closeTab(tab: TabComponent): void;
    closeActiveTab(): void;
}
