import { Component, OnInit , Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../../global'
import { throwError } from 'rxjs';


@Component({
  selector: 'app-edit-pool-status-property',
  templateUrl: './edit-pool-status-property.component.html',
  styleUrls: ['./edit-pool-status-property.component.css']
})
export class EditPoolStatusPropertyComponent implements OnInit {
  @Input() title: string;
  @Input() msg : string;
  @Input() idProperty : string;
  @Input() idPool : string;
  @Input() idStatus : string;
  @Input() action: string;
  @Input() psValue: string;
  data : FormData[] =[];
  timedc: boolean = true;
  mod: boolean = false;

  selectedItemS: any = 0;

  private properties: any;

  private cronCount: any = 0;

  private hasCron: boolean = true;

  private hasError: boolean = true;

  private horas : string;
  private success: boolean = false; 

  constructor(public infoModal: NgbActiveModal,
    private httpClient: HttpClient,
    private globals: Globals


    ) { }

  ngOnInit() {
    this.hasError = true;
	if(this.action == "New"){
		this.getProperties();
		this.getValidateCron();
	}
	if(this.action == "Edit"){
		this.mod = true;
		console.log(this.psValue);
		this.horas = this.psValue;
		this.hasError =false;
	}


  }

  async objChanged(event: any){
  

  }

  save()
  {
    var retorno = true;
    this.msg = "";
      
    if(this.action == "New")
    { if(this.timedc)
      {
        if(this.horas === undefined || this.horas == null)
        {
          this.msg = this.msg+"No puede agregar un valor nulo";
          retorno = false;
          this.success = true;
        }
        if(retorno)
        {

          var ho = this.horas.replace(/:/g, '_')

          this.httpClient.get(this.globals.baseUrl + '/Property/AddPropertiesPoolStatusForm/'+this.idPool+'/'+this.idStatus+'/1/'+ho).subscribe((res : any[])=>{

            var response = res;
            
            if(response.toString() == "Ok")
            {
              alert("Se ha agregado el registro correctamente");
            }
            else{
              alert(response.toString());
            }

            });


         

        }
      }
      else{
        //significa que no es cronometro por lo que hay que obtener lo de la lista
        if(this.selectedItemS == 0)
        {
          this.msg = this.msg+"Debe seleccionar al menos un elemento";
          retorno = false;
          this.success = true;
        }
        if(retorno)
        {

          //AddPoolStatusProperty
       //api/Property/AddPropertiesPoolStatusForm/{idPool}/{idStatus}/{idProperty}/{Hour}"
          this.httpClient.get(this.globals.baseUrl + '/Property/AddPoolStatusProperty/'+this.idPool+'/'+this.idStatus+'/'+this.selectedItemS).subscribe((res : any[])=>{

            var response = res;
            if(response.toString() == "Ok")
            {
              alert("Se ha agregado la propiedad");
            }
            else{
              alert(response);
            }

            });
          

        }
        
      }
      if(retorno)
      {
        this.closePoolModal();
      }

    }
    if(this.action == "Edit")
    {

    
        if(this.horas === undefined || this.horas == null || this.horas == "00:00")
        {
          this.msg = this.msg+"No puede agregar un valor nulo o con valor 00:00";
          retorno = false;
          this.success = true;
        }
        if(retorno)
        {
			
			var ho = this.horas.replace(/:/g, '_')

            this.httpClient.get(this.globals.baseUrl + '/Property/UpdatePropertiesPoolStatusForm/'+this.idPool+'/'+this.idStatus+'/'+this.idProperty+'/'+ho).subscribe((res : any[])=>{

            var response = res;
            
            if(response.toString() == "Ok")
            {
              alert("Se ha actualizado el registro correctamente");
            }
            else{
              alert(response.toString());
            }

            });
			
			if(retorno)
			  {
				this.closePoolModal();
			  }
          

        }
      



    }
    
    


  }

  getProperties()
  {
    if(this.idPool != undefined || this.idStatus != undefined){
    this.httpClient.get(this.globals.baseUrl + '/Property/GetPropertiesPoolStatusForm/'+this.idPool+'/'+this.idStatus).subscribe((res : any[])=>{

      this.properties = res;
      });
    }

  }

  getValidateCron()
  {
    if(this.idPool != undefined || this.idStatus != undefined){
      this.httpClient.get(this.globals.baseUrl + '/Property/ValidatePropertiesPoolStatusForm/'+this.idPool+'/'+this.idStatus).subscribe((res : any[])=>{

      
        this.cronCount = res;
        if(this.cronCount != 0)
        {
          this.hasCron = false;
          this.hasError = false;
        }
        else{
          this.hasCron = true;
          this.timedc = false;
          this.hasError = false;
        }
  
        });
    }
    else
    {
      this.hasError = true;
    }
    

  }



  closePoolModal() {
    this.infoModal.close('Ventana Cerrada'+this.title);
  }

}
