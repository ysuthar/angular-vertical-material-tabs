import { TabsService } from './tabs.service';
export declare class TabComponent {
    tabsService: TabsService;
    constructor(tabsService: TabsService);
    tabTitle: string;
    active: boolean;
    template: any;
    dataContext: any;
    isCloseable: boolean;
}
