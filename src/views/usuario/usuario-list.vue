<template>
  <div>
      <div class="columns is-12">
          <article class="titulo panel is-primary">
              <p class="panel-heading">
                  Lista de Senhas
              </p>
          </article>
      </div>
      <div class="columns">
          <div class="column is-6">
              <input class="input" type="text" placeholder="Pesquisar">
          </div>
          <div class="column is-2">
              <router-link to="/cadastrousuario"><button is-danger>Pesquisar</button></router-link>
          </div>
          <div class="column is-3">
              <router-link to="/cadastrousuario"><button is-primary>Cadastrar</button></router-link>
          </div>
      </div>

      <table class="table">
          <thead>
              <tr>
                  <th style="text-align: center;">ID</th>
                  <th style="text-align: center;">Senha</th>
                  <th style="text-align: center;">Descrição</th>
                  <th style="text-align: center;">URL</th>
                  <th style="text-align: center;">Opções</th>
              </tr>
          </thead>
          <tbody>
        <tr v-for="usuario in usuarioList" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{usuario.senha}}</td>
          <td> {{ usuario.descricao }}</td>
          <td> {{ usuario.url }}</td>
          <th>
            <button @click="onClickPaginaDetalhar(usuario.id)" class="button is-small is-warning is-light"> Detalhar </button>
          </th>
        </tr>
      </tbody>
      </table>
  </div>

</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

import { PageRequest } from '@/model/page/page-request'
import { PageResponse } from '@/model/page/page-response'
import { Usuario } from '@/model/usuario.model'
import { UsuarioClient } from '@/client/usuario.client'



export default class UsuarioList extends Vue {
  public pageRequest: PageRequest = new PageRequest()
  public pageResponse: PageResponse<Usuario> = new PageResponse()
  public usuarioList: Usuario[] = []
  public usuarioClient!: UsuarioClient
  public mounted(): void {
    this.usuarioClient = new UsuarioClient()
    this.listarUsuario()
  }
  public listarUsuario(): void {
    this.usuarioClient.findByFiltrosPaginado(this.pageRequest)
      .then(
        success => {
          this.pageResponse = success
          this.usuarioList = this.pageResponse.content
        },
        error => console.log(error)
      )
  }
  public onClickPaginaDetalhar(idUsuario: number) {
    this.$router.push({ name: 'usuario-detalhar', params: { id: idUsuario, model: 'detalhar' } })
  }

}
</script>

<style lang="scss">
@import "~bulma/bulma.sass";

.titulo {
    margin-left: 2%;
}

.title h1 {
  font-size: 0.7em;
  margin-left: 13px;
}

.table thead {
  background-color: rgb(84, 233, 84);
  width: 100%;
}

.table {
  width: 80%;
  border: 1px solid #ddd;
  margin-top: 20px;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

td p {
  font-weight: bold;
}

.table td {
  border-left: 1px dashed #ddd;
}

tbody tr:hover {
  background-color: #f8f8f8;
  ;
}

.search-bar input {
  height: 35px;
  width: 60em;
  border-radius: 0.3em;
  border: 1px solid #ddd;
}

.search-bar button,
.detail-button {
  height: 35px;
  margin-left: 10px;
}

#app > .columns{
	margin-left: 425px;
}

.btn {
    width: 15rem;
}


</style>