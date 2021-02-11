/**
 *
 * Asynchronously loads the component for TestContent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TestContent = lazyLoad(
  () => import('./index'),
  module => module.TestContent,
);
