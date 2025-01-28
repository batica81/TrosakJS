// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  prihodDataValidator,
  prihodPatchValidator,
  prihodQueryValidator,
  prihodResolver,
  prihodExternalResolver,
  prihodDataResolver,
  prihodPatchResolver,
  prihodQueryResolver
} from './prihod.schema.js'
import { PrihodService, getOptions } from './prihod.class.js'
import { prihodPath, prihodMethods } from './prihod.shared.js'

export * from './prihod.class.js'
export * from './prihod.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const prihod = (app) => {
  // Register our service on the Feathers application
  app.use(prihodPath, new PrihodService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: prihodMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(prihodPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(prihodExternalResolver),
        schemaHooks.resolveResult(prihodResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(prihodQueryValidator), schemaHooks.resolveQuery(prihodQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(prihodDataValidator), schemaHooks.resolveData(prihodDataResolver)],
      patch: [schemaHooks.validateData(prihodPatchValidator), schemaHooks.resolveData(prihodPatchResolver)],
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
