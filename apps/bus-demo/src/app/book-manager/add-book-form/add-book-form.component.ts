import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { outBusEmit, OutputBusEvent } from '@gyrus/ui-output-bus';
import { BooksEntity } from '../../+state/books.models';
import { OutputEventNames } from '../../_shared/interfaces/output-bus-event-names.interface';

export type AddBookFormSubmitEvent = OutputBusEvent<
  OutputEventNames.AddBookFormSubmit,
  BooksEntity
>;
export interface AddBookFormDataInput {
  showForm: boolean;
  selectedBook: BooksEntity | null;
}

@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookFormComponent {
  @Input() set data(data: AddBookFormDataInput) {
    this.showForm = data.showForm;

    if (data.selectedBook) {
      this.formGroup.setValue(data.selectedBook);
      this.buttonText = 'Update book';
      this.formGroup.controls.id.disable();
    } else {
      this.formGroup.reset();
      this.buttonText = 'Add book';
      this.formGroup.controls.id.enable();
    }
  }
  @Output() outBus: EventEmitter<AddBookFormSubmitEvent> = new EventEmitter();

  showForm: boolean;
  selectedBook: BooksEntity | null;

  formGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
  });

  buttonText = 'Add book';

  submit() {
    outBusEmit<AddBookFormSubmitEvent>(
      this.outBus,
      OutputEventNames.AddBookFormSubmit,
      this.formGroup.getRawValue()
    );
  }
}
