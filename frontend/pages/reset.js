/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import Reset from '../components/Reset';

const ResetPage = props => (
  <div>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default ResetPage;
