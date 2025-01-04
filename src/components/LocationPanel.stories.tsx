import type { Meta, StoryObj } from '@storybook/react';
import {LocationPanel} from './LocationPanel';

const meta: Meta<typeof LocationPanel> = {
  title: 'Components/LocationPanel',
  component: LocationPanel,
};

export default meta;

type Story = StoryObj<typeof LocationPanel>
// This creates your first story
export const Default: Story = {

};
