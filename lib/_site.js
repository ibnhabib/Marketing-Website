// Central business details used for SEO structured data and contact CTAs.
// Update here once and every page picks it up.
const site = {
  name: 'Pakistan Logistics',
  url: 'https://www.pakistanlogistics.com',
  logo: 'https://www.pakistanlogistics.com/favicon.ico',
  email: 'contact@pakistanlogistics.com',
  // Primary number used for the floating Call / WhatsApp buttons
  phone: '+971504948135',
  whatsapp: '971504948135',
  whatsappMessage:
    'Hi Pakistan Logistics, I would like a cargo quote to Pakistan.',
  phones: ['+971504948135', '+971585847087', '+971585817087', '+971554948975'],
  locations: [
    {
      name: 'Pakistan Logistics - Dubai',
      streetAddress: 'Jebel Ali Industrial',
      addressLocality: 'Dubai',
      addressCountry: 'AE'
    },
    {
      name: 'Pakistan Logistics - Abu Dhabi',
      streetAddress: 'Musaffah',
      addressLocality: 'Abu Dhabi',
      addressCountry: 'AE'
    }
  ],
  areaServed: [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'United Arab Emirates',
    'Pakistan'
  ],
  social: {
    facebook: 'https://www.facebook.com/pakistancargouae',
    instagram: 'https://www.instagram.com/pakistanicargo',
    linkedin: 'https://www.linkedin.com/company/pakistancargo',
    twitter: 'https://twitter.com/Pakistani_cargo'
  }
}

const whatsappUrl = (message = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`

// Push a lead event to Google Tag Manager (set up a GTM trigger on `event`).
const trackLead = (channel, location) => {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'lead_click',
    lead_channel: channel,
    lead_location: location,
    page_path: window.location.pathname
  })
}

export { site, whatsappUrl, trackLead }
