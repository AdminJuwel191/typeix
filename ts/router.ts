import {Logger} from './logger';
import {HttpError} from './error';
import {isArray} from './core';
import {Route, Headers, Params} from './route';
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @class
 * @name Router
 * @constructor
 * @description
 * Router is a component for handling routing in system.
 * All routes should be added during bootstrap process
 * @example
 * import { bootstrap, Bootstrap, Router } from '../core';
 * import { Assets } from './components/assets';
 *
 * \@Bootstrap()
 * export class Application {
 *   constructor(assets: Assets, router: Router) {
 *       router.add()
 *   }
 * }
 * bootstrap(Application);
 */
export class Router {
	private routes:Route[] = [];

	constructor(private logger:Logger) {
	}

	/**
	 * @since 1.0.0
	 * @function
	 * @name Router#add
	 * @param {Array<Route>} rule
	 *
	 * @description
	 * Add route to routes list.
	 * All routes must be inherited from Route interface.
	 */
	add(rule:Array<Route>):void {
		this.logger.info('Router.add', rule);
		rule.forEach(rule => this.routes.push(rule));
	}

	/**
	 * @since 1.0.0

	 * @function
	 * @name Router#parseRequest
	 * @param {String} pathName
	 * @param {String} method
	 * @param {Headers} headers
	 *
	 * @description
	 * Parse request based on pathName and method
	 */
	async parseRequest(pathName:string, method:string, headers:Headers):Promise<Route> {
		for (let route of this.routes) {
			let result = await route.parseRequest(pathName, method, headers);
			if (!!result) {
				return result;
			}
		}
		throw new HttpError(404, `Router.parseRequest: ${pathName} no route found, method: ${method}`, {
			pathName,
			method
		});
	}

	/**
	 * @since 1.0.0

	 * @function
	 * @name Router#createUrl
	 * @param {String} routeName
	 * @param {Params} params
	 *
	 * @description
	 * Create url based on route and params
	 */
	async createUrl(routeName:string, params:Params):Promise<string> {
		for (let route of this.routes) {
			let result:string = await route.createUrl(routeName, params);
			if (!!result) {
				return Promise.resolve(result);
			}
		}
		if (params.size > 0) {
			routeName += '?';
			params.forEach((v, k) => {
				routeName += k + '=' + encodeURIComponent(v);
			});
		}
		return Promise.resolve('/' + routeName);
	}
}