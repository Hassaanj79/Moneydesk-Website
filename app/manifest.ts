import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://moneydesk.co'
  
  return {
    name: 'MoneyDesk - Personal Finance Management',
    short_name: 'MoneyDesk',
    description: 'Take control of your money with MoneyDesk. Track expenses, manage budgets, handle loans, and achieve financial goals.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#00947c',
    icons: [
      {
        src: '/header-logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}

