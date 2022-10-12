import { Usuario } from "@/model/usuario.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axios, { AxiosInstance } from "axios";

export class UsuarioClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: "http://localhost:8080/api/usuarios",
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async cadastrar(usuario: Usuario): Promise<void> {
        try {
            return (await this.axiosClient.post('/', usuario))
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Usuario>> {
        try {

            let requestPath = ''
            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined 
                    ? '' : pageRequest.sortField},${pageRequest.direction}`

            return (await this.axiosClient.get<PageResponse<Usuario>>(requestPath,
                {
                    params: { filtros: pageRequest.filter }
                }
            )).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findById(id: number): Promise<Usuario> {
        try {
            return (await this.axiosClient.get<Usuario>(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByName(pageRequest: PageRequest,name: string): Promise<PageResponse<Usuario>> {
		try {
				
			let requestPath = ''
			
			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined 
				? '' : pageRequest.sortField},${pageRequest.direction}`
			
			return (await this.axiosClient.get<PageResponse<Usuario>>(`/busca/${name}`+requestPath,
				{ 
					params: { filtros: pageRequest.filter } 
				}
			)).data
		} catch (error: any) { 
			return Promise.reject(error.response) 
		}
	}

    public async editar(usuario: Usuario): Promise<void> {
        try {
            return (await this.axiosClient.put(`/${usuario.id}`, usuario)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }


    public async deletar(usuario: Usuario): Promise<void> {
        try {
            return (await this.axiosClient.delete(`/${usuario.id}`, usuario)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
}