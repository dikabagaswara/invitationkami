export const appConfig = {
  name: process.env.APP_NAME ?? 'InvitationKami',
  tagline: process.env.APP_TAGLINE ?? 'Undangan Digital Modern',
  url: process.env.APP_URL ?? 'http://localhost:3000',
  logo: process.env.APP_LOGO ?? '/images/logo.svg',
  favicon: process.env.APP_FAVICON ?? '/favicon.ico',
} as const
