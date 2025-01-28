import { raspored } from './raspored/raspored.js'
import { prihod } from './prihod/prihod.js'
import { trosak } from './trosak/trosak.js'
import { user } from './users/users.js'
export const services = (app) => {
  app.configure(raspored)

  app.configure(prihod)

  app.configure(trosak)

  app.configure(user)

  // All services will be registered here
}
