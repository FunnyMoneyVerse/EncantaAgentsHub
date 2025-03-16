# Placeholder Links Guide

This document provides information about all placeholder links used in the Encanta project and instructions for updating them.

## Social Media Links

The following social media links are used in the Footer component:

| Platform | Current Placeholder | File Location |
|----------|---------------------|---------------|
| Twitter | https://twitter.com/encantaAI | `apps/web/src/components/marketing/Footer.tsx` |
| LinkedIn | https://linkedin.com/company/encanta | `apps/web/src/components/marketing/Footer.tsx` |
| Facebook | https://facebook.com/encantaAI | `apps/web/src/components/marketing/Footer.tsx` |
| Instagram | https://instagram.com/encantaAI | `apps/web/src/components/marketing/Footer.tsx` |

### How to Update

1. Create accounts on the respective platforms if they don't exist
2. Update the URLs in `apps/web/src/components/marketing/Footer.tsx`
3. Search for the placeholder URLs throughout the codebase to ensure all instances are updated

## Booking/Calendar Links

| Purpose | Current Placeholder | File Location |
|---------|---------------------|---------------|
| Demo Booking | https://calendly.com/encanta/demo | `apps/web/src/app/(marketing)/contact/page.tsx` |

### How to Update

1. Create a Calendly account (or alternative scheduling service)
2. Set up a meeting type for demos
3. Replace the URL in the specified file

## Email Addresses

| Purpose | Current Placeholder | File Location |
|---------|---------------------|---------------|
| General Contact | hello@encanta.io | `apps/web/src/app/(marketing)/contact/page.tsx` |
| Support | support@encanta.io | `apps/web/src/app/(marketing)/contact/page.tsx` |

### How to Update

1. Set up email accounts for these addresses
2. Update the addresses in the specified file
3. Search for these email addresses throughout the codebase to ensure all instances are updated

## Phone Number

| Purpose | Current Placeholder | File Location |
|---------|---------------------|---------------|
| Office Phone | +44 (0) 20 1234 5678 | `apps/web/src/app/(marketing)/contact/page.tsx` |

### How to Update

1. Replace with the actual business phone number in the specified file

## Office Address

| Purpose | Current Placeholder | File Location |
|---------|---------------------|---------------|
| Office Address | 123 Innovation Street, London, EC1A 1BB, United Kingdom | `apps/web/src/app/(marketing)/contact/page.tsx` |

### How to Update

1. Replace with the actual business address in the specified file

## Legal Pages

The following pages are linked in the Footer but don't have content yet:

| Page | Current Status | URL |
|------|---------------|-----|
| Terms of Service | Not implemented | `/terms` |
| Privacy Policy | Not implemented | `/privacy` |
| Cookie Policy | Not implemented | `/cookies` |

### How to Implement

1. Create the necessary pages in `apps/web/src/app/(marketing)/[page-name]/page.tsx`
2. Add appropriate legal content
3. Ensure links in the Footer component remain accurate

## Other Placeholder Pages

The following pages are linked in the navigation but don't have content yet:

| Page | Current Status | URL |
|------|---------------|-----|
| Features | Not implemented | `/features` |
| Pricing | Not implemented | `/pricing` |
| Use Cases | Not implemented | `/use-cases` |
| Roadmap | Not implemented | `/roadmap` |
| Blog | Not implemented | `/blog` |
| Careers | Not implemented | `/careers` |
| Partners | Not implemented | `/partners` |

### How to Implement

1. Create the necessary pages in `apps/web/src/app/(marketing)/[page-name]/page.tsx`
2. Add appropriate content
3. Ensure links in the Navbar and Footer components remain accurate 