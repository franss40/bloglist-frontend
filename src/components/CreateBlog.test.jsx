import { render, screen } from "@testing-library/react"
import CreateBlog from "./CreateBlog"
import { describe, expect, test } from "vitest"
import userEvent from "@testing-library/user-event"


describe("<CreateBlog />", () => {
  test("the form calls the event handler passed by props and the correct data is sent when creating a new blog", async() => {
    const handleCreate = vi.fn()
    render( <CreateBlog handleCreate={handleCreate} /> )

    const user = userEvent.setup()

    const titleText = screen.getByPlaceholderText('title')
    const authorText = screen.getByPlaceholderText("author")
    const urlText = screen.getByPlaceholderText("url")

    await user.type(titleText, 'title for testing')
    await user.type(authorText, "author for testing")
    await user.type(urlText, "url for testing")

    const buttonSubmit = screen.getByText(/create/)
    await user.click(buttonSubmit)

    expect(handleCreate.mock.calls).toHaveLength(1)
    expect(handleCreate.mock.calls[0][0]).contain.toStrictEqual({ title: 'title for testing', author: 'author for testing', url: 'url for testing' })
  })
})
