import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as firebase from 'firebase';
import { Bd } from '../../bd.service';
import { ProgressoService } from '../../progresso.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string;
  public imagem: any;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: Bd,
    private progressoService: ProgressoService
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user: any) => {
      this.email = user.email;
    })
  }

  public publicar(): void{
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem
    });

    let acompanhamentoUpload = interval(1500);
    let continua = new Subject<boolean>();
    continua.next(true);

    acompanhamentoUpload.pipe(
      takeUntil(continua)      
    )
    .subscribe(() => {
      console.log(this.progressoService.status);
      console.log(this.progressoService.estado);

      if (this.progressoService.status === 'Processo concluído.') {
        continua.next (false);
      }
    })    
  }

  public preparaImagemUpload(event: Event): void{
    this.imagem = (<HTMLInputElement>event.target).files[0];
  }

}
