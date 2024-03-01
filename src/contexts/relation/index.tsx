import { useContext } from 'react';

import { RelationContexProvider } from './context';

export function useRelation() {
  const context = useContext(RelationContexProvider);

  return context;
}
