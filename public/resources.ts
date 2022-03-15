export type Resource = {
  url: URL
  title: string
  desc: string
  categories: string[]
}

export const resources: Resource[] = [
  {
    url: new URL('https://github.com/matthewp/ocean'),
    title: 'Ocean',
    desc: 'Web component server-side rendering',
    categories: ['Web Components', 'SSR', 'GitHub']
  },
  {
    url: new URL('https://preactjs.com/guide/v10/progressive-web-apps'),
    title: 'Progressive Web Apps Guide for Preact',
    desc:
      'Preact is an excellent choice for Progressive Web Apps that wish to load and become interactive quickly. Preact CLI codifies this into an instant build tool that gives you a PWA with a 100 Lighthouse score right out of the box.',
    categories: ['React']
  },
  {
    url: new URL('https://create-react-app.dev/docs/making-a-progressive-web-app/'),
    title: 'Making a Progressive Web App with Create React App',
    desc:
      "If you start a new project using one of the PWA custom templates, you'll get a src/service-worker.js file that serves as a good starting point for an offline-first service worker.",
    categories: ['React', 'Project Templates']
  },
  {
    url: new URL('https://wmr.dev'),
    title: 'WMR',
    desc: 'Modern web app development without the wait',
    categories: ['Preact', 'SSR', 'Project Templates']
  },
  {
    url: new URL('https://lit.dev'),
    title: 'Lit',
    desc: 'Simple. Fast. Web Components.',
    categories: ['Web Components']
  },
  {
    url: new URL('https://github.com/lit/lit/tree/main/packages/labs/ssr#lit-labsssr'),
    title: '@litlabs/ssr',
    desc: 'A package for server-side rendering Lit templates and components',
    categories: ['SSR', 'Web Components', 'GitHub']
  },
  {
    url: new URL('https://frontendchecklist.io'),
    title: 'The Front-End Checklist',
    desc:
      'The Front-End Checklist Application is perfect for modern websites and meticulous developers!',
    categories: ['Checklist']
  },
  {
    url: new URL('https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps'),
    title: 'Progressive web apps (PWAs) on MDN',
    desc: 'PWA how-to guides and other documentation on developer.mozilla.org.',
    categories: ['Getting Started', 'Highlights']
  },
  {
    url: new URL('https://web.dev/progressive-web-apps/'),
    title: 'Progressive Web Apps on web.dev',
    desc:
      "You'll learn what makes a Progressive Web App special, how they can affect your business, and how to build them.",
    categories: ['Getting Started', 'Highlights']
  },
  {
    url: new URL('https://developers.google.com/web/updates/2015/11/app-shell'),
    title: 'Instant Loading Web Apps with an Application Shell Architecture',
    desc: 'A great, if slightly old, tutorial on the app shell architecture.',
    categories: ['Architecture', ':old']
  },
  {
    url: new URL('https://developers.google.com/web/tools/workbox'),
    title: 'Workbox',
    desc:
      'Workbox is a set of libraries that can power a production-ready service worker for your Progressive Web App.',
    categories: ['Service Workers']
  },
  {
    url: new URL(
      'https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/'
    ),
    title: 'A Beginner’s Guide To Progressive Web Apps from Smashing Magazine',
    desc:
      'This articles look into recent advancements, as of 2015, in the browser and the opportunities we, as developers, have to build a new generation of web apps. There is still a lot of valuable information here.',
    categories: ['Getting Started', ':old']
  },
  {
    url: new URL('https://webaccessibilitychecklist.com'),
    title: 'Web Accessibility Checklist',
    desc: 'A checklist for creating accessible websites and web applications.',
    categories: ['Checklist', 'Accessibility']
  },
  {
    url: new URL('https://www.pwastats.com'),
    title: 'PWA Stats',
    desc: 'A community-driven list of stats and news related to Progressive Web Apps by Cloud Four',
    categories: []
  },
  {
    url: new URL('https://blog.pusher.com/introduction-progressive-web-apps/'),
    title: 'Introduction to Progressive Web Applications by Pusher',
    desc: 'A high-level overview of PWAs from 2018.',
    categories: [':old']
  },
  {
    url: new URL('https://www.udacity.com/course/intro-to-progressive-web-apps--ud811'),
    title: 'Intro to Progressive Web Apps by Google on Udacity',
    desc:
      'In this course you’ll get started working on your very first Progressive Web App (PWA) - a web app that can take advantage of many of the features native applications have enjoyed.',
    categories: ['Getting Started', 'Courses']
  },
  {
    url: new URL(
      'https://www.twilio.com/blog/2016/02/web-powered-sms-inbox-with-service-worker-push-notifications.html'
    ),
    title: 'Web Powered SMS Inbox with Service Worker: Push Notifications by Twilio',
    desc:
      'Recaps building a web application that I can use as a fully featured SMS messaging application for a Twilio number, from 2016.',
    categories: ['Service Workers', ':old']
  },
  {
    url: new URL(
      'https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers'
    ),
    title: 'Using Service Workers on MDN',
    desc:
      'This article provides information on getting started with service workers, including basic architecture, registering a service worker, the install and activation process for a new service worker, updating your service worker, cache control and custom responses, all in the context of a simple app with offline functionality.',
    categories: ['Service Workers', 'Offline']
  },
  {
    url: new URL('https://pocketjavascript.com/blog/2015/11/23/introducing-pokedex-org'),
    title: 'Introducing Pokedex.org: a progressive webapp for Pokémon fans',
    desc: 'A case study about building an offline-first, installable PWA from 2015.',
    categories: [':old', 'Offline']
  },
  {
    url: new URL('https://www.speedcurve.com/blog/pwa-performance/'),
    title: 'Validating PWA Performs while Offline with WebPageTest',
    desc: 'An example script for WebPageTest to verify a PWA loads while offline.',
    categories: ['Offline']
  },
  {
    url: new URL('https://github.com/koddr/a2hs.js'),
    title: 'a2hs.js on GitHub',
    desc: 'Add progressive web application (PWA) to Home Screen on iOS',
    categories: ['Installation']
  },
  {
    url: new URL('https://github.com/hemanth/awesome-pwa'),
    title: 'awesome-pwa on GitHub',
    desc: 'Useful resources for creating Progressive Web Apps',
    categories: []
  },
  {
    url: new URL('https://github.com/TalAter/UpUp'),
    title: 'UpUp - Kickstarting the Offline First Revolution – on GitHub',
    desc:
      "UpUp is a tiny JavaScript library that makes sure your users can always access your site's content, even when they're on a plane, in an elevator, or 20,000 leagues under the sea.",
    categories: ['Offline']
  },
  {
    url: new URL('https://github.com/ali-master/pwa-badge'),
    title: 'PWA Badge on GitHub',
    desc:
      'Like Native Apps, The PWA Badge API allows installed web apps to set an application-wide badge on the app icon.',
    categories: []
  },
  {
    url: new URL('https://simplepwa.com'),
    title: 'Simple Progressive Web App (PWA) Template',
    desc:
      'Simple PWA is a Progressive Web App template that provides the minimum file structure needed to create a PWA—a reliable and installable web application.',
    categories: ['Project Templates', 'Offline']
  },
  {
    url: new URL('https://developers.google.com/codelabs/pwa-training/pwa03--going-offline#0'),
    title: 'Progressive Web Apps: Going Offline',
    desc: 'This is the first in a series of companion codelabs for a Progressive Web App workshop.',
    categories: ['Courses']
  },
  {
    url: new URL('https://www.pluralsight.com/courses/web-apps-progressive-getting-started'),
    title: 'Getting Started with Progressive Web Apps on Pluralsight',
    desc:
      "A for-pay course to create a 'Car Deals' website using techniques and technologies to transform it from a simple web page into a progressive web app.",
    categories: ['Courses']
  },
  {
    url: new URL('https://www.pluralsight.com/courses/progressive-web-app-fundamentals'),
    title: 'Progressive Web App Fundamentals on Pluralsight',
    desc: 'A for-pay course to learn to supercharge web apps so they can compete with native apps',
    categories: ['Courses']
  },
  {
    url: new URL('https://www.udemy.com/course/progressive-web-apps/'),
    title: 'Progressive Web Apps: The Concise PWA Masterclass on Udemy',
    desc:
      'Everything you need to build Progressive Web Apps from Scratch, or upgrade your existing Web Apps to PWAs.',
    categories: ['Courses']
  },
  {
    url: new URL('https://www.udemy.com/course/progressive-web-app-pwa-the-complete-guide/'),
    title: 'Progressive Web Apps (PWA) - The Complete Guide',
    desc:
      'Build a Progressive Web App (PWA) that feels like an iOS & Android App, using Device Camera, Push Notifications and more',
    categories: ['Courses']
  }
]

export const slugsToCategory: Map<string, string> = new Map()
export const categoryToSlugs: Map<string, string> = new Map()

for (const res of resources) {
  for (const col of res.categories) {
    if (col.startsWith(':')) { continue }

    const slug = col.toLowerCase().replace(/\s+/, '-')
    slugsToCategory.set(slug, col)
    categoryToSlugs.set(col, slug)
  }
}

export const categories = Array.from(categoryToSlugs.keys()).sort()

// TODO: is this 2018 course still good? https://www.udemy.com/course/learn-to-build-progressive-web-apps-using-javascript/
