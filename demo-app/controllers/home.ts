import {Assets} from "../components/assets";
import {Inject, Action, Controller, RequestReflection, Before, Chain, BeforeEach, Param} from "typeix";
import {ViewController} from "./view";

/**
 * Controller example
 * @constructor
 * @function
 * @name HomeController
 *
 * @description
 * Define controller, assign action and inject your services.
 * Each request create new instance of controller, your Injected type is injected by top level injector if is not defined
 * as local instance as providers to this controllers
 */
@Controller({
  name: "home",
  providers: [] // type of local instances within new request since controller is instanciated on each request
})
export class HomeController extends ViewController {

  /**
   * @param {Assets} assetLoader
   * @description
   * Custom asset loader service
   */
  @Inject(Assets)
  assetLoader: Assets;
  /**
   * @param {RequestReflection} request
   * @description
   * Request reflection
   */
  @Inject(RequestReflection)
  request: RequestReflection;


  /**
   * @function
   * @name actionIndex
   *
   * @description
   * There is no naming convention of function names only what is required to define action is \@Action metadata
   *
   * @example
   * \@Action("index")
   *  iIgnoreNamingConvention(): string {
   *    return "Only important fact is a \@Action param";
   * }
   *
   */
  @Action("id")
  actionId(@Param("id") id: number, @Chain() data: string, @Param("name") name: string): string {
    return `Action id: ${id} name: ${name} <- ${data}`;
  }

  /**
   * @function
   * @name actionIndex
   *
   * @description
   * There is no naming convention of function names only what is required to define action is \@Action metadata
   *
   * @example
   * \@Action("index")
   *  iIgnoreNamingConvention(): string {
   *    return "Only important fact is a \@Action param";
   * }
   *
   */
  @Before("index")
  beforeIndex(@Chain() data: string): string {
    return "Before index home: <- " + data;
  }

}