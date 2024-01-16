import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'
import {
  MESSAGE_TASK_NOT_FOUND,
  ROUTE_TASKS,
  TABLE_TASKS,
} from './utils/consts.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath(ROUTE_TASKS),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select(
        TABLE_TASKS,
        search
          ? {
              title: search,
              description: search,
            }
          : null,
      )

      return res.end(JSON.stringify(tasks))
    },
  },
  {
    method: 'POST',
    path: buildRoutePath(ROUTE_TASKS),
    handler: (req, res) => {
      const { title, description } = req.body

      const today = new Date()

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: today,
        completed_at: null,
        updated_at: today,
      }

      database.insert(TABLE_TASKS, task)

      return res.writeHead(201).end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath(`${ROUTE_TASKS}/:taskId`),
    handler: (req, res) => {
      const { taskId } = req.params

      const response = database.delete(TABLE_TASKS, taskId)

      if (response === MESSAGE_TASK_NOT_FOUND) {
        return res.writeHead(400).end(response)
      }

      return res.writeHead(204).end()
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath(`${ROUTE_TASKS}/:taskId`),
    handler: (req, res) => {
      const { taskId } = req.params
      const { title, description } = req.body

      if (!title || !description) {
        return res
          .writeHead(400)
          .end('Falha. Verifique os dados da task e tente novamente.')
      }

      const response = database.selectById(TABLE_TASKS, taskId)

      if (response === MESSAGE_TASK_NOT_FOUND) {
        return res.writeHead(400).end(response)
      }

      const updatedTask = {
        id: response.id,
        title,
        description,
        created_at: response.created_at,
        completed_at: response.completed_at,
        updated_at: new Date(),
      }

      database.update(TABLE_TASKS, taskId, updatedTask)

      return res.writeHead(204).end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath(`${ROUTE_TASKS}/:taskId/complete`),
    handler: (req, res) => {
      const { taskId } = req.params

      const response = database.selectById(TABLE_TASKS, taskId)

      if (response === MESSAGE_TASK_NOT_FOUND) {
        return res.writeHead(400).end(response)
      }

      const updatedTask = {
        id: response.id,
        title: response.task,
        description: response.description,
        created_at: response.created_at,
        completed_at: new Date(),
        updated_at: response.updated_at,
      }

      database.update(TABLE_TASKS, taskId, updatedTask)

      return res.writeHead(204).end()
    },
  },
]
