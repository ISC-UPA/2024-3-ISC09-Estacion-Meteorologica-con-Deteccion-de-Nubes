import { list } from '@keystone-6/core';
import { text, timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const Device = list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      creation_date: timestamp({ defaultValue: { kind: 'now' } }),
    },
  });
  