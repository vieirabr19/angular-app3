import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Autenticacao } from '../../auth/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibePainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  });

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit(): void {
  }

  public exibePainelCadastro(): void{
    this.exibePainel.emit('cadastro');
  }

  public autenticar(): void{
    this.autenticacao.autenticar(this.formulario.value.email, this.formulario.value.senha);
  }

}
