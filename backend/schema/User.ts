import { list } from '@keystone-6/core';
import { integer, text, password, timestamp, relationship, checkbox } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const User = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    password: password({ validation: { isRequired: true } }),
    phone: text(),
    premiun_sucription: checkbox({ defaultValue: true }),
    creation_date: timestamp({ defaultValue: { kind: 'now' } }),
    end_suscription_date: timestamp(),
  },
});
