import { AbstractEntity } from "./abstract-entity.model";

export class Usuario extends AbstractEntity{
        senha! : string
        descricao! : string
        url! : string
}
