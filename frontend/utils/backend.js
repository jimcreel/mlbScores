import axios from 'axios';

export async function getComments(gameId) {
    const response = await axios.get(`/api/comments/${gameId}`);
    return response;
}

export async function createComment(gameId, commentData) {
    const response = await axios.post(`/api/comments/${gameId}`, commentData);
    return response;
}

export async function updateComment(commentId, commentData) {
    const response = await axios.put(`/api/comments/${commentId}`, commentData);
    return response;
}

export async function deleteComment(commentId) {
    const response = await axios.delete(`/api/comments/${commentId}`);
    return response;
}

