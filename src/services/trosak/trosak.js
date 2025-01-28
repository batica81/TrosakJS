// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  trosakDataValidator,
  trosakPatchValidator,
  trosakQueryValidator,
  trosakResolver,
  trosakExternalResolver,
  trosakDataResolver,
  trosakPatchResolver,
  trosakQueryResolver
} from './trosak.schema.js'
import { TrosakService, getOptions } from './trosak.class.js'
import { trosakPath, trosakMethods } from './trosak.shared.js'

export * from './trosak.class.js'
export * from './trosak.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const trosak = (app) => {
  // Register our service on the Feathers application
  app.use(trosakPath, new TrosakService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: trosakMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(trosakPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(trosakExternalResolver),
        schemaHooks.resolveResult(trosakResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(trosakQueryValidator), schemaHooks.resolveQuery(trosakQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(trosakDataValidator), schemaHooks.resolveData(trosakDataResolver)],
      patch: [schemaHooks.validateData(trosakPatchValidator), schemaHooks.resolveData(trosakPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
