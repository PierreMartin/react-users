import createRestApiClient from '../../middlewares/createRestApiClient';

export function apiCours() {
    const client = createRestApiClient().withConfig({ baseURL: 'http://localhost:3000' });
 // const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });

    return {
        getCours: () => client.request({
            method: 'GET',
            url: '/api/cours'
        })
        /*
        deleteCours: ({ id }) => client.request({
            method: 'DELETE',
            url: `/api/cours/${id}`
        }),
        updateCours: ({ id, data }) => client.request({
            method: 'PUT',
            url: `/api/cours/${id}`,
            data
        }),
        createCours: ({ id, data }) => client.request({
            method: 'POST',
            url: `/api/cours/${id}`,
            data
        })
        */
    };
}

export function apiUsers() {
    const client = createRestApiClient().withConfig({ baseURL: 'http://localhost:3000' });
    // const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });

    return {
        getUsers: () => client.request({
            method: 'GET',
            url: '/api/usersList'
        })
        /*
        deleteUsers: ({ id }) => client.request({
            method: 'DELETE',
            url: `/api/usersList/${id}`
        }),
        updateUsers: ({ id, data }) => client.request({
            method: 'PUT',
            url: `/api/usersList/${id}`,
            data
        }),
        createUsers: ({ id, data }) => client.request({
            method: 'POST',
            url: `/api/usersList/${id}`,
            data
        })
        */
    };
}