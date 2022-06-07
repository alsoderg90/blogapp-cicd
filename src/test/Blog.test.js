import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'jest-dom',
    url: 'www.fullstackopen.com',
    likes: 5,
    user : {
      username: 'alexander',
      id: 123,
      name: 'allu',
    }
  }

  const component = render(
    <Blog blog={blog}
    />
  )

  component.debug()

  expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')
  expect(component.container).toHaveTextContent('jest-dom')
})

test('button show url & likes-test', async () => {
  const users = {
    username: 'alexander'
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'jest-dom',
    url: 'www.fullstackopen.com',
    likes: 120,
    user : {
      username: 'alexander',
      id: 123,
      name: 'allu',
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} users={users} setBlogs={mockHandler}

    />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('www.fullstackopen.com')
  expect(component.container).toHaveTextContent(120)
})