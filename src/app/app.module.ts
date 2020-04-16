import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { Autenticacao } from './auth/autenticacao.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { Bd } from './bd.service';

import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';


@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    LoginComponent,
    CadastroComponent,
    BannerComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [Autenticacao, AuthGuardService, Bd],
  bootstrap: [AppComponent]
})
export class AppModule { }
