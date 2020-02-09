import {Component, OnInit} from '@angular/core';
import {Person, PersonsService} from './persons.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  personsRows = [];
  personsMetaData = [];
  personsRes = [];
  displayedColumns: string[] = ['N'];
  formColumns = [];
  isAddData: boolean = true;


  constructor(private personsService: PersonsService){};

  ngOnInit() {
    this.personsService.getPersons().subscribe(res => {
      this.personsRows = res['rows'];
      this.personsMetaData = res['metaData'];
      for(let j=0; j< this.personsRows.length; j++){
        let rows = {'N':j+1};
        for(let i = 0; i < this.personsMetaData.length; i ++) {
          rows[this.personsMetaData[i].name] = this.personsRows[j][i];
        }
        this.personsRes.push(rows)
      }
      console.log(this.personsRes);
      for (let i=0; i< this.personsMetaData.length; i ++) {
        this.displayedColumns.push(this.personsMetaData[i].name);
        this.formColumns.push(this.personsMetaData[i].name);
      }
      this.displayedColumns.push('DELETE');
    }, error => alert(error)
     );
  }

  remove(id) {
    this.personsRes = this.personsRes
      .filter(res => res['IDCARD'] !== id);
    // this.personsService.deletePerson(id)
    //   .subscribe(() => this.ngOnInit(),
    //     error => alert(error))
  }

  setIsAddData() {
    this.isAddData = false;
  }

  onSubmit(addForm: NgForm) {
    console.log(addForm.form.value);
    const data = addForm.form.value;
    this.personsService.addPerson(data).subscribe(res => {
      console.log(res)
    }, error => alert(error) )

  }
}
