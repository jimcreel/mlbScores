import axios from 'axios';
import jwt_decode from 'jwt-decode';

const authHeader = {headers: {'Authorization': localStorage.getItem('userToken')}};

export async function signUp(user) {
    const data = await axios.post('/api/users/signup', user);
    return data
}

export async function logIn(user) {
    const {data} = await axios.post('/api/users/login', user);
    return data
}

export async function createComment(comment) {
    const response = await axios.post(`/api/comments`, comment, authHeader);
    console.log(response)
    return response;
}

export async function updateComment(comment, id) {
    const response = await axios.put(`/api/comments/${id}`, comment, authHeader);
    return response;
}

export async function deleteComment(id) {
    const response = await axios.delete(`/api/comments/${id}`, authHeader);
    return response;
}

export async function getComments(gameId) {
    const response = await axios.get(`/api/comments/${gameId}`);
    return response;
}

export function getUserId()
{
    const token = localStorage.getItem('userToken')
    const decodedToken = jwt_decode(token)
    return decodedToken
}

export async function logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
}

