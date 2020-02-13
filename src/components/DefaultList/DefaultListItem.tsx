import {
  DefaultListItemWrapper,
  DefaultListItemWrapperProps,
} from 'components/DefaultList/DefaultList.style';
import React from 'react';
import SVG from 'react-inlinesvg';

export interface DefaultListItemProps extends DefaultListItemWrapperProps {
  children?: React.ReactNode;
  customHeaderImageSrc?: string;
  onClick?: any;
}

export const DefaultListItem = ({
  children,
  customHeaderImageSrc,
  isDisabled,
  isMenuOpened,
  isHeader,
  ...rest
}: DefaultListItemProps) => {
  const imageSrc = isDisabled
    ? ''
    : isHeader
    ? isMenuOpened
      ? '/images/expand_less-24px.svg'
      : customHeaderImageSrc || '/images/expand_more-24px.svg'
    : '/images/chevron_right-24px.svg';

  return (
    <DefaultListItemWrapper
      isMenuOpened={isMenuOpened}
      isHeader={isHeader}
      {...rest}
    >
      {children}
      <SVG src={imageSrc} />
    </DefaultListItemWrapper>
  );
};
