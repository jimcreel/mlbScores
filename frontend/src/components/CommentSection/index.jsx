import { useState, useEffect } from 'react'
import {createComment, getComments} from '../../../utils/backend';
import Comment from '../Comment'
import { getUserId } from '../../../utils/backend';

export default function CommentSection (props) {
    const {game} = props;
    const [comments, setComments] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createFormData, setCreateFormData] = useState({
        name: '',
        comment: ''
    })

    useEffect(() => {
        getComments(game.gamePk)
        .then (apiResponse => {
            setComments(apiResponse.data)
        })
    }, [game])

    

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm)
    }
    
    async function refreshComments() {
        getComments(game.gamePk)
        .then (newComments => {
            setComments(newComments.data)
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        let userId = getUserId()
        setCreateFormData({
            name: '',
            comment: '',
            userId: userId
        })
        setShowCreateForm(false)
        createComment({...createFormData, gameId: game.gamePk})
        .then(() => refreshComments())
    }

    let commentElements = [<p key='0'> No comments yet. Be the first to comment! </p>]
    if (comments.length > 0) {
        commentElements = comments.map((comment) => {
            return <Comment key={comment._id} data={comment} refreshComments={refreshComments} />
        })
    }
    

    let btnText = 'Add a Comment'
    if (showCreateForm) {
        btnText = 'Cancel'
    }

   
    
    return (
        <div className='comment-section bg-gray-300 rounded-lg p-4 pb-10 mt-4 space-y-4 relative'>
            <h1 className='text-xl font-bold'>Viewer Insights</h1>
            <button
                onClick={toggleCreateForm}
                className="top-0 right-5 absolute text-white hover:bg-green-800 font-bold py-2 px-4 bg-green-900 rounded cursor-pointer mr-2"
            >
                {btnText}
            </button>
            {
                showCreateForm && <form
                    onSubmit={handleSubmit}
                    className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto text-right">
                    
                    <textarea
                        name="comment"
                        className="p-2 my-2 h-[100px] w-full bg-gray-100"
                        placeholder="Share your thoughts!"
                        value={createFormData.comment}
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                        Post
                    </button>
                </form>
            }
            {commentElements}
        </div>
    )
}
