import { list } from '@keystone-6/core';
import { integer, text, password, timestamp, relationship, float } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const User = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    password: password({ validation: { isRequired: true } }),
    phone: text(),
    creation_date: timestamp({ defaultValue: { kind: 'now' } }),
  },
});
