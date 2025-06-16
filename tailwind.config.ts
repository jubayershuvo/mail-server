
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // required for next-themes
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
