import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import * as Sentry from '@sentry/angular';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();

    Sentry.init({
        dsn: '',
        integrations: [
            // new BrowserTracing({
            //   tracingOrigins: ["localhost", "https://yourserver.io/api"],
            //   routingInstrumentation: Sentry.routingInstrumentation,
            // }),
        ],
        tracesSampleRate: 1.0,
    });
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
