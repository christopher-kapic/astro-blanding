# Astro Blanding - a landing page for businesses

Astro Blanding is the template with which I begin for my clients' websites.

## Get up and running (basics, required)
- Handle contact form in `src/pages/api/contact.ts`.
  - One way you can do this is with Slack:
  ```typescript
  import queryStringToJSON from "@utils/QueryStringtoJSON"; // This should be built in to JavaScript, but it is not.
  import { url } from "@utils/GetURL";

  export async function post({request}: {request: Request}) {
    const body = queryStringToJSON(await request.text())
    await fetch(import.meta.env.SLACK_NOTIFICATION_URL, {
      method: "POST",
      body: JSON.stringify({
        text: `${body.email} just requested a consultation for a website.\n${body.message.replace("+", " ")}`
      })
    })
    return Response.redirect(`${url}success`, 307) // Note that this requires that you create a form success `/success` route.
  }
  ```
- Update information config in `src/config.ts`
- Deploy to Netlify (using NetlifyCMS) or another provider (you have to install your provider, _even Netlify_).
  - This requires that you add [Netlify](https://docs.astro.build/en/guides/integrations-guide/netlify/)
  `npx astro add netlify`

## Features

### Icons by [feathericons](https://feathericons.com/)

To use an icon from Feather Icons, I have created a svelte component. It does not require any client-side JavaScript, so a `client:*` directive is not required. Furthermore, it does not use a CDN or an extra NPM package 🤠

Example:
```astro
---
import Icon from '@components/Icon.svelte';
---

<ExampleComponent>
  <Icon size={18} icon="github"/>
</ExampleComponent>
```

### Contact form

Figuring out a contact form is annoying, so I have one preconfigured. You only need to handle what happens once the form is submitted. This is done in `src/pages/api/contact.ts`.