import Content from 'components/Content/Content';
import ProfilePageStore from 'utils/store/profilePageStore';
import { LanguageSwitch } from 'components/LanguageSwitch/LanguageSwitch';
import { getPrivateMediaURL } from 'utils/helpers';
import { AuthStore } from 'utils/store/authStore';
import { UserProfileStore } from 'utils/store/userProfileStore';
import { UiStore } from 'utils/store/uiStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends WithTranslation, RouteComponentProps {
  uiStore: UiStore;
  authStore: AuthStore;
  userProfileStore: UserProfileStore;
}

@inject('uiStore', 'authStore', 'userProfileStore')
@observer
class ProfilePage extends React.Component<Props> {
  uiStore = this.props.uiStore;
  authStore = this.props.authStore;
  userProfileStore = this.props.userProfileStore;

  profilePageStore = new ProfilePageStore(this.props.i18n, true);

  async componentDidMount(): Promise<void> {
    this.profilePageStore.setTReady(this.props.tReady);

    await this.profilePageStore.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.profilePageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.profilePageStore.unmount();
  }

  logout = () => {
    this.authStore.signOut();
    this.props.history.push('/');
  };

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'User profile')}</title>
        </Helmet>
        <Content>
          <h1>{this.props.t('content.title', 'User Profile')}</h1>
          <p>{this.userProfileStore.userName}</p>
          {this.userProfileStore.userHasAvatar && (
            <img
              src={getPrivateMediaURL(this.userProfileStore.userAvatarURL)}
              alt={this.userProfileStore.userAvatarName}
            />
          )}
          <LanguageSwitch
            uiLanguages={this.uiStore.languages}
            userLanguage={this.uiStore.language}
            onSubmit={this.profilePageStore.handleSubmit}
          />
          <p>
            <button onClick={this.logout}>
              {this.props.t('button.logout.label', 'Logout')}
            </button>
          </p>
        </Content>
      </>
    );
  }
}

export default withTranslation('profile-page')(ProfilePage);
