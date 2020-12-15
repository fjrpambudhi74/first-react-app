import React from 'react'
import './BlogList.css'

const BlogList = (props) => {
    return (
        <div className="news-list">
            <div className="row">
                <div className="img-thumb">
                    <img src="https://picsum.photos/seed/picsum/250/250" alt="" />
                </div>
                <div className="content">
                    <p className="title">{props.data.title}</p>
                    <p className="desc">{props.data.body}</p>
                    <button className="btn update" onClick={() => props.update(props.data)}>Update</button>
                    <button className="btn remove" onClick={() => props.remove(props.data.id)}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default BlogList;