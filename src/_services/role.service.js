import { securedAxiosInstance, plainAxiosInstance } from './backend/axios'

export const roleService = {
    getAllRoles
};

function getAllRoles() {
		this.$http.plain.get('/admin/roles')
        .then(return response)
        .catch(error => this.signinFailed(error))
}