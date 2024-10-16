import { config, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text } from '@keystone-6/core/fields';

export default config({
  db: {
    provider: 'sqlite',
    url: 'file:./db/cloudyDB.db',
  },
  lists: {
    Pueblo: list({
      access: allowAll,
      fields: {
        nombredelrancho: text({ validation: { isRequired: true } }),
        correoncio: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
        callesota: text({ validation: { isRequired: true } }),
        numerote: text({ validation: { isRequired: true } }),
      },
    }),
  },
});