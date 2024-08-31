import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      md1: { max: '1240px' },
      md2: { max: '992.98px' },
      md3: { max: '767.98px' },
      md4: { max: '500px' }
    },
    extend: {}
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.input': {
          appearance: 'none',
          outline: 'none',
          display: 'block',
          height: 'auto',
          width: '100%',
          padding: '5px 0',
          borderBottom: '1px solid #eaeaea'
        },

        '.btn': {
          padding: '10px 20px',
          color: '#fff',
          background: '#22c55e',
          borderRadius: '4px',
          transition: 'all 0.2s ease-in-out 0s',

          '&:hover': {
            background: '#16A34A'
          }
        }
      })
    })
  ]
} satisfies Config
