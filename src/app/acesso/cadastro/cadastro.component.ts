import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Usuario } from '../../shared/usuario.model';
import { Autenticacao } from '../../auth/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibePainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  });

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit(): void {
  }

  public exibePainelLogin(): void {
    this.exibePainel.emit('login');
  }

  public cadastrarUsuario(): void {
    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    );

    this.autenticacao.cadastrarUsuario(usuario)
      .then((res: any) => {
        this.exibePainelLogin();
      })
  }

}
