import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  test('rendering component, it shows the title, but not the author, url or likes. simulate click on visible and hidden button', async () => {
    const blog = {
      title: 'title test',
      author: 'author test',
      url: 'pruebatest.com',
      likes: 0,
      user: {
        username: 'hellas',
        name: 'Arto Hellas',
        id: '66126bc3e2fa47c0eeb9728b',
      },
    }

    const onLikes = vi.fn()
    const onRemove = vi.fn()
    const onUser = {
      username: 'hellas',
      name: 'Arto Hellas',
      id: '66126bc3e2fa47c0eeb9728b',
    }

    const { container } = render(
      <Blog blog={blog} onLikes={onLikes} onRemove={onRemove} user={onUser} />
    )
    const user = userEvent.setup()
    const visibleButton = screen.getByText(/View/)

    expect(screen.queryByText(/title test/)).toBeInTheDocument()
    expect(screen.queryByText(/author test/)).not.toBeInTheDocument()
    expect(screen.queryByText(/pruebatest.com/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Likes: 0/)).not.toBeInTheDocument()

    await user.click(visibleButton)

    expect(screen.queryByText(/title test/)).toBeInTheDocument()
    expect(screen.queryByText(/author test/)).toBeInTheDocument()
    expect(screen.queryByText(/pruebatest.com/)).toBeInTheDocument()
    expect(screen.queryByText(/Likes: 0/)).toBeInTheDocument()

    const hideButton = screen.getByText(/Hide/)
    await user.click(hideButton)

    expect(screen.queryByText(/title test/)).toBeInTheDocument()
    expect(screen.queryByText(/author test/)).not.toBeInTheDocument()
    expect(screen.queryByText(/pruebatest.com/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Likes: 0/)).not.toBeInTheDocument()
  })
})