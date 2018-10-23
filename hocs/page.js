import { compose } from 'redux';
import WithAuth from './withAuth';
import WithLayout from './withLayout';
import WithAnalytics from './withAnalytics';
import WithLocale from './withI18Next';

export const pageWithoutLayout = compose(
  WithLocale,
  WithAnalytics,
  WithAuth,
);

export default compose(
  pageWithoutLayout,
  WithLayout,
);
