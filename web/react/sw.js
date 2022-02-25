import {CacheFirst, StaleWhileRevalidate} from "workbox-strategies";
import {precacheAndRoute, cleanupOutdatedCaches} from "workbox-precaching";
import {registerRoute} from "workbox-routing";
import {CacheableResponsePlugin} from "workbox-cacheable-response";
import {BackgroundSyncPlugin} from "workbox-background-sync";
import {ExpirationPlugin} from "workbox-expiration";
import {setCacheNameDetails} from "workbox-core";

setCacheNameDetails({prefix: "__APP_NAME__", suffix: "__APP_VERSION__"});
self.__WB_DISABLE_DEV_LOGS = true;
precacheAndRoute(self.__WB_MANIFEST || []);
cleanupOutdatedCaches();

registerRoute(
	({request}) => request.destination === "script" ||
request.destination === "style",
	new StaleWhileRevalidate({
		plugins: [
			new BackgroundSyncPlugin("script-queue", {}),
		],
	}));

registerRoute(
	({url}) => url.origin === "https://fonts.googleapis.com",
	new StaleWhileRevalidate({
		cacheName: "google-fonts-stylesheets",
	}),
);

registerRoute(
	({url}) => url.origin === "https://fonts.gstatic.com",
	new CacheFirst({
		cacheName: "google-fonts-webfonts",
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			new ExpirationPlugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30,
			}),
		],
	}),
);