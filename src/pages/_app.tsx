import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
/**
 * This simple Next.js application structure in TypeScript serves as a foundation 
 * for building more complex applications. By understanding how to set up global 
 * styles and render components with props, you can create a robust and maintainable 
 * web application. Next.js, combined with TypeScript, provides a powerful toolkit 
 * for developers looking to build modern web applications efficiently.
 */


/**
 * Layout and App Structure:
 * 
 * Import Statements:
 * - The first line imports global CSS styles from a specified path.
 * - The second line imports the AppProps type from Next.js, which helps 
 *   in type-checking the props passed to the App component.
 * 
 * Functional Component:
 * - The App function takes Component and pageProps as props.
 * - It returns the Component with the spread pageProps, allowing each 
 *   page to receive its specific props.
 */
