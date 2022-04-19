import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AudioPandaComponent from './AudioPandaComponent';
import './StoryStyles.css';

export default {
  title: 'Example/AudioPandaComponent',
  component: AudioPandaComponent,
} as ComponentMeta<typeof AudioPandaComponent>;

const Template: ComponentStory<typeof AudioPandaComponent> = (args) => (
  <div className="rive-story-container-login">
    <AudioPandaComponent {...args} />
  </div>
);

export const Primary = Template.bind({});
