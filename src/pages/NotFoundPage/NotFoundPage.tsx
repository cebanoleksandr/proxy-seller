import './NotFoundPage.scss';
import { Helmet } from 'react-helmet';

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <Helmet>
        <title>Error Page</title>
      </Helmet>

      Not Found 404
    </div>
  );
}
