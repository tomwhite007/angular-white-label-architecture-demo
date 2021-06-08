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

export type ShowFormCheckboxChangeEvent = OutputBusEvent<boolean>;

export type ShowFormCheckedEvent = InputBusEvent<boolean>;
export type ShowFormUpdateModeEvent = InputBusEvent<boolean>;
export type ShowFormInputEvents =
  | ShowFormCheckedEvent
  | ShowFormUpdateModeEvent;

@Component({
  selector: 'app-show-form-checkbox',
  templateUrl: './show-form-checkbox.component.html',
  styleUrls: ['./show-form-checkbox.component.scss'],
})
export class ShowFormCheckboxComponent {
  @Input() set inBus(event: ShowFormInputEvents) {
    busEventHandler(event, {
      [InputEventNames.ShowFormChecked]: this.setChecked,
      [InputEventNames.ShowFormUpdateMode]: this.setUpdateMode,
    });
  }
  @Output() outBus = new EventEmitter<ShowFormCheckboxChangeEvent>();

  checked: boolean;
  updateMode: boolean;

  handleChange() {
    this.checked = !this.checked;
    outBusEmit<boolean>(
      this.outBus,
      OutputEventNames.ShowFormCheckboxChange,
      this.checked
    );
  }

  private setChecked = (checked: boolean) => {
    this.checked = checked;
  };

  private setUpdateMode = (update: boolean) => {
    this.updateMode = update;
  };
}
