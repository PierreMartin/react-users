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
            url: '/api/cours/' + id
        }),
        updateCours: ({ id, data }) => client.request({
            method: 'PUT',
            url: '/api/cours/' + id,
            data
        }),
        createCours: ({ id, data }) => client.request({
            method: 'POST',
            url: '/api/cours/' + id,
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
            url: '/api/user/all'
        }),
        getUser: (id) => client.request({
            method: 'GET',
            url: '/api/user/' + id
        }),
				updateUser: (param, id) => client.request({
					method: 'PUT',
					url: '/api/user/' + id,
					data: param
				}),
        createAvatarUser: (data, id, avatarId) => client.request({
					method: 'POST',
					url: '/api/user/avatar/' + id + '/' + avatarId,
					data: data
				}),
				updateDefaultAvatarUser: (avatarId, idUser) => client.request({
					method: 'PUT',
					url: '/api/user/avatar/' + idUser,
					data: {avatarMainSelected: avatarId} // (data must is a object type)
				})
        /*
        deleteUsers: (id) => client.request({
            method: 'DELETE',
            url: '/api/user/' + id
        }),
        createUsers: ({ id, data }) => client.request({
            method: 'POST',
            url: '/api/user/' + id,
            data
        })
        */
    };
}

export function apiChat() {
    const client = createRestApiClient().withConfig({ baseURL: 'http://localhost:3000' });

    return {
				getChannels: () => client.request({
            method: 'GET',
            url: '/api/tchat/channel/all'
        }),
				createChannel: (data) => client.request({
            method: 'POST',
            url: '/api/tchat/channel',
						data: data
        })
    };
}