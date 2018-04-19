import { AfterContentInit, ComponentFactoryResolver, QueryList } from '@angular/core';
import { TabComponent } from './tab.component';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
export declare class TabsComponent implements AfterContentInit {
    private componentFactoryResolver;
    tabs: QueryList<TabComponent>;
    dynamicTabPlaceholder: DynamicTabAnchorDirective;
    multitab: boolean;
    dynamicTabs: TabComponent[];
    selectedOptions: string[];
    lastSelectedOptions: string[];
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    ngAfterContentInit(): void;
    onNgModelChange(event: Event): void;
    openTab(title: string, template: any, data: any, isCloseable?: boolean): void;
    private deactivateTabs();
    selectTab(tab: TabComponent): void;
    closeTab(tab: TabComponent): void;
    closeActiveTab(): void;
}
