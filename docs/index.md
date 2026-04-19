---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Cache Cleaner
  text: Browser Addon
  tagline: Easily clear selected cache items for the current site or whole browser with a single key press.
  image:
    src: /images/logo.svg
    alt: Cache Cleaner
  actions:
    - text: Get Started
      link: /guides/get-started
      theme: brand
    - text: Usage
      link: /guides/usage
      theme: alt
    - text: Support
      link: /support
      theme: alt

features:
  - title: Install and Setup
    details: View Install and Setup Guides
    link: /guides/get-started
  - title: Support
    details: Get Help with Anything
    link: /support
  - title: Source Code
    details: View Source Code on GitHub
    link: https://github.com/cssnr/cache-cleaner
---

<BrowserIcons
animation="animate__rotateIn  animate__slow"
:centered="true"
margin="40px 0 0 0"
size="64"
/>

<Contributors :contributors="$contributors" heading="Contributors" size="48" margin="36px 0 96px" />
