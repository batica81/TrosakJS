export const trosakPath = 'trosak'

export const trosakMethods = ['find', 'get', 'create', 'patch', 'remove']

export const trosakClient = (client) => {
  const connection = client.get('connection')

  client.use(trosakPath, connection.service(trosakPath), {
    methods: trosakMethods
  })
}
