import axios from 'axios'
import { setupInterceptors } from './interceptors'

export const api = axios.create({
  baseURL: 'https://api.spotify.com/v1',
})

setupInterceptors(api)
