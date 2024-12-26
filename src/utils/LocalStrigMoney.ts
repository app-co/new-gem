export function locale(valor: string) {
  if (!valor) return 'R$ 0,00'
  const total = Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return total;
}
