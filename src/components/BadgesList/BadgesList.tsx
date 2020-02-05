import { BadgeInterface } from 'utils/interfaces';
import {
  Badge,
  BadgeIcon,
  BadgeList,
  BadgeListItem,
} from 'components/BadgesList/BadgeList.style';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import { useTranslation } from 'react-i18next';
import React from 'react';

export interface Props {
  badges: Array<BadgeInterface>;
}

const BadgesList = ({ badges }: Props) => {
  const { t, ready } = useTranslation('profile-page');

  const userHaveBadges = badges.length;

  return userHaveBadges && ready ? (
    <>
      <h3>{t('badges.header', 'Badges')}:</h3>
      <BadgeList>
        {badges.map(badge => (
          <BadgeListItem key={badge.id}>
            <Tooltip
              overlay={badge.description}
              placement="top"
              trigger="click"
            >
              <Badge title={badge.description}>
                <BadgeIcon
                  src={`/images/badge-icon-placeholder.svg`}
                  alt={badge.description}
                />
              </Badge>
            </Tooltip>
          </BadgeListItem>
        ))}
      </BadgeList>
    </>
  ) : null;
};

export default BadgesList;
