import { Component, EventEmitter, Input, Output } from '@angular/core';
import { outBusEmit, OutputBusEvent } from '@gyrus/ui-output-bus';
import { OutputEventNames } from '../../_shared/interfaces/output-bus-event-names.interface';

export type TabsSelectTabEvent = OutputBusEvent<
  OutputEventNames.TabsSelectTab,
  number
>;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() set data(data: { selectedTab: number }) {
    this.selectedTab = data.selectedTab;
  }
  @Output() outBus = new EventEmitter<TabsSelectTabEvent>();

  selectedTab!: number;

  selectTab(tab: number) {
    this.selectedTab = tab;
    outBusEmit<TabsSelectTabEvent>(
      this.outBus,
      OutputEventNames.TabsSelectTab,
      tab
    );
  }
}
