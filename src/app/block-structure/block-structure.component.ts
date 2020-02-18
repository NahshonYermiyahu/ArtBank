import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-block-structure',
  templateUrl: './block-structure.component.html',
  styleUrls: [
    './block-structure.component.css',
    '../app.component.css'
  ]
})
export class BlockStructureComponent implements OnInit {

  @Input() personRes = [];
  @Output() onSetIsBlock = new EventEmitter();
  persons = [[]];

  constructor() { }

  ngOnInit() {
    for(let i = 0; i < this.personRes.length; i ++) {
      this.persons[i] = [];

      for (let key in this.personRes[i]) {
        let rows = [];
        rows[0] =  key;
        rows[1] = this.personRes[i][key];
        this.persons[i].push(rows)
      }
    }
  }

  setIsBlock(data) {
    this.onSetIsBlock.emit(data);
  }
}
