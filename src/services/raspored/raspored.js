// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  rasporedDataValidator,
  rasporedPatchValidator,
  rasporedQueryValidator,
  rasporedResolver,
  rasporedExternalResolver,
  rasporedDataResolver,
  rasporedPatchResolver,
  rasporedQueryResolver
} from './raspored.schema.js'
import { RasporedService, getOptions } from './raspored.class.js'
import { rasporedPath, rasporedMethods } from './raspored.shared.js'

export * from './raspored.class.js'
export * from './raspored.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const raspored = (app) => {
  // Register our service on the Feathers application
  app.use(rasporedPath, new RasporedService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: rasporedMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(rasporedPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(rasporedExternalResolver),
        schemaHooks.resolveResult(rasporedResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(rasporedQueryValidator),
        schemaHooks.resolveQuery(rasporedQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(rasporedDataValidator),
        schemaHooks.resolveData(rasporedDataResolver)
      ],
      patch: [
        schemaHooks.validateData(rasporedPatchValidator),
        schemaHooks.resolveData(rasporedPatchResolver)
      ],
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
