import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { ProgressoService } from './progresso.service'

@Injectable()
export class Bd{
  constructor(
    private progressoService: ProgressoService
  ){}

  public publicar(publicacao: any): void{
    let nameImagem = Date.now();

    firebase.storage().ref()
      .child(`imagem/${nameImagem}`)
      .put(publicacao.imagem)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          this.progressoService.status = 'Em andamento...';
          this.progressoService.estado = snapshot;
          console.log('Snapchot capturado do on()',snapshot);
        },
        (error) => {
          this.progressoService.status = 'Error';
        },
        () => {
          this.progressoService.status = 'Processo concluído.';
        })

    // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
    //   .push({titulo: publicacao.titulo})
  }
}