import fetch from 'node-fetch';
import { mockFetchData, writeMockData } from './mockUtils';

const httpFetchUsers = async () => {
    const url = `https://api.sleeper.app/v1/league/${process.env.LEAGUE_ID}/users/`;
    const response = await fetch(url);
    const usersData = await response.json();
    const users = usersData.reduce((acc, d) => {
        const key = d['user_id']
        acc[key] = d;
        return acc;
    }, {})
    if (process.env.NODE_ENV === 'WRITE_MOCKS') { writeMockData(users, 'users') }
    return users;
};

const fetchUsers = async (useHttp) => {
    return useHttp
        ? await httpFetchUsers()
        : mockFetchData('users');
};

module.exports = {
    fetchUsers
}
