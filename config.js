import themes from "daisyui/src/theming/themes";

const config = {
  appName: "ClarkMart",
  appDescription:
    "One Stop Shop exclusively for Clark University Students and Alumni",
  domainName: "",
  crisp: {
    id: "",
    onlyShowOnRoutes: ["/"],
  },
  mailgun: {
    subdomain: "mg",
    fromNoReply: `ShipFast <noreply@mg.shipfa.st>`,
    fromAdmin: `Ayushman at ShipFast <marc@mg.shipfa.st>`,
    supportEmail: "marc@mg.shipfa.st",
    forwardRepliesTo: "marc.louvion@gmail.com",
  },
  colors: {
    theme: "light",
    main: themes["light"]["primary"],
  },
  auth: {
    loginUrl: "/signin",
    callbackUrl: "/dashboard",
  },
};

export default config;
