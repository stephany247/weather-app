# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown 
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)



### Links

- Solution URL: [Github Repo](https://weather-app-nu-six-25.vercel.app/)
- Live Site URL: [Live Demo](https://weather-app-nu-six-25.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) - For type safety
- [Vite](https://vitejs.dev/) - Frontend build tool
- [Tailwind CSS](https://tailwindcss.com/) - For utility-first styling
- [Shadcn-ui](https://ui.shadcn.com/) - For accessible and reusable UI components
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) - For global state management
- [Vite Plugin PWA](https://vite-plugin-pwa.netlify.app/) - To enable Progressive Web App capabilities
- [Next themes](https://github.com/pacocoursey/next-themes) - For theme switching
- [Lucide React](https://lucide.dev/) - For icons


### What I learned

Working on this project taught me a lot about structuring a React + TypeScript app efficiently and building features that feel polished and real-world ready.

Some of my major learnings include:

- Integrating APIs with TypeScript: Handling API responses safely using interfaces helped me understand how TypeScript improves predictability and reduces runtime errors.

- State management with Zustand: I learned how to manage global state cleanly without the complexity of Redux. Zustand’s simplicity made it easy to store and share weather data across components.

- Dynamic theming: I implemented automatic theme switching based on the time of day and allowed users to toggle manually. This helped me understand how to synchronize state with the system or custom logic.

- Progressive Web App setup with Vite: I learned how to register a service worker, configure caching, and handle offline states using the vite-plugin-pwa package.

- Responsive layouts with Tailwind CSS and shadcn/ui: Combining utility-first classes from Tailwind with prebuilt shadcn components gave me a solid understanding of component-driven design and accessibility.

- Data filtering for hourly forecasts: I learned how to extract just the next 24 hours of data dynamically from the API instead of relying on full timestamp conversions.

This project pushed me to think beyond just design and focus on performance, usability, and real-world functionality.

### Continued development

There are still a few areas I’d like to explore and refine after completing this project:

- Backend integration: I plan to connect this app to a custom backend in the future to store user preferences, search history, and location data.

- Improving PWA features: I’d like to enhance the offline experience by caching more weather data and displaying it when the user is disconnected, along with a “Last updated” timestamp.

- Animation and transitions: I want to make the app more interactive by adding smooth transitions and micro-animations using Framer Motion, especially during theme toggles and forecast updates.

- Accessibility improvements: I plan to ensure that all UI components from shadcn/ui follow proper ARIA labeling and keyboard navigation best practices.


### Useful resources

- [Open-Meteo API](https://open-meteo.com/en/docs) - The main weather data source used for fetching real-time and forecast information.
- [Vite Plugin PWA Documentation](https://vite-plugin-pwa.netlify.app/) - Helped me understand how to register a service worker and enable offline functionality.
- [Shadcn-UI Docs](https://ui.shadcn.com/docs) - Guided me through building reusable, accessible UI components quickly.
- [Tailwind CSS Docs](https://tailwindcss.com/) - My go-to reference for styling utilities and responsive design.
- [Frontend Mentor Community](https://www.frontendmentor.io/community) - Great for seeing how other developers approached similar challenges and finding inspiration.


## Author

- Frontend Mentor - [@stephany247](https://www.frontendmentor.io/profile/stephany247)
- Twitter - [@stephanyoguocha](https://www.twitter.com/stephanyoguocha)


## Acknowledgments

Huge thanks to [Frontend Mentor](https://www.frontendmentor.io/) for providing such a well-structured challenge that helped me sharpen my React and TypeScript skills.

I also want to appreciate the open-source community especially the developers behind Vite, shadcn/ui, Tailwind CSS, and Open-Meteo for creating tools that make modern web development so much more enjoyable and efficient.
