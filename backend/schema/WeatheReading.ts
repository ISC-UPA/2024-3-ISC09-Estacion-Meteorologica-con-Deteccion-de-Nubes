import { list } from '@keystone-6/core';
import { integer, float, timestamp, checkbox, relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const WeatheReading = list({
  access: allowAll,
  fields: {
    temperature: float({ validation: { isRequired: true } }),
    atmospheric_pressure: float(),
    humidity: float({ validation: { isRequired: true } }),
    api: checkbox({ defaultValue: false }),
    reading_date: timestamp({ defaultValue: { kind: 'now' } }),
    user_id: relationship({ ref: 'User', many: true }),
  },
});
