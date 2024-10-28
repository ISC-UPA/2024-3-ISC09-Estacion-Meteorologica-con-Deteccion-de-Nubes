import { config, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { integer, text, timestamp } from '@keystone-6/core/fields';
import { User } from './schema/User';
import { PhotoSky } from './schema/PhotoSky';
import { WeatheReading } from './schema/WeatheReading';
import { AnalysisPhoto } from './schema/AnalysisPhoto';
import { authentication } from './schema/Authentication';
import { APIPredicion } from './schema/APIPredicion';
import { azureADIntegration } from './schema/AzureADIntegration';

export default config({
  db: {
    provider: 'sqlite',
    url: 'file:./db/cloudyDB.db',
  },
  lists: {
    User,
    PhotoSky,
    WeatheReading,
    AnalysisPhoto,
    APIPredicion,
    authentication,
    azureADIntegration
  },
});