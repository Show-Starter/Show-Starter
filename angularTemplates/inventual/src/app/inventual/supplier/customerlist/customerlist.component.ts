import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

//for checkbox
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
//for checkbox

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerlistComponent implements OnInit {
//checkbox start
task: Task = {
  name: '',
  completed: false,
  color: 'primary',
};
isComplete : boolean = false;
allComplete: boolean = false;
oneComplete: boolean = false;
twoComplete: boolean = false;
threeComplete: boolean = false;
fourComplete: boolean = false;
fiveComplete: boolean = false;
sixComplete: boolean = false;
sevenComplete: boolean = false;
eightComplete: boolean = false;
nineComplete: boolean = false;
tenComplete: boolean = false;
elevenComplete: boolean = false;
twelveComplete: boolean = false;
thirteenComplete: boolean = false;
fourteenComplete: boolean = false;
fifteenComplete: boolean = false;
sixteenComplete: boolean = false;
disabled_condition = true;

updateAllComplete() {
  this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
}
someComplete(): boolean {
  if (this.task.subtasks == null) {
    return false;
  }
  return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
}

setAll(completed: boolean) {
  this.isComplete = completed;
  this.allComplete = completed;
  if (this.task.subtasks == null) {
    return;
  }
  this.task.subtasks.forEach(t => t.completed = completed);
}

setSingleCheck1(completed: boolean) {
  console.log(this.oneComplete);
  console.log(completed);
  this.oneComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }
  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck2(completed: boolean) {
  this.twoComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }
  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck3(completed: boolean) {
  this.threeComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }
  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck4(completed: boolean) {
  this.fourComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }

  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck5(completed: boolean) {
  this.fourComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }

  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck6(completed: boolean) {
  this.fourComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }

  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}

setSingleCheck7(completed: boolean) {
  this.fourComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }

  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck8(completed: boolean) {
  this.fourComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }

  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck9(completed: boolean) {
  this.fourComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }

  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck10(completed: boolean) {
  this.fourComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }

  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck11(completed: boolean) {
  this.fourComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }

  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck12(completed: boolean) {
  this.fourComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }

  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck13(completed: boolean) {
  this.fourComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }

  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck14(completed: boolean) {
  this.fourComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }

  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck15(completed: boolean) {
  this.fourComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }

  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
setSingleCheck16(completed: boolean) {
  this.fourComplete = completed;
  if(completed) {
    this.isComplete = completed;
  }

  if( !this.sixteenComplete && !this.fifteenComplete && !this.fourteenComplete && !this.thirteenComplete && !this.twelveComplete && !this.elevenComplete && !this.tenComplete && !this.nineComplete && !this.eightComplete && !this.sevenComplete && !this.sixComplete && !this.fiveComplete && !this.fourComplete && !this.threeComplete && !this.twoComplete && !this.oneComplete ) {
    this.isComplete = completed;
  }
}
//checkbox end

//sidebar menu activation start
menuSidebarActive:boolean=false;
myfunction(){
  if(this.menuSidebarActive==false){
    this.menuSidebarActive=true;
  }
  else {
    this.menuSidebarActive=false;
  }
}
//sidebar menu activation end

constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

}
