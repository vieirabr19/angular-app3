import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../shared/usuario.model';
import * as firebase from 'firebase';

@Injectable()
export class Autenticacao{
  // Token ID
  public token_id: string;

  constructor(
    private router: Router
  ){}

  // metodo cadastrar usuário
  public cadastrarUsuario(usuario: Usuario): Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {
        // remove a senha do atributo do objeto usuario
        delete usuario.senha;
        // registrando dados complementares do usuário no path email na base64
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario)
      })
      .catch((error: Error) => {
        console.log(error);
      })
  }

  // metodo autenticar usuario
  public autenticar(email: string, senha: string): void{
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((resposta: any) => {
        firebase.auth().currentUser.getIdToken()
          .then((tokenId) => {
            this.token_id = tokenId;
            localStorage.setItem('tokenId', this.token_id);
            this.router.navigate(['/home']);
          })
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }

  public autenticado(): boolean{
    if(this.token_id === undefined && localStorage.getItem('tokenId') != null){
      this.token_id = localStorage.getItem('tokenId');
    }
    if(this.token_id === undefined){
      this.router.navigate(['/']);
    }
    return this.token_id !== undefined;
  }

  public sair(): void{
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('tokenId');
      this.token_id = undefined;
      this.router.navigate(['/'])
    })
  }
}
