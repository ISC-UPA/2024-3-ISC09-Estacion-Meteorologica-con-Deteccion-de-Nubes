import { config, list } from '@keystone-6/core';

import cors from 'cors';
import { envconfig } from './envconfig';
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
        url: envconfig.DATABASE_URL || `file:./db/vivehub.db`,
      },
      server: {
        cors: {
          origin: [envconfig.FRONTEND_URL || `http://localhost:8081`],
          credentials: true,
        },
        port: envconfig.KEYSTONE_PORT ? parseInt( envconfig.KEYSTONE_PORT, 10) : 3000,
        extendExpressApp: (app) => {
          app.use(cors({
            origin: envconfig.FRONTEND_URL || `http://localhost:8081`,
            credentials: true,
          }));
        },
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