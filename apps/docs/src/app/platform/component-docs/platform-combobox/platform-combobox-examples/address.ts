import { Entity } from '@fundamental-ngx/platform';


export class Address implements Entity {


  constructor(public readonly uniqueName: string,
              public readonly name: string,
              public readonly lines: string,
              public readonly city: string,
              public readonly state: string,
              public readonly postalCode: string,
              public readonly phone: string,
              public readonly fax: string,
              public readonly email: string,
              public readonly url: string,
              public readonly country: string) {
  }


  getTypes(): any {
    return {
      uniqueName: String,
      name: String,
      lines: String,
      city: String,
      state: String,
      postalCode: String,
      phone: String,
      fax: String,
      email: String,
      country: String
    };
  }

  identity(): string {
    return this.uniqueName;
  }

  className(): string {
    return 'Address';
  }

  toString() {
    return `${this.uniqueName} - ${this.name}`;
  }
}