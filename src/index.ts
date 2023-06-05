import "reflect-metadata";
import { InjectorBase, MovieService } from "./decorators/decorators";


const injector = new InjectorBase()

const movie = injector.resolve<MovieService>(MovieService);
console.log(movie.getData())
