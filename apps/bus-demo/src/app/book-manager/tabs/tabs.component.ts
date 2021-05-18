import { Component, EventEmitter, Input, Output } from '@angular/core';
import { outBusEmit, OutputEvent } from '@gyrus/ui-io-bus';
import { OutputEventNames } from '../../_shared/interfaces/bus-event-names.interface';

export type TabsSelectTabEvent = OutputEvent<number>;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() selectedTab: number;

  @Output() outBus = new EventEmitter<TabsSelectTabEvent>();

  selectTab(tab: number) {
    this.selectedTab = tab;
    outBusEmit<number>(this.outBus, OutputEventNames.TabsSelectTab, tab);
  }
}
