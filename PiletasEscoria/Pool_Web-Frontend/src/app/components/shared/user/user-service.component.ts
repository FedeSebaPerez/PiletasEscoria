import { Injectable } from '@angular/core';
import { User } from '../../../user.model';

@Injectable()
export class UserService {

  private isUserLoggedIn: boolean;
  
  public usserLogged:User;

  constructor() { 
    this.isUserLoggedIn = false;
  //  sessionStorage.setItem('firsttime',"0");
  }

  getUserLogged()
  {
   // console.log(JSON.parse(sessionStorage.getItem('TenarisMimicoPiletaLoged')));
    return JSON.parse(sessionStorage.getItem('TenarisMimicoPiletaLoged'));
   
  }

  setUserLoggedIn(user:User) {

    var first= sessionStorage.getItem('firsttime');
    if(first!="1"){

      sessionStorage.setItem('firsttime',"1");
      this.isUserLoggedIn = true;
      this.usserLogged = user;

      sessionStorage.setItem('TenarisMimicoPiletaLoged',JSON.stringify(true));
      sessionStorage.setItem('TenarisMimicoPiletaUser', JSON.stringify(user));

      window.location.reload();
    }
  //  console.log(user)
  }

  setUserLogOff(){
    this.isUserLoggedIn = false;
    this.usserLogged = null;
    sessionStorage.setItem('TenarisMimicoPiletaLoged',JSON.stringify(false));
    sessionStorage.setItem('TenarisMimicoPiletaUser', JSON.stringify(null));

    sessionStorage.removeItem('TenarisMimicoPiletaUser');
    sessionStorage.removeItem('TenarisMimicoPiletaLoged');
  }

  getUserLoggedIn() {
  	return JSON.parse(sessionStorage.getItem('TenarisMimicoPiletaUser'));
  }

  getUserAdmin(){
    let admin: User = JSON.parse(sessionStorage.getItem('TenarisMimicoPiletaUser')) as User;
    if(admin != null){
      return admin.admin;
    }
    return false;
  }

  getUserAuth(){
    let admin: User = JSON.parse(sessionStorage.getItem('TenarisMimicoPiletaUser')) as User;
    if(admin != null){
      return admin.auth;
    }
    return false;
  }

}