<template>
    <div class="columns is-12">
        <article class="titulo panel is-primary">
            <p class="panel-heading">
                Cadastrar Senhas
            </p>
        </article>
    </div>
    <div class="column is-10">
        <div :class="notification.classe" v-if="notification.ativo">
            <button class="delete" @click="onClickFecharNotificacao()"></button>
            {{ notification.mensagem }}
        </div>
    </div>
    <div class="columns p-7">
        <div class="column is-7">

            <div class="field">
                <label class="label has-text-left">Senha</label>
                <div class="control">
                    <input class="input" type="text" v-model="usuario.senha" placeholder="Insira uma Senha"
                        :disabled="visualizar == 'detalhar' ? true : false">
                </div>

            </div>
            <div class="field">
                <label class="label has-text-left">Descrição</label>
                <div class="control">
                    <input class="input" type="text" v-model="usuario.descricao" placeholder="Insira uma Descrição"
                        :disabled="visualizar == 'detalhar' ? true : false">
                </div>
            </div>
            <div class="field">
                <label class="label has-text-left">URL</label>
                <div class="control">
                    <input class="input" type="text" v-model="usuario.url" placeholder="Insira a URL do site"
                        :disabled="visualizar == 'detalhar' ? true : false">
                </div>
            </div>
        </div>
    </div>
    <div class="columns botao" v-if="visualizar === 'detalhar'">
    <div class="column is-2">
      <router-link to="/usuario-list">
        <button class="button is-fullwidth is-light">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-info is-light" @click="onClickSairModoDetalhar()">Editar</button>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-danger is-light" @click="onClickDeletar()">Excluir</button>
    </div>
  </div>

  <div class="columns is-vcentered" v-if="visualizar === 'editar'">
    <div class="column is-2">
      <router-link to="/usuario-list">
        <button class="button is-fullwidth is-light">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-info is-light" @click="onClickEditar()">Salvar as Alterações</button>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-danger is-light" @click="onClickDeletar()">Excluir</button>
    </div>
  </div>

  <div class="columns" v-if="visualizar === 'cadastrar'">
    <div class="column is-2">
      <router-link to="/usuario-list">
        <button class="button is-fullwidth is-light">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-info is-light" @click="onClickCadastrar()">Cadastrar Senha</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Usuario } from "@/model/usuario.model";
import { Prop } from "vue-property-decorator";
import { Notification } from '@/model/notification';
import { UsuarioClient } from '@/client/usuario.client';
export default class UsuarioForm extends Vue {
  private usuarioClient!: UsuarioClient
  usuario: Usuario = new Usuario()
  notification: Notification = new Notification()
  visualizar = 'detalhar'
  @Prop({ type: Number, required: false })
  private readonly id!: number
  @Prop({ type: String, default: false })
  private readonly model!: string
  public mounted(): void {
    this.usuarioClient = new UsuarioClient()
    this.carregarUsuario()
  }
  onClickSairModoDetalhar(): void {
    this.visualizar = 'editar'
  }
  onClickCadastrar(): void {
    this.usuarioClient.cadastrar(this.usuario).then(
        success => {
          this.notification = this.notification.new(true, 'notification is-success',
              'A senha foi Cadastrado com sucesso')
          console.log(this.usuario)
          this.onClickLimpar()
        }, error => {
          this.notification = this.notification.new(true, 'notification is-danger',
              'Error: ' + error)
          console.log(this.usuario)
          this.onClickLimpar()
        })
  }
  private carregarUsuario(): void {
    if (this.model === 'detalhar') {
      this.usuarioClient.findById(this.id).then(value => {
        this.usuario = value
      }).catch(reason => {
        this.notification = reason
        console.log(this.notification)
      })
    } else {
      this.visualizar = 'cadastrar'
    }
  }
  onClickEditar(): void {
    this.usuarioClient.editar(this.usuario).then(sucess => {
      this.notification = this.notification.new(true, 'notification is-success',
          'A senha foi editada com sucesso')
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
    })
  }

  onClickDeletar(): void {
    this.usuarioClient.deletar(this.usuario).then(sucess => {
      this.notification = this.notification.new(true, 'notification is-success',
        'A senha foi excluida com sucesso')
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger',
        'Error: ' + error)
    })
  }
  onClickFecharNotificacao(): void {
    this.notification = new Notification()
  }
  private onClickLimpar(): void {
    this.usuario = new Usuario()
  }
}
</script>

<style>

.titulo {
    margin-left: 14%;
}



#app > .columns{
	margin-left: 550px;
}


</style>