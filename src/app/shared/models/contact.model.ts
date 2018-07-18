export class Contact {
  public id: number = Math.floor(Math.random() * 100001);
  public name: {
    first: string,
    last: string
  };
  public phone: string[];

  constructor(first_name: string, last_name: string, phones: string[]) {
    this.name = {
      first: first_name,
      last: last_name
    };
    this.phone = phones;
  }
}
