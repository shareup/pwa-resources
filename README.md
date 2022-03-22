# PWA Resources

A curated collection of resources for learning to build Progressive Web Apps 💪

> _Curated and maintained with ♥ by the folks at [Shareup][org]. **[We are hiring!][hiring]** Come build great things with us._

[org]: https://github.com/shareup
[hiring]: https://shareup.app/jobs/senior-web-engineer/

It has often been difficult for us to find up-to-date resources about PWAs. We wanted to collect the links that have helped us,or are in our #readlater lists, into one place. 

The standards and tech around PWAs has changed over the years, yet many of the resources we find reference stuff from 2015. Even still, some of the older resources are useful, so we've tried to label those as _"this resource might be a little out of date"_ when necessary.

## Can I suggest new resources?

Yes! Either create a [PR for `resources.ts`][rts] or send an email to [pwaresources@shareup.app](mailto:pwaresources@shareup.app?subject=New+resource+💪).

[rts]: https://github.com/shareup/pwa-resources/blob/main/public/resources.ts

## This is a PWA

We wanted to quickly build a little PWA with [wmr][] which [caches itself and works offline][offline], you can favorite resources and those are persisted into [IndexedDB][], and it can be [installed][] to your home screen 😎 

[wmr]: https://wmr.dev
[offline]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers
[IndexedDB]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[installed]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installable_PWAs

## What's the tech stack for this PWA?

* All our code is written in [TypeScript][] and vanilla CSS
* [wmr][] is our dev server and bundler
* [Preact][] and [preact-iso][] renders HTML both server-side and client-side, provides routing in both cases, and hydrates the interactive parts client-side
	* We are biased and only used [functional components][] + [hooks][]
* [idb][] is the fantastic library we are using to promisify IndexedDB access
* [css modules][] (included with wmr) helps us keep our css scoped
* [CSS custom properties][] are how we are trying to dynamically control style values
* A [vanilla service worker][] handles the caching and offline access

[TypeScript]: https://www.typescriptlang.org
[Preact]: https://preactjs.com
[preact-iso]: https://github.com/preactjs/wmr/tree/main/packages/preact-iso
[idb]: https://github.com/jakearchibald/idb
[css modules]: https://github.com/css-modules/css-modules
[CSS custom properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
[vanilla service worker]: https://github.com/shareup/pwa-resources/blob/main/public/service-worker.ts
[functional components]: https://preactjs.com/guide/v10/components#functional-components
[hooks]: https://preactjs.com/guide/v10/hooks

## The artwork is fantastic!

Yes, we agree! [Adam][] did a great job creating some really fun illustrations for the site 💪😎👏

[Adam]: https://dribbble.com/number1gun

## TODOs

- [ ] Communicate the entire bundle's asset URLs to the service worker to know we've fully cached everything from the first load
- [ ] Revisit <https://github.com/preactjs/wmr/tree/main/packages/sw-plugin> and document why it didn't work out