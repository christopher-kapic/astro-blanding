export const config = {
  site: "https://kapicsoftware.com",
  contact: {
    email: "christopher@kapicmedia.com",
    socials: {
      facebook: undefined,
      twitter: "https://twitter.com/kapicode",
      instagram: undefined,
      github: "https://github.com/christopher-kapic",
      linkedin: "https://linkedin.com/in/christopher-kapic",
    },
    phone: "(555) 555-5555", // string
    address: {
      street: "1234 Fake St",
      city: "Green Bay",
      state: "WI", // abbreviation
      zip: "54173",
    },
  },
  navbarLinks: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ],
  footerLinks: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ],
  imageOptimization: {
    cache: {
      image: {
        sMaxAge: 86400,
        maxAge: 86400,
      },
      preview: {
        sMaxAge: 86400,
        maxAge: 86400
      },
      og: {
        sMaxAge: 86400,
        maxAge: 86400
      }
    }
  }
};
