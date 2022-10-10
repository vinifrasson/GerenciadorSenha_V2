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
                    <input class="input" type="text" v-model="usuario.nome" placeholder="Insira uma Senha"
                        :disabled="model == 'detalhar' ? true : false">
                </div>

            </div>
            <div class="field">
                <label class="label has-text-left">Descrição</label>
                <div class="control">
                    <input class="input" type="text" v-model="usuario.descricao" placeholder="Insira uma Descrição"
                        :disabled="model == 'detalhar' ? true : false">
                </div>
            </div>
            <div class="field">
                <label class="label has-text-left">URL</label>
                <div class="control">
                    <input class="input" type="text" v-model="usuario.url" placeholder="Insira a URL do site"
                        :disabled="model == 'detalhar' ? true : false">
                </div>
            </div>
        </div>
    </div>
    <div class="column is-10 is-flex is-justify-content-space-between p-5">
        <div class="botoes field is-grouped">
            <p class="control">
                <a href="/usuario-list" class="button is-danger is-info">Voltar</a>
            </p>
            <p class="control">
                <button class="button is-fullwidth is-primary" @click="onClickCadastrar()">Confirmar</button>

            </p>
        </div>
        <div class="field" v-if="model === 'detalhar'">
            <div class="control">
                <input class="button has-background-primary has-text-white is-uppercase btn" type="button"
                    value="Editar" @click="onClickPaginaEditar(id)">
            </div>
        </div>
        <div class="field" v-if="model === 'detalhar'">
            <div class="control">
                <input class="button has-background-danger has-text-white is-uppercase btn" type="button"
                    value="Desativar" @click="onClickDesativar()">
            </div>
        </div>
        <div class="field" v-if="model === 'editar'">
            <div class="control">
                <input class="button has-background-primary has-text-white is-uppercase btn" type="button"
                    value="Editar" @click="onClickEditar()">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

import { Prop } from 'vue-property-decorator'
import { Notification } from '@/model/notification';
import { Usuario } from '@/model/usuario.model';
import { UsuarioClient } from '@/client/usuario.client';

export default class UsuarioForm extends Vue {

    public usuarioClient!: UsuarioClient;
    public usuario: Usuario = new Usuario()
    public notification: Notification = new Notification()

    @Prop({ type: Number, required: false })
    public readonly id!: number

    @Prop({ type: String, required: false })
    public readonly model!: string

    public mounted(): void {
        this.usuarioClient = new UsuarioClient();
        if (this.id) {
            this.getById(this.id)
        }
    }

    public onClickCadastrar(): void {
        this.usuarioClient.cadastrar(this.usuario)
            .then(
                success => {
                    this.notification = this.notification.new(true, 'notification is-success', 'Convênio Cadastrado Com Sucesso!')
                    this.onClickLimpar()
                }, error => {
                    this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
                    this.onClickLimpar()
                }
            )
    }

    public onClickEditar(): void {
        this.usuarioClient.editar(this.usuario)
            .then(
                success => {
                    this.$router.push('/usuarios')
                }, error => {
                    this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
                    this.onClickLimpar()
                }
            )
    }

    public onClickDesativar(): void {
        this.usuarioClient.desativar(this.usuario)
            .then(
                success => {
                    this.$router.push('/usuarios')
                }
            )
    }

    public onClickFecharNotificacao(): void {
        this.notification = new Notification()
    }

    public onClickLimpar(): void {
        this.usuario = new Usuario()
    }

    public getById(id: number): void {
        this.usuarioClient.findById(id)
            .then(
                success => {
                    this.usuario = success
                }
            )
    }

    public onClickPaginaEditar(id: number): void {
        this.$router.push({ name: 'ConveniosForm', params: { id: id, model: 'editar' } })
    }

}
</script>

<style>
.titulo {
    margin-left: 14%;
}

.is-flex .is-grouped{
	margin-left:85px;
}

#app > .columns{
	margin-left: 550px;
}



.btn {
    width: 15rem;
}
</style>