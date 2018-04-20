import { AfterContentInit, Component, ComponentFactoryResolver, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material';

import { TabComponent } from './tab.component';
import { DynamicTabAnchorDirective } from './dynamic-tab-anchor.directive';
import { TabsService } from './tabs.service';

@Component({
  selector: 'vertical-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @ViewChild(DynamicTabAnchorDirective)
  dynamicTabPlaceholder: DynamicTabAnchorDirective;

  @ViewChild(MatSelectionList) list: MatSelectionList;

  @Input() multi = true;
  @Input() selectFirstTab = true;
  @Input() showSelectAll = false;
  allSelected = true;

  dynamicTabs: TabComponent[] = [];

  lastSelectedOptions: string[];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              public tabService: TabsService) {
    this.tabService.multi = this.multi;
  }

  // contentChildren are set
  ngAfterContentInit() {
    // if there is no active tab set, activate the first
    if (this.selectFirstTab && !this.tabs.filter(tab => tab.active).length)
      this.selectTab(this.tabs.first);
  }

  private toggleTabActivations() {
    const arr: TabComponent[] = this.tabs.toArray().concat(this.dynamicTabs);
    if (arr == null || arr.length < 1) return;
    const s = new Set(this.tabService.selectedOptions);
    arr.forEach(tab => tab.active = s.has(tab.tabTitle));
  }

  private setOptions() {
    if (this.multi || !this.tabService.selectedOptions.length ||
      !this.lastSelectedOptions || !this.lastSelectedOptions.length)
      return;

    this.tabService.selectedOptions = this.tabService.selectedOptions.filter(
      tabTitle => tabTitle !== this.lastSelectedOptions[this.lastSelectedOptions.length - 1]
    );

    this.lastSelectedOptions = this.tabService.selectedOptions;
  }

  onNgModelChange(/*selected: string[]*/) {
    this.setOptions();
    this.toggleTabActivations();
    this.checkSelectAll();
  }

  selectTab(tab: TabComponent) {
    this.multi ?
      this.tabService.selectedOptions.push(tab.tabTitle)
      : this.tabService.selectedOptions = [tab.tabTitle];
    tab.active = true;

    if (!this.list.options) return;

    const options = this.list.options.map(t => t.value);
    const s = new Set(this.tabService.selectedOptions);
    this.list.options.forEach(t => {
      t.selected = s.has(t.value);
      // console.info(`'${t.value}' selected:`, t.selected);
    });

    const options_set = new Set(options);
    this.tabService.selectedOptions.forEach(option => {
      if (!options_set.has(option))
        throw TypeError(`'${option}' not found in mat-selection-list`);
    });

    this.checkSelectAll();
  }

  private checkSelectAll() {
    this.allSelected = this.list.options.reduce((p, c) => p ? c.selected : p, true);
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
    instance.active = true;

    this.dynamicTabs.push(instance);
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }


  closeTab(tab: TabComponent) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        this.dynamicTabs.splice(i, 1);

        this.dynamicTabPlaceholder.viewContainer.remove(i);
        this.tabService.selectedOptions = [tab.tabTitle];  // TODO: duplicate handling
        this.selectTab(this.tabs.first);
        break;
      }
    }
  }

  closeActiveTab() {
    if (this.multi) console.warn('Closing the first active tab');
    const activeTab = this.dynamicTabs.filter(tab => tab.active);
    if (activeTab.length > 0) this.closeTab(activeTab[0]);
  }

  toggleSelect() {
    this.allSelected ? this.list.deselectAll() : this.list.selectAll();
    this.allSelected = !this.allSelected;
  }
}
