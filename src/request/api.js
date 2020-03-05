
import { get, post } from './http'
//标签
export const apiGetProducts = ()=> get('/api/v1/vip/products');
export const apiGetUserMsg=()=>get('/api/v1/user')