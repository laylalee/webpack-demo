import React, { Component } from 'react'

export default class CommentList  extends Component {
    render() {
        const comments = [
            {username: 'Jerry', content: 'Hello'},
            {username: 'Tomy', content: 'World'},
            {username: 'Lucy', content: 'Good'}
        ]
      
        return (
            <div>{
                comments.map((comment,i)=>{
                    return(
                        <div key={i}>
                            {comment.username}:{comment.content}
                        </div>
                    )

                })
            }
           
            </div>
        )
    }
}
