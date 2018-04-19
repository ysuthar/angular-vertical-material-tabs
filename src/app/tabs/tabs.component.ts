import { AfterContentInit, Component, ComponentFactoryResolver, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';

import { TabComponent } from './tab.component';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';

@Component({
  selector: 'vertical-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @ViewChild(DynamicTabAnchorDirective)
  dynamicTabPlaceholder: DynamicTabAnchorDirective;

  @Input() multitab = true;
  // @ViewChild('container', { read: ViewContainerRef })
  // dynamicTabPlaceholder;
  dynamicTabs: TabComponent[] = [];

  selectedOptions: string[];
  lastSelectedOptions: string[];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter(tab => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  onNgModelChange(event: Event) {
    if (!this.multitab) {
      // TODO: Get it so only one tab is selected at a time. Attempt:
      if (this.selectedOptions && this.selectedOptions.length > 1)
        delete this.selectedOptions[this.selectedOptions.indexOf(this.lastSelectedOptions[0])];
      this.lastSelectedOptions = this.selectedOptions;
    }

    this.deactivateTabs();

    const activate = (arr: TabComponent[]) => {
      if (arr == null || arr.length < 1) return;
      const s = new Set(this.selectedOptions);
      for (let i = 0; i < arr.length; i++)
        if (s.has(arr[i].tabTitle)) {
          arr[i].active = true;
          if (!this.multitab) return;
        } else arr[i].active = false;
    };

    activate(this.tabs.toArray());
    activate(this.dynamicTabs);
  }

  openTab(title: string, template, data, isCloseable = false) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      TabComponent
    );

    // create a component instance
    const componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);

    // set the according properties on our component instance
    const instance: TabComponent = componentRef.instance as TabComponent;
    instance.tabTitle = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;

    this.dynamicTabs.push(instance);

    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }

  private deactivateTabs() {
    this.tabs.toArray().forEach(_tab => _tab.active = false);
    this.dynamicTabs.forEach(_tab => _tab.active = false);
  }

  selectTab(tab: TabComponent) {
    this.deactivateTabs();

    // activate the tab the user has clicked on.
    tab.active = true;
  }

  closeTab(tab: TabComponent) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        this.dynamicTabs.splice(i, 1);

        this.dynamicTabPlaceholder.viewContainer.remove(i);

        this.selectTab(this.tabs.first);
        break;
      }
    }
  }

  closeActiveTab() {
    const activeTab = this.dynamicTabs.filter(tab => tab.active);
    if (activeTab.length > 0) {
      this.closeTab(activeTab[0]);
    }
  }
}
