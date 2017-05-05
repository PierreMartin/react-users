// import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../middlewares/createRestApiClient';

export default () => {
    const client = createRestApiClient().withConfig({ baseURL: 'http://localhost:3000' });
    // const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });

    return {
        getCourses: () => client.request({
            method: 'GET',
            url: '/api/cours'
        }),
        deleteCourses: ({ id }) => client.request({
            method: 'DELETE',
            url: `/api/cours/${id}`
        }),
        updateCourses: ({ id, data }) => client.request({
            method: 'PUT',
            url: `/api/cours/${id}`,
            data
        }),
        createCourses: ({ id, data }) => client.request({
            method: 'POST',
            url: `/api/cours/${id}`,
            data
        })
    };
};