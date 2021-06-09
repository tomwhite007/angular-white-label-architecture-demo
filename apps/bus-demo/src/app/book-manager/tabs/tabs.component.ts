import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  busEventHandler,
  InputBusEvent,
  outBusEmit,
  OutputBusEvent,
} from '@gyrus/ui-io-bus';
import {
  InputEventNames,
  OutputEventNames,
} from '../../_shared/interfaces/bus-event-names.interface';

export type TabsSelectTabOutputEvent = OutputBusEvent<number>;

export type TabSelectedTabInputEvent = InputBusEvent<number>;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() set inBus(event: TabSelectedTabInputEvent) {
    busEventHandler(event, {
      [InputEventNames.TabSelectedTab]: (selectedTab: number) =>
        (this.selectedTab = selectedTab),
    });
  }
  @Output() outBus = new EventEmitter<TabsSelectTabOutputEvent>();

  selectedTab: number;

  selectTab(tab: number) {
    this.selectedTab = tab;
    outBusEmit<number>(this.outBus, OutputEventNames.TabsSelectTab, tab);
  }
}
