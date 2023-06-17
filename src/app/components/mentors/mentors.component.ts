import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css']
})
export class MentorsComponent implements OnInit{
  constructor(private service: UserService) {
  }
  users: User[] = [];
  getAllMentors(){
    this.service.getUsers().subscribe({
      next: (value:any) => {
        this.users = value._embedded?.users;
        console.log(value);
      }
    })
  }
  ngOnInit(): void {
    this.getAllMentors();
  }

  isMentor(user : User): boolean{
    return user.userRole === "Mentor";
  }
}
