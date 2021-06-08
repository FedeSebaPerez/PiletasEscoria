import { Component, OnInit } from '@angular/core';
import { PoolService } from 'src/app/components/shared/pool.service';
import { PropertyService } from 'src/app/components/shared/property.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataType } from 'src/app/components/shared/datatype';
import { Property } from 'src/app/components/shared/property';



@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
 
  property = new Property(0,0,'',true);
  private datatypes: any [];
  constructor(
    private poolService: PoolService,
    private propertyService: PropertyService,
    private activeModal: NgbActiveModal,  
  ) { }

  ngOnInit() {
    this.getDataTypes();
  }
  
  async objChanged(event: any){
    console.log(this.property.idDataType);
    
  }
  

  public accept() {    
    this.propertyService.addProperty(this.property).subscribe(r => { 
      
      const res = +r;
      if (res === 1) {
        this.activeModal.close();
      }
      else {
        console.log('No se ha guardado');
      }
    });
  }

  getDataTypes() {
    this.propertyService.getDataTypes().subscribe(o => {
      this.datatypes = o;
    })
  }
  
}
