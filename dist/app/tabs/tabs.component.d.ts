import { AfterContentInit, ComponentFactoryResolver, QueryList } from '@angular/core';
import { MatSelectionList } from '@angular/material';
import { TabComponent } from './tab.component';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
export declare class TabsComponent implements AfterContentInit {
    private componentFactoryResolver;
    tabs: QueryList<TabComponent>;
    dynamicTabPlaceholder: DynamicTabAnchorDirective;
    list: MatSelectionList;
    multi: boolean;
    dynamicTabs: TabComponent[];
    selectedOptions: string[];
    lastSelectedOptions: string[];
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    ngAfterContentInit(): void;
    private toggleTabActivations();
    private setOptions();
    onNgModelChange(): void;
    selectTab(tab: TabComponent): void;
    openTab(title: string, template: any, data: any, isCloseable?: boolean): void;
    closeTab(tab: TabComponent): void;
    closeActiveTab(): void;
}
