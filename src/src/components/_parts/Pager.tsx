import React from 'react'
import ReactPaginate from 'react-paginate'
import * as styles from '../../styles/pager.scss'

interface Props {
  pageCount: number
  pageSelect: number
  handlePageClick(selectedItem: { selected: number }): void
}

class Pager extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
  }
  componentDidMount() {
    styles.use()
  }

  componentWillUnmount() {
    styles.unuse()
  }

  render() {
    const { pageCount, pageSelect } = this.props
    return (
      <ReactPaginate
        previousLabel={'前のページへ'}
        nextLabel={'次のページへ'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        forcePage={pageSelect}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        onPageChange={this.props.handlePageClick}
        containerClassName={'pagination'}
        // subContainerClassName={'pages pagination'}
        activeClassName={`active`}
      />
    )
  }
}

export default Pager
