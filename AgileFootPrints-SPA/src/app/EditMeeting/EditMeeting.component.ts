import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editmeeting',
  templateUrl: './EditMeeting.component.html',
  styleUrls: ['./EditMeeting.component.css']
})
export class EditMeetingComponent implements OnInit {
  isModelStateValid = true;
  meeting: any;
  minDate = new Date();
  maxDate = new Date(2099, 0, 1);
  constructor(
    public dialogRef: MatDialogRef<EditMeetingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.meeting = this.data;
    console.log('To edit', this.meeting);
  }

  update() {
    /*  this.meeting.projectId = this.projectId;
      this.meeting.userId = this.authService.decodedToken.nameid; */
    this.dialogRef.close(this.meeting);
    console.log(this.meeting);
  }
  cancel() {
    this.dialogRef.close(null);
  }
}
