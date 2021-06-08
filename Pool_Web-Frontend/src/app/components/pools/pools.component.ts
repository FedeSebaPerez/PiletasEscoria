import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PoolModalComponent } from '../shared/pool-modal/pool-modal.component';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../global'
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../shared/user/user-service.component';
import { Router, NavigationEnd } from '@angular/router';
import { InfoModalComponent } from '../shared/info-modal/info-modal.component';
import { User } from '../../user.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})
export class PoolsComponent implements OnInit, OnDestroy  {

  private pools: any;
  private statuses = [];
  poolForm: FormGroup;
  private userLoged: string;
  private isLogged: boolean;
  private isAuth: boolean;

  private timeSubscription: Subscription;

  private a: string;
  private b: string;
  public usserLogged:User;


  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
      this.timeSubscription = null;
    }
  }

  validate() {
    console.log("debug: PoolsComponent/validate => this.http.post..");
    return this.http.post(this.globals.baseUrl +'/login/authenticate', { });     
  }


  constructor(
    private modalService: NgbModal,
    private modalServiceTwo: NgbModal,
    private httpClient: HttpClient,
    private globals: Globals,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
  }
 
  ngOnInit() {

    this.a = "aaaa";
    this.b = "bbbbb";
    console.log("debug: PoolsComponent/ngOnInit");

    //event.preventDefault(); // Avoid default action for the submit button of the login form
    //console.error("llego aqui");
    // Calls service to login user to the api rest
    //  this.releaseValidate();

    this.validate().subscribe(
      res => {
        let data = res as User;
        // console.log(data);

        let u: User = {identification: data.identification, token: data.token, admin: data.admin, auth:true};
        this.userService.setUserLoggedIn(u);
        console.log("debug: PoolsComponent/ngOnInit/validate/this.validate().subscribe => identification= ",u);

        //window.location.reload();
        //this.router.navigate(['pool']);
        //this.router.navigateByUrl(this.globals.baseUrl +'/pool');
        //window.location.reload();
      },
      error => {
        console.error(error);
      },
    );

    this.userLoged = this.userService.getUserLoggedIn();
    this.isLogged = this.userService.getUserLogged();
    this.isAuth = this.userService.getUserAuth();

    console.log("debug: PoolsComponent/ngOnInit => this.isLogged ", this.isLogged);
    if (!this.isLogged) {
      this.get_current_user();
    }

    this.get_pools();
    
    console.log("debug: PoolsComponent/ngOnInit => this.userLoged ", this.userLoged);
    //console.log(this.userLoged);
    //console.log("usuario:" + this.userLoged);
    //console.log("logeado si o no:" + this.isLogged);
    //console.log("autorizacion:" + this.isAuth);

    this.timeSubscription = interval(60000).subscribe(() => this.refreshPools());
  }


private refreshPools() {
  this.get_pools();
}

get_current_user() {
  this.httpClient.get(this.globals.baseUrl + '/login/authenticate2').subscribe(
    res => {
      let data = res as User;
      let u: User = { identification: data.identification, token: data.token, admin: data.admin, auth: data.auth };
      console.log("debug: PoolsComponent/get_current_user => identificacion= "+ u);

      this.userService.setUserLoggedIn(u);
      window.location.reload();
      //this.router.navigate(['pool']);
    },
    error => {
      // this.noValidate();
      console.error(error);
    },
    //() => this.navigate()
  );
}

  logout() {

    sessionStorage.removeItem('TenarisMimicoPiletaUser');
    sessionStorage.removeItem('TenarisMimicoPiletaLoged');
    sessionStorage.clear();

    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      let value = sessionStorage.getItem(key);
      console.log(key, value);
    }

    window.location.reload();
    //this.router.navigateByUrl(this.globals.baseUrl +'/pool');
    this.router.navigate(['logout']);
  }


  get_status() {
    this.httpClient.get(this.globals.baseUrl + '/Status').subscribe((res: any[]) => {
      //console.log(res);
      this.statuses = res;
      console.log("debug: PoolsComponent/get_status => this.statuses= ", this.statuses);
    });
  }

  get_pools() {
    
    this.httpClient.get(this.globals.baseUrl + '/Pool').subscribe((res: any[]) => {
      //console.log("holaaaxxx", res);
      this.pools = res;
      console.log("debug: PoolsComponent/get_pools => this.pools=", this.pools);
    });
  }



  openModalInfo(title: string, msg: string) {
    const modalRef2 = this.modalServiceTwo.open(InfoModalComponent);
    modalRef2.componentInstance.title = title;
    modalRef2.componentInstance.msg = msg;
    modalRef2.result.then((result) => {
      console.log(result);
      this.ngOnInit();
    }).catch((error) => {
      console.log(error);
      this.ngOnInit();
    });
  }

  openPoolModal(id: number, value: boolean) {
    if (value) {
      const modalRef = this.modalService.open(PoolModalComponent);
      modalRef.componentInstance.id = id;
      modalRef.result.then((result) => {
        console.log(result);
        this.ngOnInit();
      }).catch((error) => {
        console.log(error);
        this.ngOnInit();
      });
    }
  }

  public setStyles(value: any): any {
    let styles = {
      'background-color': value
    };
    return styles;
  }

}
