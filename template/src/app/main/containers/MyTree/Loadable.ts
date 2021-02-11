/**
 *
 * Asynchronously loads the component for MyTree
 *
 */

import { lazyLoad } from 'utils/loadable';

export const MyTree = lazyLoad(
  () => import('./index'),
  module => module.MyTree,
);
