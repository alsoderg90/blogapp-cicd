import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Button, Row, Col } from 'react-bootstrap'


const BlogForm = ({ setBlogsVisible,addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlog = (event) => {
    event.preventDefault()
    const newBlog = { title: title, author: author, url: url }
    addBlog(newBlog)
    setUrl('')
    setTitle('')
    setAuthor('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form className="mb-3" onSubmit={newBlog}>
        <Form.Label> Title:</Form.Label>
        <Form.Control id='title' type="text" value={title} name="title" onChange={({ target }) => {setTitle(target.value)}}/>
        <Form.Label>Author: </Form.Label> 
        <Form.Control id='author' type="text" value={author} name="author" onChange={({ target }) => {setAuthor(target.value)}}/>
        <Form.Label> Url: </Form.Label>
        <Form.Control id='url' type="text" value={url} name="url" onChange={({ target }) => {setUrl(target.value)}}/>
        <Button id='create' type="submit">Create</Button>
      </Form>
	  <Row>
        <Col>
          <Button onClick={() => setBlogsVisible(false)}> Cancel </Button>
	  </Col>
	  </Row>
    </div>
  )
}

export default BlogForm