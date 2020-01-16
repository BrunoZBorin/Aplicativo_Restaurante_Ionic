import { Iproduto } from "./Iproduto";

export interface Icompra{
    created_at?: string;
    data: string;
    id: number;
    status: string;
    total: number;
    updated_at?: string;
    user_id: number;
    produtos:Iproduto[];
}
