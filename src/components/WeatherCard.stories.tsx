// src/components/WeatherCard/WeatherCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import WeatherCard from './WeatherCard';

const meta: Meta<typeof WeatherCard> = {
  title: 'Components/WeatherCard',  // This determines location in sidebar
  component: WeatherCard,
};

export default meta;

// This creates your first story
export const Default: Story = {
  args: {
    temperature: 24,
    location: 'Tokyo',
  }
};
