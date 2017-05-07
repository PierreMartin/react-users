const defaultFetchData = () => Promise.resolve();

function fetchDataForRoute({ routes, params }, store) {
    const matchedRoute = routes[routes.length - 1];
    const fetchDataHandler = matchedRoute.fetchMyDatas || defaultFetchData;
    return fetchDataHandler(params, store);
}

export default fetchDataForRoute;

