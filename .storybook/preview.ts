import type { Preview } from '@storybook/react-vite'
import '@/styles/index.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Welcome', 'Components'],
      },
    },
  },
}

export default preview
