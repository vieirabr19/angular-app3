import { Component, OnInit, ViewChild } from '@angular/core';

import { Autenticacao } from '../auth/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes') public publicacoes: any;

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit(): void {
  }

  public sair(): void{
    this.autenticacao.sair();
  }

  public atualizaTimeLine(): void{
    this.publicacoes.atualizaTimeLine();
  }

}
