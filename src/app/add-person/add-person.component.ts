import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: [
    './add-person.component.css',
    '../app.component.css'
  ]
})

export class AddPersonComponent {

  @Input() formColumns: [];
  @Output() onAddPerson = new EventEmitter();
  data = [];

  addPerson(addForm: NgForm) {
    this.data = addForm.form.value;
    this.onAddPerson.emit(this.data);
  }


}
