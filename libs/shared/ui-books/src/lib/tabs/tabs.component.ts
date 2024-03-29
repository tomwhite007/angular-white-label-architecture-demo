import { Component, EventEmitter, Input, Output } from '@angular/core';
import { outBusEmit, OutputBusEvent } from '@gyrus/ui-output-bus';
import { OutputEventNames } from '@books-manager/shared/util-books-models';

export type TabsSelectTabEvent = OutputBusEvent<
  OutputEventNames.TabsSelectTab,
  number
>;

@Component({
  selector: 'books-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() set data(data: { tabText: string[]; selectedTab: number }) {
    this.tabText = data.tabText;
    this.selectedTab = data.selectedTab;
  }
  @Output() outBus = new EventEmitter<TabsSelectTabEvent>();

  selectedTab!: number;
  tabText: string[] = [];

  selectTab(tab: number) {
    this.selectedTab = tab;
    outBusEmit(this.outBus, OutputEventNames.TabsSelectTab, tab);
  }
}
