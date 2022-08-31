import { Component, EventEmitter, Input, Output } from '@angular/core';
import { outBusEmit, OutputBusEvent } from '@gyrus/ui-output-bus';
import { OutputEventNames } from '@books-manager/shared/util-books-models';

export type ShowFormCheckboxChangeEvent = OutputBusEvent<
  OutputEventNames.ShowFormCheckboxChange,
  boolean
>;

@Component({
  selector: 'books-show-form-checkbox',
  templateUrl: './show-form-checkbox.component.html',
  styleUrls: ['./show-form-checkbox.component.scss'],
})
export class ShowFormCheckboxComponent {
  @Input() set data(data: { checked: boolean; updateMode: boolean }) {
    this.checked = data.checked;
    this.updateMode = data.updateMode;
  }
  @Output() outBus = new EventEmitter<ShowFormCheckboxChangeEvent>();

  checked!: boolean;
  updateMode!: boolean;

  handleChange() {
    this.checked = !this.checked;
    outBusEmit<ShowFormCheckboxChangeEvent>(
      this.outBus,
      OutputEventNames.ShowFormCheckboxChange,
      this.checked
    );
  }
}
