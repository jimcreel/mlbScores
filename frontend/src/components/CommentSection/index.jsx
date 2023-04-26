import { useState, useEffect } from 'react'
import {createComment, getComments} from '../../../utils/backend';


export default function CommentSection (props) {
    const {game} = props;
    const [comments, setComments] = useState([]);
    useEffect(() => {
        getComments(game.gamePk)
        .then (apiResponse => {
            console.log(apiResponse.data)
            setComments(apiResponse.data)
        })
    }, [game])

    let commentElement = <p> Loading... </p>;
    if (comments.length > 0) {
        commentElement = comments.map((comment) => 
        <div>
            <h2> {comment.name}</h2>
            <h2> {comment.comment}</h2>
        </div>
        )
    }

   
    
    return (
        <div className='flex flex-col'>
            {commentElement}

    </div>
    )

}
