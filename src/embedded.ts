const assign = require('lodash.assign');
const cloneDeepWith = require('lodash.clonedeepwith');
const isPlainObject = require('lodash.isplainobject');

type EmbeddedData = {
  embedded?: {
    [index: string]: any;
  };
};

/**
 * Utility to resolve references that the Conduction APIs use to refer to embedded
 * data from related objects into one object.
 *
 * {
 *   "items": ["/api/item-1"],
 *   "embedded": {
 *     "items": [
 *       { "id": 1, "value": "Hello, world!" }
 *     ]
 *   }
 * }
 *
 * Becomes:
 *
 * {
 *   "items": [{ "id": 1, "value": "Hello, world!" }],
 *   "embedded": undefined
 * }
 */
export const resolveEmbedded = <T>(data: T & EmbeddedData): T =>
  cloneDeepWith(data, (value: any) => {
    return isPlainObject(value) && isPlainObject(value['embedded'])
      ? assign(Object.create(null), value, resolveEmbedded(value['embedded']), { embedded: undefined })
      : undefined;
  });
