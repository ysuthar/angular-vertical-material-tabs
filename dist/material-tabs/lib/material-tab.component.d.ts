import { MaterialTabsService } from './material-tabs.service';
export declare class MaterialTabComponent {
    tabsService: MaterialTabsService;
    constructor(tabsService: MaterialTabsService);
    tabTitle: string;
    active: boolean;
    template: any;
    dataContext: any;
    isCloseable: boolean;
}
