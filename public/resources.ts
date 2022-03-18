export type Resource = {
  url: URL
  title: string
  desc: string
  categories: string[]
  color?: string
}

export const resources: Resource[] = [
  {
    url: new URL('https://github.com/matthewp/ocean'),
    title: 'Ocean',
    desc:
      'Web component HTML rendering that runs on the server, in a browser worker, and includes hydration.',
    categories: ['Web Components', 'SSR']
  },
  {
    url: new URL('https://preactjs.com/guide/v10/progressive-web-apps'),
    title: 'Progressive Web Apps Guide for Preact',
    desc:
      '“Preact is an excellent choice for Progressive Web Apps that wish to load and become interactive quickly. Preact CLI codifies this into an instant build tool that gives you a PWA with a 100 Lighthouse score right out of the box.”',
    categories: ['Preact']
  },
  {
    url: new URL('https://create-react-app.dev/docs/making-a-progressive-web-app/'),
    title: 'Making a Progressive Web App with Create React App',
    desc:
      "“If you start a new project using one of the PWA custom templates, you'll get a src/service-worker.js file that serves as a good starting point for an offline-first service worker.”",
    categories: ['React', 'Project Templates']
  },
  {
    url: new URL('https://wmr.dev'),
    title: 'WMR',
    desc: 'An all-in-one development tool for building PWAs with Preact.',
    categories: ['Preact', 'SSR', 'Project Templates']
  },
  {
    url: new URL('https://lit.dev'),
    title: 'Lit',
    desc: 'A package for building “Simple. Fast. Web Components.”',
    categories: ['Web Components']
  },
  {
    url: new URL('https://github.com/lit/lit/tree/main/packages/labs/ssr#lit-labsssr'),
    title: '@litlabs/ssr',
    desc: '“A package for server-side rendering Lit templates and components.”',
    categories: ['SSR', 'Web Components']
  },
  {
    url: new URL('https://frontendchecklist.io'),
    title: 'The Front-End Checklist',
    desc:
      '“The Front-End Checklist Application is perfect for modern websites and meticulous developers!”',
    categories: ['Checklists']
  },
  {
    url: new URL('https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Introduction'),
    title: 'Introduction to progressive web apps',
    desc:
      '“This article provides an introduction to Progressive Web Apps (PWAs), discussing what they are and the advantages they offer over regular web apps.”',
    categories: ['Getting Started', 'Highlights']
  },
  {
    url: new URL('https://web.dev/progressive-web-apps/'),
    title: 'Progressive Web Apps',
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
      '“Workbox is a set of libraries that can power a production-ready service worker for your Progressive Web App.”',
    categories: ['Service Workers']
  },
  {
    url: new URL(
      'https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/'
    ),
    title: 'A Beginner’s Guide To Progressive Web Apps from Smashing Magazine',
    desc:
      'This articles look into the new, as of 2015, opportunities we have to build a new generation of web apps. There is still a lot of valuable information here.',
    categories: ['Getting Started', ':old']
  },
  {
    url: new URL('https://webaccessibilitychecklist.com'),
    title: 'Web Accessibility Checklist',
    desc: '“A checklist for creating accessible websites and web applications.”',
    categories: ['Checklists', 'Accessibility']
  },
  {
    url: new URL('https://www.pwastats.com'),
    title: 'PWA Stats',
    desc:
      '“A community-driven list of stats and news related to Progressive Web Apps by Cloud Four.”',
    categories: ['Advocacy']
  },
  {
    url: new URL('https://blog.pusher.com/introduction-progressive-web-apps/'),
    title: 'Introduction to Progressive Web Applications',
    desc: 'A high-level overview of PWAs from Pusher, written in 2018.',
    categories: ['Getting Started', ':old']
  },
  {
    url: new URL('https://www.udacity.com/course/intro-to-progressive-web-apps--ud811'),
    title: 'Intro to Progressive Web Apps Course by Google',
    desc:
      '“In this course you’ll get started working on your very first Progressive Web App (PWA) - a web app that can take advantage of many of the features native applications have enjoyed.”',
    categories: ['Courses: Free']
  },
  {
    url: new URL(
      'https://www.twilio.com/blog/2016/02/web-powered-sms-inbox-with-service-worker-push-notifications.html'
    ),
    title: 'Web Powered SMS Inbox with Service Worker: Push Notifications',
    desc:
      'Recaps building a web application: a fully featured SMS messaging application for a Twilio number, from 2016.',
    categories: ['Service Workers', ':old']
  },
  {
    url: new URL(
      'https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers'
    ),
    title: 'Using Service Workers',
    desc:
      '“This article provides information on getting started with service workers, including basic architecture, registering a service worker, the install and activation process for a new service worker, updating your service worker, cache control and custom responses, all in the context of a simple app with offline functionality.”',
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
    title: 'Checking PWA Performance with WebPageTest',
    desc: 'An example script for WebPageTest to verify a PWA loads while offline.',
    categories: ['Offline']
  },
  {
    url: new URL('https://github.com/koddr/a2hs.js'),
    title: 'a2hs.js',
    desc: 'A package to help add PWAs to the Home Screen on iOS.',
    categories: ['Installation']
  },
  {
    url: new URL('https://github.com/hemanth/awesome-pwa'),
    title: 'awesome-pwa',
    desc: '”Useful resources for creating Progressive Web Apps.”',
    categories: ['Advocacy']
  },
  {
    url: new URL('https://github.com/TalAter/UpUp'),
    title: 'UpUp - Kickstarting the Offline First Revolution',
    desc:
      "“UpUp is a tiny JavaScript library that makes sure your users can always access your site's content, even when they're on a plane, in an elevator, or 20,000 leagues under the sea.”",
    categories: ['Offline']
  },
  {
    url: new URL('https://github.com/ali-master/pwa-badge'),
    title: 'PWA Badge',
    desc:
      '“Like Native Apps, The PWA Badge API allows installed web apps to set an application-wide badge on the app icon.”',
    categories: ['Installation']
  },
  {
    url: new URL('https://simplepwa.com'),
    title: 'Simple Progressive Web App (PWA) Template',
    desc:
      '“Simple PWA is a Progressive Web App template that provides the minimum file structure needed to create a PWA—a reliable and installable web application.”',
    categories: ['Project Templates', 'Offline']
  },
  {
    url: new URL('https://developers.google.com/codelabs/pwa-training/pwa03--going-offline#0'),
    title: 'Progressive Web Apps: Going Offline',
    desc: 'This is the first in a series of companion codelabs for a Progressive Web App workshop.',
    categories: ['Courses: Free', 'Offline']
  },
  {
    url: new URL('https://www.pluralsight.com/courses/web-apps-progressive-getting-started'),
    title: 'Getting Started with Progressive Web Apps Course',
    desc:
      "A course to create a 'Car Deals' website using techniques and technologies to transform it from a simple web page into a progressive web app.",
    categories: ['Courses: Paid']
  },
  {
    url: new URL('https://www.pluralsight.com/courses/progressive-web-app-fundamentals'),
    title: 'Progressive Web App Fundamentals Course',
    desc: 'A course to learn to supercharge web apps so they can compete with native apps',
    categories: ['Courses: Paid']
  },
  {
    url: new URL('https://www.udemy.com/course/progressive-web-apps/'),
    title: 'Progressive Web Apps: The Concise PWA Masterclass Course',
    desc:
      '“Everything you need to build Progressive Web Apps from Scratch, or upgrade your existing Web Apps to PWAs.”',
    categories: ['Courses: Paid']
  },
  {
    url: new URL('https://www.udemy.com/course/progressive-web-app-pwa-the-complete-guide/'),
    title: 'Progressive Web Apps (PWA) - The Complete Guide',
    desc:
      '“Build a Progressive Web App (PWA) that feels like an iOS & Android App, using Device Camera, Push Notifications and more.”',
    categories: ['Courses: Paid']
  },
  {
    url: new URL('https://www.aaron-gustafson.com/notebook/pwa-qa/'),
    title: 'PWA Q&A by Aaron Gustafson',
    desc: 'A collection of questions and answers by Aaron which cover many topics related to PWAs.',
    categories: ['Highlights', 'Advocacy']
  },
  {
    url: new URL('https://web.dev/app-like-pwas/'),
    title: 'Make your PWA feel more like an app',
    desc: '“Make your Progressive Web App not feel like a website, but like a ‘real’ app”',
    categories: ['Offline', 'Installation', 'Highlights']
  },
  {
    url: new URL('https://progressier.com'),
    title: 'Progressier',
    desc:
      'An automated tool to add installation, push notifications, and offline caching to your existing web app.',
    categories: ['Paid', 'Automation']
  },
  {
    url: new URL(
      'https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/microsoft-store'
    ),
    title: 'Publish a Progressive Web App to the Microsoft Store',
    desc: "Microsoft's documentation for how to publish PWAs to their store",
    categories: ['Installation']
  },
  {
    url: new URL(
      'https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/'
    ),
    title: 'Get started with Progressive Web Apps',
    desc: "A list of how-to's for building PWAs in Edge by Microsoft",
    categories: ['Getting Started', 'Highlights']
  },
  {
    url: new URL('https://developer.chrome.com/docs/devtools/progressive-web-apps/'),
    title: 'Debug Progressive Web Apps',
    desc:
      '”Use the Application panel [in Chrome] to inspect, modify, and debug web app manifests, service workers, and service worker caches.”',
    categories: ['Debugging', ':old']
  },
  {
    url: new URL(
      'https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/progressive-web-apps/'
    ),
    title: 'Debug Progressive Web Apps (PWAs)',
    desc:
      '“Use the Application panel [in Edge] to inspect, modify, and debug web app manifests, service workers, and service worker caches.”',
    categories: ['Debugging']
  },
  {
    url: new URL('https://www.pluralsight.com/courses/debugging-progressive-web-apps'),
    title: 'Debugging Progressive Web Apps',
    desc:
      '“Learn to unleash the power of modern browser tools, techniques, and strategies to debug a progressive web application.”',
    categories: ['Courses: Paid', 'Debugging']
  },
  {
    url: new URL('https://www.davrous.com/2019/10/18/myth-busting-pwas-the-new-edge-edition/'),
    title: 'Myth Busting PWAs',
    desc: '“By busting 9 Myths on PWAs, we’ll see that PWAs are stronger than ever.”',
    categories: ['Advocacy']
  },
  {
    url: new URL('https://en.wikipedia.org/wiki/Progressive_web_application'),
    title: 'Progressive web application on Wikipedia',
    desc: 'The Wikipedia page for PWAs has a summary of their history and some of the related tech',
    categories: ['Getting Started']
  }
].sort((l, r) => {
  const lTitle = l.title.toLowerCase().replace(/^the\s*/, '').replace(/^@/, '')
  const rTitle = r.title.toLowerCase().replace(/^the\s*/, '').replace(/^@/, '')

  if (lTitle < rTitle) {
    return -1
  } else if (lTitle > rTitle) {
    return 1
  }
  return 0
})

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

export const categories = Array.from(categoryToSlugs.keys()).sort((a, b) => b.length - a.length)
