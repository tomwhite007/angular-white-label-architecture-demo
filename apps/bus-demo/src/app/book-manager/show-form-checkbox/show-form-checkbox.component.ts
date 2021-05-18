import { Component, EventEmitter, Input, Output } from '@angular/core';
import { outBusEmit, OutputEvent } from '@gyrus/ui-io-bus';
import { OutputEventNames } from '../../_shared/interfaces/bus-event-names.interface';

export type ShowFormCheckboxChangeEvent = OutputEvent<boolean>;

@Component({
  selector: 'app-show-form-checkbox',
  templateUrl: './show-form-checkbox.component.html',
  styleUrls: ['./show-form-checkbox.component.scss'],
})
export class ShowFormCheckboxComponent {
  @Input() checked: boolean;
  @Input() updateMode: boolean;

  @Output() outBus = new EventEmitter<ShowFormCheckboxChangeEvent>();

  handleChange() {
    this.checked = !this.checked;
    outBusEmit<boolean>(
      this.outBus,
      OutputEventNames.ShowFormCheckboxChange,
      this.checked
    );
  }
}
