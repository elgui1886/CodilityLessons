interface Constructor<T> {
  new(...args: any[]): T;
}
export type GenericClassDecorator<T> = (type: T) => void;

export type Type<T> = new(...args: any[]) => T

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


export class InjectorBase {
  resolve<T>(class_to_init: Type<T>) {
    const deps =  Reflect.getMetadata('design:paramtypes', class_to_init) || [];
    const injector = deps.map((dep: Type<T>) => {
      return this.resolve(dep);
    });
    return new class_to_init(...injector);
  }    
}


// @Injectable()
export class CrudService {
  getData() {
    return "Some data from CrudService";
  }
}

@Injectable()
export class MovieService {
  constructor(private crudService: CrudService) { }

  getData() {
    return this.crudService.getData();
  }
}
