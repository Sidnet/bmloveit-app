import Content from 'components/Content/Content';
import ItemPageStore from 'utils/store/itemPageStore';
import { ItemDetails } from 'components/ItemDetails/ItemDetails';
import ReactModalStore from 'utils/store/reactModalStore';
import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import queryString from 'query-string';

export interface Props
  extends WithTranslation,
    RouteComponentProps<{ id: string }> {}

@observer
class ItemPage extends React.Component<Props> {
  itemPageStore = new ItemPageStore(true);
  modalStore: ReactModalStore;

  constructor(props: Props) {
    super(props);

    const { popup } = queryString.parse(this.props.location.search);

    this.modalStore = new ReactModalStore({
      isOpen:
        typeof popup !== 'undefined' && popup !== null && popup.length > 0,
    });
  }

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    this.itemPageStore.setTReady(this.props.tReady);

    await this.itemPageStore.loadData(Number.parseInt(id));
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.itemPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.itemPageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Item')}</title>
        </Helmet>
        <Content>
          <ItemDetails itemPageStore={this.itemPageStore} />
        </Content>
        <ReactModal {...this.modalStore.props}>
          {this.modalStore.content}
        </ReactModal>
      </>
    );
  }
}

export default withTranslation('item-page')(ItemPage);
