import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const APIPredicion = list({
  access: allowAll,
  fields: {
    skyphoto_id: relationship({ ref: 'PhotoSky', many: false }),
    prediction_per_day: text({ validation: { isRequired: true } }),
    prediction_per_hour: text({ validation: { isRequired: true } }),
  },
});
