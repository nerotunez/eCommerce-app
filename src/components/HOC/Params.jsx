import { useParams } from 'react-router'

const withParams = Component => {
  return props => <Component {...props} params={useParams()} />
}

export default withParams
