import Content from 'components/Content/Content';
import GoogleButton from 'components/LoginButtons/GoogleButton/GoogleButton';
import FacebookButton from 'components/LoginButtons/FacebookButton/FacebookButton';
import { UserStore } from 'utils/store/userStore';
import { OAuthLoginArgumentInterface } from 'utils/interfaces';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  userStore: UserStore;
}

@inject('userStore')
@observer
class LoginPage extends React.Component<Props> {
  userStore = this.props.userStore;

  render() {
    return (
      <>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Content>
          <h2>Login</h2>
          {!this.userStore.isLoggedIn ? (
            <>
              <FacebookButton onSuccess={this.login} />
              <br />
              <GoogleButton onSuccess={this.login} />
            </>
          ) : (
            <button onClick={this.logout}>Logout</button>
          )}
        </Content>
      </>
    );
  }

  logout = () => {
    this.userStore.signOut();
  };

  login = async ({
    provider,
    response,
  }: OAuthLoginArgumentInterface): Promise<void> => {
    const { location } = this.props;

    await this.userStore.signIn(provider, response.accessToken);

    const redirectTo = (location.state && location.state.from.pathname) || '/';
    this.props.history.push(redirectTo);
  };
}

export default LoginPage;
