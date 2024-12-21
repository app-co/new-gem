/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
export default class Mask {
  public cellPhone(value: string) {
    if (!value) return;

    let e = value.replace(/\D/g, '');

    e = value.replace(/^(\d{2})/, '($1) ');
    e = e.replace(/(.*)(\d{5})(\d{4})/, '$1 $2-$3');

    return e;
  }

  public date(value: string) {
    let e = null;

    if (value) {
      e = value.replace(/\D/g, '');
      value.replace(/(\d{2})(\d{2})/, '$1/$2');
    }

    return e;
  }

  public Bigdate(value: string) {
    let e = null;

    if (!value) return;

    e = value.replace(/\D/g, '');

    e = e.replace(/^(\d{2})(\d+)/, '$1/$2');

    e = e.replace(/^(.*)\/(\d{2})(\d+)/, '$1/$2/$3');

    return e;
  }

  formatCPFOrCNPJ(text: string) {
    if (!text) return;

    let value = text.replace(/(\D)/g, '');

    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      value = value.replace(/(\d{2})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1/$2');
      value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }

    return value;
  }

  money(e: string) {
    let value = null;

    if (e) {
      value = e.replace(/\D/g, '');

      value = value.replace(/(\d)(\d{2})$/, '$1,$2');

      value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

      value = `R$ ${value}`;
    }

    return value;
  }

  card(e: string) {
    let value = null;

    if (e) {
      value = e.replace(/\D/g, '');

      value = value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1.$2.$3.$4');

      value = `${value}`;
    }

    return value;
  }
}
