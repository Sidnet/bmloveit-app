import Header from 'components/Header/Header';
import CookieBar from 'components/CookieBar/CookieBar';
import { SiteStore } from 'utils/store/siteStore';
import { GlobalStyle, LayoutGrid } from 'components/Layout/Layout.style';
import MainMenu from 'components/MainMenu/MainMenu';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { observer, inject } from 'mobx-react';

interface Props {
  children?: React.ReactNode;
  displayHeader?: boolean;
}

interface InjectedProps extends Props {
  siteStore: SiteStore;
}

@inject('siteStore')
@observer
export default class Layout extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps;
  }

  siteStore = this.injected.siteStore;

  render() {
    const { displayHeader, children } = this.props;

    return (
      <ThemeProvider theme={this.siteStore.theme}>
        <GlobalStyle />
        <LayoutGrid>
          <CookieBar />
          <MainMenu />
          <Header isVisible={displayHeader} />
          {children}
        </LayoutGrid>
      </ThemeProvider>
    );
  }
}
