import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import AreaRoutesPageStore from 'utils/store/areaRoutesPageStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps<any> {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class AreaRoutesPage extends React.Component<Props> {
  areaRoutesPageStore = new AreaRoutesPageStore(true);

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    this.areaRoutesPageStore.setTReady(this.props.tReady);

    await this.areaRoutesPageStore.loadData(Number.parseInt(id));
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.areaRoutesPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.areaRoutesPageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Routes')}</title>
        </Helmet>
        <Content>
          <h1>{this.props.t('content.title', 'Routes list')}</h1>
          {this.areaRoutesPageStore.languagesData.map(language => {
            const routes = this.areaRoutesPageStore.routesByLanguage(
              language.id,
            );

            return routes.length ? (
              <div key={language.id}>
                <h2>{language.value}</h2>
                {routes.map(route => {
                  const locations = this.areaRoutesPageStore.locationsByRoute(
                    route.id,
                  );

                  const attractions = this.areaRoutesPageStore.attractionsByRoute(
                    route.id,
                  );

                  return (
                    <p key={route.id}>
                      <Link to={`/route/${route.id}/map`}>
                        {route.name_full}
                      </Link>
                      <br />
                      {this.props.t(
                        'routeLocations',
                        'Locations: {{locations}}',
                        { locations: locations },
                      )}
                      <br />
                      {this.props.t(
                        'routeAttractions',
                        'Attractions: {{attractions}}',
                        { attractions: attractions },
                      )}
                    </p>
                  );
                })}
              </div>
            ) : null;
          })}
        </Content>
      </>
    );
  }
}

export default withTranslation('area-routes-page')(AreaRoutesPage);
