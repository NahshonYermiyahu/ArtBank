import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: [
    './edit-person.component.css',
    '../app.component.css'
  ]
})
export class EditPersonComponent {

  @Input() formColumns: [];
  @Input() personEdit: [];
  @Output() onEditPerson = new EventEmitter();
  data = [];


  editPerson(editForm: NgForm) {
    this.data = editForm.form.value;
    this.onEditPerson.emit(this.data);
  }


}
