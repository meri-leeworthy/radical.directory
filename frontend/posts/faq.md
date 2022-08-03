---
title: FAQ
author: Radical Directory
---

### 🌱 What is Radical Directory?

We're trying to make a public online space for left grassroots activists. We
want to start by creating a directory of radical collectives, and a calendar of
actions and events.

By creating a media platform, we want to help organisers make their work more
accessible to those outside of our social bubbles. As we work towards community
ownership and control, the platform can become a creative tool where we can
share radical analysis and strategy on our own terms, not those dictated by
social media giants.

Read more in this open
letter: [Proposal for a Radical Directory](https://radical.directory/post/open-letter).

### 👀 Are you trying to create a whole new Facebook/Instagram/Twitter?

Radical Directory is not a *social media *platform, but a *participatory
media *platform for grassroots activists. We don't aim to create a platform for
sharing personal life updates with your social network, for keeping up with your
friend's birthdays or for entertainment. Groups of friends looking to escape the
Facebook monopoly might be interested
in [this guide to running your own social media server](https://runyourown.social/) using
software like [Mastodon](https://joinmastodon.org/).

Radical Directory is focused on sharing and collating information specifically
relating to grassroots organising. Thus, Radical Directory will be purpose-built
with grassroots groups as the basic building block of our community, and their
needs will be prioritised in its development.

### ⚠️ Won't this platform just be a way for nazis and police to attack us?

Radical Directory is (at least at this stage) envisioned as a public platform
for public information and updates about grassroots organising. We want to
support organisers to make that information more widely accessible, because we
believe that the work that we do is both critically important and chronically
under-resourced. Grassroots groups need to model their efforts and share their
learnings in order to skill up new organisers, to reach people who can support
their work in solidarity, and ultimately to build power.

However, organisers who radically challenge existing power structures have many
enemies who seek to undermine, exploit and attack us. While we want to make
information about grassroots activism more accessible to allies and potential
comrades, we can't do that without also making it more accessible to cops and
far-right figures. This has the potential to enable or embolden increased
criminal prosecution, targeted police surveillance, doxxing, threats and
violence against individuals and groups.

These threats are not new, but as we explore new collective approaches to
communications, we also need new collective solutions to combat fascist and
State repression so we can continue to do liberatory work. In a new media
context, we need a rigorous security analysis, so that we can better understand
the specific threats posed to us, and a consent-based platform design, so if
people decide to share identifying information on Radical Directory (as many
activists do on other platforms) they can make those choices in a free and
informed way.

Our starting point for an analysis of the state of online security, privacy and
surveillance, particularly with regards to Facebook, can be found
here: [Surveillance](https://radical.directory/post/surveillance).

### 👩🏾‍🦯 How will it be made accessible?

A number one concern in the development of the platform is that the content is
accessible for people of all abilities following best practices as advised by
the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) and
Disability advocates. A big part of this is in predictably
following [WAI-ARIA](https://www.w3.org/TR/wai-aria-practices/#aria_ex) user
interface design patterns, but we want to go deeper.

We can improve on (for example) Instagram's accessibility by insisting that all
text content is delivered as screen-reader friendly semantic HTML, and mandating
image descriptions for all images (and captions for audio and video) before they
are published. We won't include unnecessary animations (which can cause nausea
for some users) and we will use fonts and colour ratios that are friendly to
people with low vision.

Another priority is making the platform trauma-informed, because the oppressive
forces that activists respond to are often traumatising. Trauma informed design
must be an ongoing and participatory process, but could include masking
potentially triggering content with click-through content warnings, as well as
custom user profile settings for hiding or masking specific topics.

Accessibility is one of our core values as a collective, and for us, acting in
line with that value requires a constant process of seeking out and deeply
valuing lived experience, reimbursing these insights in whatever way is
possible, and integrating them into the continuous development of a more
accessible design.

### 👥 Who is behind this project?

In early 2020, a collective of grassroots activists from the lands of the
Wurundjeri-woi wurrung and Boon wurrung peoples of the Kulin nations (so-called
Melbourne, Australia) formed and started work towards creating Radical
Directory. We each bring our own **experience in grassroots organising** towards
anti-extractivism, prison abolition, First Nations solidarity, direct action,
mutual aid, citizen journalism, queer liberation, housing justice and more.

### 🙋🏽 Can I get involved?

Yes! We invite anyone who is interested in the project
to [jump on our Discord server](https://discord.gg/fRURFnac4H) and introduce
yourself. At the moment, that's the best place to have discussions about this
project, give feedback or suggestions, or join our collective. Our collective is
open to anyone to join - some of the things you could help us with include:

**Community organising **as we work towards building relationships and trust
with the many kinds of left activists in so-called Australia and beyond

**Media and writing **to help us get the word out and start conversations about
this project, and to help build our organisational knowledge as we work out best
practices for communication in public

**Governance **to guide us as we refine our organisational structure, decision
making processes, and rules/policies that enable us to enact our values -
particularly in decentralising power

**Fundraising **as we try to figure out how to make an ambitious project like
this both sustainable and autonomous

**Co-design **as we work to grow community knowledge about design best
practices, to unlearn our assumptions about what works, and to open space for
collective input

**Legal **advice as we try to figure out the legal structure and guidelines that
will best keep us safe from State repression, defamation suits, or whatever else
might come our way

**Software development **particularly on the frontend as we try and steam ahead
to a functioning prototype. But as the project (hopefully) grows in complexity
we will also need help with the backend, deployment/operations, automated
testing and security oversight

**Testing **as we try and make sure the platform works on all devices and for
users of all abilities

No qualifications are required to support us in any of these areas, you
certainly don't have to have a fixed role in the collective and we are always
really happy to skillshare as much as we can.

### 👻 What will happen to my data on the platform? 

Like Instagram, Twitter or essentially any web platform, all data will be stored
on a central database. This is still essentially the only way to make a fast,
reliable web app (though within the next decade, it's likely that decentralised
databases and blockchain-based identity will become more feasible for building
with).

The data is accessed via an API. Some of the data (e.g. a public page about an
activist group) will be publically accessible, while other data (e.g. a draft
post you're writing) will be protected by access control rules. The specific
details of those rules are in progress, but as they emerge, we commit to
communicating what they are at each step of entering data and being as
transparent as possible,
following [Consentful Tech](https://www.consentfultech.io/) guidelines as much
as we can. The platform will always be open source so technologists can make
sure we're doing what we say we are.

We will never sell any data to anyone.

### 💾 What sort of technology will you be using?

We are in the process of developing a fast, modern, secure web app built on top
of open source software and frameworks, using
a [JAMStack](https://jamstack.wtf/) architecture. The backend app is currently
cloud hosted on [DigitalOcean](https://www.digitalocean.com/) App Platform with
a managed [PostgreSQL](https://www.postgresql.org/) database.
The [backend](https://edit.radical.directory/) is being built
using [Keystone 6](https://keystonejs.com/), which
uses [Prisma](https://www.prisma.io/) to interface with the
database, [Next.js](https://nextjs.org/) to build
a [React](https://reactjs.org/)-based Admin UI
(using [Slate](https://www.slatejs.org/) to power its Rich Text Editor),
and [Apollo](https://www.apollographql.com/) Server to serve
a [GraphQL](https://graphql.org/) API, all packed up and delivered to the
internet on an [Express](https://expressjs.com/) server. The API is consumed by
a [frontend](https://radical.directory/) which is currently hosted
on [Vercel](https://vercel.com/), uses Next.js, Apollo Client to fetch data
and [Tailwind](https://tailwindcss.com/) for styling. Everything is written
in [Typescript](https://www.typescriptlang.org/), everything is open source, and
we think these are the best choices available for building Radical Directory.

Check out our [Github repo](https://github.com/radicaldirectory) for more info.
