const defaultFetchData = () => Promise.resolve();

function fetchDataForRoute({ routes, params }) {
    const matchedRoute = routes[routes.length - 1];
    const fetchDataHandler = matchedRoute.fetchMyDatas || defaultFetchData;
    return fetchDataHandler(params);
}

export default fetchDataForRoute;

