import { SiteStore } from 'utils/store/siteStore';
import { Logo, Image, LogoProps } from 'components/MuseumLogo/MuseumLogo.style';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends LogoProps, WithTranslation {}

interface InjectedProps extends Props {
  siteStore: SiteStore;
}

@inject('siteStore')
@observer
class MuseumLogo extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps;
  }

  siteStore = this.injected.siteStore;

  render() {
    const shouldUsePlaceholder = this.siteStore.logo.length === 0;

    const avatarImageSrc = shouldUsePlaceholder
      ? '/images/museum-logo-placeholder.svg'
      : this.siteStore.logo;

    return this.props.tReady && this.siteStore.isDataAvailable() ? (
      <Logo type={this.props.type} usePlaceholder={shouldUsePlaceholder}>
        <Image
          src={avatarImageSrc}
          alt={this.props.t('image.museumLogotype.alt', 'Museum logotype')}
        />
      </Logo>
    ) : null;
  }
}

export default withTranslation('app')(MuseumLogo);
