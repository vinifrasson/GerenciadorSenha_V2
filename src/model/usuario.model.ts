import { AbstractEntity } from "./abstract-entity.model";

export class Usuario extends AbstractEntity{
        nome! : string
        descricao! : string
        url! : string
        constructor(){
                super();
                this.ativo = true;
        }
}
