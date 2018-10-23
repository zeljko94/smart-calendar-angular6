import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-skill-select',
  templateUrl: './skill-select.component.html',
  styles: []
})
export class SkillSelectComponent implements OnInit {

  @Output() changeEmitter: EventEmitter<any[]> = new EventEmitter();

  s: any = "-1";
  selected: any[] = [];
  options: any[] = [];
  all: any[] = [];
  

  constructor(private rs: HttpService) { }

  ngOnInit() {
    this.rs.get("Skill/Get", {})
      .subscribe(data => {
        if(data.StatusCode == 2){
          this.options = data.Data;
          this.all = data.Data;
        }
      });
  }

  setSelected(skills){
    setTimeout(() => {
      if(skills == "" || skills == null)
        return;
      skills = skills.split(",");
      this.options = JSON.parse(JSON.stringify(this.all));
      this.selected = [];
      for(var i=0; i<skills.length; i++){
        var skill = this.all.find(s => s.ID.toString() == skills[i]);
        this.selected.push(JSON.parse(JSON.stringify(skill)));
        this.options = this.options.filter(op => op.ID != skill.ID);
      }
    }, 150);
  }

  remove(skill){
    this.options.push(JSON.parse(JSON.stringify(skill)));
    this.selected = this.selected.filter(sel => sel.ID != skill.ID);
    this.s = "-1";
    this.changeEmitter.emit(this.getSelected());
  }

  change(){
    if(this.s != "-1"){
      this.selected.push(JSON.parse(JSON.stringify(this.s)));
      this.options = this.options.filter(op => op.ID != this.s.ID);
      this.s = "-1";
      this.changeEmitter.emit(this.getSelected());
    }
  }

  getSelected(){
    return this.selected.map(s => s.ID);
  }

  getSelectedSkills(){
    return this.selected;
  }
}
