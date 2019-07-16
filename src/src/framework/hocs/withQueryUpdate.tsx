import { compose, withPropsOnChange } from 'recompose'
import { withRouter, RouteComponentProps } from 'react-router'
import queryString from 'query-string'

export type WithQueryProps<T> = Pick<RouteComponentProps<T>, 'location' | 'match' | 'history'> & {
  location: { query: queryString.ParsedQuery }
}

const propsWithQuery = withPropsOnChange<WithQueryProps<any>, RouteComponentProps>(
  ['location', 'match'],
  ({ location, match, history }) => {
    return {
      location: {
        ...location,
        query: queryString.parse(location.search)
      },
      match,
      history
    }
  }
)

export default compose(
  withRouter,
  propsWithQuery
)
