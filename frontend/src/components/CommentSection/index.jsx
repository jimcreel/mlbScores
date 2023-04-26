import { useState, useEffect } from 'react'
import {createComment, getComments} from '../../utils/backend';


export default function CommentSection (props) {
    const {game} = props;
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(game.gamePk)
        .then (apiResponse => {
            setComments(apiResponse)
        })
    }, [])
    let commentElement = <p> Loading... </p>;
    console.log(comments)
    if (comments) {
        commentElement = comments.map((comment) => <p> {comment.content} </p>)
    }

   
    
    return (
        <div className='flex flex-col'>
            {commentElement}

    </div>
    )

}
