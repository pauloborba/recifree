import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { AppHeaderComponent } from './header/app-header.component';
import { LoginComponent } from './components/login.component';
import { NoticiasComponent } from './components/noticias.component';
import { FormulariosComponent } from './components/formularios.component';
import { FormulariosDataComponent } from './components/formulariosdata.component';

import { NoticiaService } from './components/noticia.service';
import { FormularioService } from './components/formulario.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    LoginComponent,
    NoticiasComponent,
	FormulariosComponent,
	FormulariosDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'noticias',
        component: NoticiasComponent
      },
	  {
		path: 'formularios',
		component: FormulariosComponent
	  },
	  {
		path: 'formulariosdata',
		component: FormulariosDataComponent
	  },
      {
        path: 'login',
        component: LoginComponent
      }
	])
  ],
  providers: [NoticiaService, FormularioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
