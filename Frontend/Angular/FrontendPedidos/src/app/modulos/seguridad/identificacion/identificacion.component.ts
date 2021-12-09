import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as cryptoJS from 'crypto-js' ;
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  estaIdentificado:boolean=false;

  fgValidador : FormGroup = this.fb.group ({
    'usuario':['',[Validators.required, Validators.email]],
    'clave':['',[Validators.required]],
    'recaptcha':['',[Validators.required]],
  })

  siteKey:string="";
  constructor(private fb: FormBuilder,
    private servicioSeguridad:SeguridadService,
    private router : Router
    ) {
      this.siteKey="6LdggY8dAAAAACpz8JOPrdEHxcsbg9qEV5jVLtTD";
     }

  ngOnInit(): void {
  }


  IdentificarUsuario() {
    let usuario = this.fgValidador.controls['usuario'].value;
    let clave = this.fgValidador.controls['clave'].value;
    let ClaveCifrada = cryptoJS.MD5(clave). toString();

    this.servicioSeguridad.Identificar(usuario,ClaveCifrada).subscribe((datos:any)=> {
      //ok
      this.servicioSeguridad.AlmacenarSesion(datos);
      this.router.navigate(["/inicio"]);
    },(error:any)=>{
      //ko
      alert("Datos Invalidos")
    } )
  }
}
