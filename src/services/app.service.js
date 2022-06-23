import { axiosService } from './axios.service';
import { urls } from '../config';

export const appService = {
    getAll: (page = 1, sort, search) =>
        axiosService
            .get(urls.users, {
                params: {
                    page,
                    sort,
                    search,
                    quantity: 10
                }
            })
            .then((response) => response.data),
    getById: (id) => axiosService.get(`${urls.getById}/${id}`).then((response) => response.data),
    create: (person) =>
        axiosService.post(urls.createUser, person).then((response) => response.data),
    updateById: (id, person) =>
        axiosService.put(`${urls.updateUser}/${id}`, person).then((response) => response.data),
    deleteById: (id) => axiosService.delete(`${urls.delete}/${id}`)
};
