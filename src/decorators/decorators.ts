interface Constructor<T> {
  new (...args: any[]): T;
}
export type GenericClassDecorator<T> = (type: T) => void;

export const Injectable = (): GenericClassDecorator<Constructor<object>> => {
  console.log('decorator factory')
  return (constructor: Constructor<object>) => {
    console.log(
      '[Injectable]',
      constructor.name,
      Reflect.getMetadata('design:paramtypes', constructor)
    );
  };
};


// @Injectable()
export class CrudService {
  getData() {
    return "Some data from CrudService";
  }
}

@Injectable()
export class MovieService {
  constructor(private crudService: CrudService) {}

  getData() {
    return this.crudService.getData();
  }
}
