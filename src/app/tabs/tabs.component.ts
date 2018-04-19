import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  Input,
  QueryList,
  ViewChild
} from '@angular/core';
import { MatSelectionList } from '@angular/material';

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

  @ViewChild(MatSelectionList) list: MatSelectionList;

  @Input() multi = true;
  @Input() selectFirstTab = true;

  dynamicTabs: TabComponent[] = [];

  selectedOptions: string[] = [];
  lastSelectedOptions: string[];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
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
    const s = new Set(this.selectedOptions);
    arr.forEach(tab => tab.active = s.has(tab.tabTitle));
  }

  private setOptions() {
    if (this.multi || !this.selectedOptions.length ||
      !this.lastSelectedOptions || !this.lastSelectedOptions.length)
      return;

    this.selectedOptions = this.selectedOptions.filter(
      tabTitle => tabTitle !== this.lastSelectedOptions[this.lastSelectedOptions.length - 1]
    );

    this.lastSelectedOptions = this.selectedOptions;
  }

  onNgModelChange(/*selected: string[]*/) {
    this.setOptions();
    this.toggleTabActivations();
  }

  selectTab(tab: TabComponent) {
    this.multi ?
      this.selectedOptions.push(tab.tabTitle)
      : this.selectedOptions = [tab.tabTitle];
    tab.active = true;

    if (!this.list.options) return;

    const options = this.list.options.map(t => t.value);
    const s = new Set(this.selectedOptions);
    this.list.options.forEach(t => {
      t.selected = s.has(t.value);
      // console.info(`'${t.value}' selected:`, t.selected);
    });

    const options_set = new Set(options);
    this.selectedOptions.forEach(option => {
      if (!options_set.has(option))
        throw TypeError(`'${option}' not found in mat-selection-list`);
    });

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
        this.selectedOptions = [tab.tabTitle];  // TODO: duplicate handling
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
}
