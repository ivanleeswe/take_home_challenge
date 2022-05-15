import { rest } from 'msw'
import { UsersData } from './users-data'
import { v4 as uuidv4 } from 'uuid'

const url = `/api/users`

const notFound = { error: "User not found", status: 404 }

export const handlers = [
  rest.get(url, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(UsersData), ctx.delay(300))
  }),

  rest.get(`${url}/:userId`, (req, res, ctx) => {
    const { userId } = req.params
    if (userId) {
      const userIndex = UsersData.findIndex(
        (user) => user.id === userId.toString()
      )
      if (userIndex !== -1) {
        return res(ctx.json(UsersData[userIndex]), ctx.status(200), ctx.delay(300))
      } else {
        return res(ctx.json(notFound), ctx.status(404))
      }
    }
    return res({ error: "Error listing users", status: 400 }, ctx.status(400), ctx.delay(400))
  }),

  rest.post(`${url}`, (req, res, ctx) => {
    if (req.body?.name) {
      const user = {
        id: uuidv4(),
        ...req.body,
      }
      UsersData.push(user)
      return res(ctx.status(201), ctx.json(user))
    }
    return res({ error: "Error creating user", status: 400 }, ctx.status(400))
  }),

  rest.delete(`${url}/:userId`, (req, res, ctx) => {
    const { userId } = req.params
    if (userId) {
      const userIndex = UsersData.findIndex(
        (user) => user.id === userId.toString()
      )
      if (userIndex !== -1) {
        UsersData.splice(userIndex, 1)
        return res(ctx.status(200))
      } else {
        return res(ctx.json(notFound), ctx.status(404), ctx.delay(300))
      }
    }
    return res(ctx.json({ error: "Error deleting user", status: 400 }), ctx.status(400), ctx.delay(200))
  }),

  rest.put(`${url}/:userId`, (req, res, ctx) => {
    const { userId } = req.params
    if (userId) {
      const userIndex = UsersData.findIndex(
        (user) => user.id === userId.toString()
      )
      if (userIndex !== -1) {
        UsersData[userIndex] = { ...req.body }
        return res(ctx.status(200))
      } else {
        return res(ctx.json(notFound), ctx.status(404))
      }
    }
    return res({ error: "Error updating user", status: 400 }, ctx.status(400))
  }),
]

export const getUserException = rest.get(
  url,
  async (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Deliberately broken request' }))
)

