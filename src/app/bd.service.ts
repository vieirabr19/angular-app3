import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { ProgressoService } from './progresso.service'

@Injectable()
export class Bd {
  constructor(
    private progressoService: ProgressoService
  ) { }

  public publicar(publicacao: any): void {
    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((resposta) => {
        // Nome da imagem a ser cadastrada no storage do firebase
        let nameImagem = resposta.key;

        firebase.storage().ref()
          .child(`imagem/${nameImagem}`)
          .put(publicacao.imagem)
          .on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            this.progressoService.status = 'Em andamento...';
            this.progressoService.estado = snapshot;
            //console.log('Snapchot capturado do on()',snapshot);
          },
            (error) => {
              this.progressoService.status = 'Error';
            },
            () => {
              this.progressoService.status = 'concluido.';
            })
      })
  }

  public consultaPublicacoes(emailUsuario: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          let publicacoes: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {
            let publicacao = childSnapshot.val();
            publicacao.key = childSnapshot.key;

            publicacoes.push(publicacao);
          })

          return publicacoes.reverse();
        })
        .then((publicacoes: any) => {
          publicacoes.forEach((publicacao: any) => {
            // consulta a url da imagem (storage)
            firebase.storage().ref()
              .child(`imagem/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url_imagem = url;

                // consulta o nome do usuário
                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .once('value')
                  .then((snapshot: any) => {
                    publicacao.nome_usuario = snapshot.val().nome_usuario;
                  })
                })
              });

            resolve(publicacoes);
        })
    })
  }
}