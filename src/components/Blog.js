/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import blogService from '../services/blogs'
import { Button, ListGroup } from 'react-bootstrap'

const Blog = ({ blog, setBlogs,blogs }) => {

  const voteBlog = async (blog) => {
    const newBlog = {
      title : blog.title,
      author : blog.author,
      url : blog.url,
      likes : blog.likes +1,
    }
    const updatedBlog = await blogService.update(blog.id,newBlog)
    const updatedBlogs = blogs.map(oldBlog => (oldBlog.id === updatedBlog.id) ? updatedBlog : oldBlog)
    setBlogs(updatedBlogs)
  }

  const RemoveBlog = () => {
    return (
      <Button
	  variant='danger' 
	  id='remove' 
	  onClick={() => {
          if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`))
            blogService.remove(blog.id)
          setBlogs(blogs.filter(savedblog => savedblog.id !== blog.id))
        }}
	  > Delete
      </Button>
    )
  }

  const [allInfo, showAll] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleShow = () => {
    showAll(!allInfo)
  }

  const handleVote = () => {
    voteBlog(blog)
  }

  if (allInfo === false)
    return (
      <ListGroup>
        <ListGroup.Item className='blog'>
          <div style={blogStyle}><div>
            {blog.title} by {blog.author}
            <Button id='view' onClick={handleShow}>View</Button>
          </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    )

  else {
    return (
      <ListGroup>
        <ListGroup.Item className='all'>
          <div style={blogStyle}><div>
            <p>{blog.title} 
              <Button onClick={handleShow}> Hide </Button>
            </p>
            <p> {blog.author} </p>
            <p> Likes {blog.likes} 
              <Button 
			    variant="success" 
			    id='like' 
			    onClick={handleVote}>
				 Vote
              </Button> 
            </p>
            <p> {blog.url}</p>
            <p> {blog.user.name}</p>
            {RemoveBlog()}
          </div>
          </div>
        </ListGroup.Item>
	  </ListGroup>
    )
  }
}

export default Blog
