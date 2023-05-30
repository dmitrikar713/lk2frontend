import React, { FC, ReactNode } from 'react';

import styles from './Events.module.scss';

export interface EventsProps {
  profileCard: ReactNode;
}

const Events: FC<EventsProps> = ({ profileCard }) => (
  <div className={styles.EventsWrapper}>{profileCard}</div>
);

export default Events;
