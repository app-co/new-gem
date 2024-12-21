export type T = {
  title: string;
  description: string;
  tipo: 'success' | 'error' | 'alert'
};
export type GlobalErrorModalRef = {
  show: () => void;
  hide: () => void;
  item: (obj: T) => void;
};
