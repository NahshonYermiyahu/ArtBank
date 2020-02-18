import {Component, OnInit} from '@angular/core';
import { PersonsService} from './persons.service';


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
  formColumns: string[] = ['N'];
  personEdit = [];
  idPersonEdit: string;
  isAddData: boolean = true;
  isEditData: boolean = true;
  isBlock: boolean = true;



  constructor(private personsService: PersonsService){};

  ngOnInit() {
    this.personsRes = [];
    this.displayedColumns = ['N'];
    this.formColumns = ['N'];
    this.getPersons();
  }
  
  getPersons() {
    this.personsService.getPersons().subscribe(res => {
      this.personsRows = res['rows'];
      this.personsMetaData = res['metaData'];
      for(let i = 0; i < this.personsRows.length; i++){
        let count = i + 1;
        let rows = {'N':''+count};
        for(let j = 0; j < this.personsMetaData.length; j ++) {
          rows[this.personsMetaData[j].name] =''+ this.personsRows[i][j];
        }
        this.personsRes.push(rows);
      }

      for (let i = 0; i< this.personsMetaData.length; i ++) {
        this.displayedColumns.push(this.personsMetaData[i].name);
        this.formColumns.push(this.personsMetaData[i].name);
      }

      this.displayedColumns.push('EDIT');
      this.displayedColumns.push('DELETE');
      }, error => alert(error)
    );
  }

  remove(id) {
    this.personsRes = this.personsRes
      .filter(res => res['IDCARD'] !==id);
  }

  setIsAddData() {
    this.isAddData = false;
  }

  addPerson(data) {
    this.isAddData = true;
    this.personsRes.push(data);
  }

  editPerson(data) {
    for(let i=0; i< this.personsRes.length; i ++) {
      if(this.personsRes[i]['IDCARD'] === data['IDCARD']) {
        this.personsRes[i] = data;
      }
    }
    this.isEditData = true;
  }

  edit(id: string) {
    this.idPersonEdit = id;
    this.personEdit = this.personsRes
      .filter(res => res['IDCARD'] == id);
    this.isEditData = false;
  }

  setIsBlock(data) {
    this.isBlock = data;
  }
}
