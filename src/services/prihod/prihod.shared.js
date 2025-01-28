export const prihodPath = 'prihod'

export const prihodMethods = ['find', 'get', 'create', 'patch', 'remove']

export const prihodClient = (client) => {
  const connection = client.get('connection')

  client.use(prihodPath, connection.service(prihodPath), {
    methods: prihodMethods
  })
}
