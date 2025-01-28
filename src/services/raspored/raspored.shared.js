export const rasporedPath = 'raspored'

export const rasporedMethods = ['find', 'get', 'create', 'patch', 'remove']

export const rasporedClient = (client) => {
  const connection = client.get('connection')

  client.use(rasporedPath, connection.service(rasporedPath), {
    methods: rasporedMethods
  })
}
