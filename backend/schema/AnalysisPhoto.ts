import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const AnalysisPhoto = list({
  access: allowAll,
  fields: {
    skyphoto_id : relationship({ ref: 'PhotoSky', many: false }),
    sky_type: text({ validation: { isRequired: true } }),
    probability_rain: text({ validation: { isRequired: true } }),
  },
});
