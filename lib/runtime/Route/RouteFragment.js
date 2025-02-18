import { URIDecodeObject } from './utils.js'

export class RouteFragment {
    /**
     * @param {Route} route the route this fragment belongs to
     * @param {RNodeRuntime} node the node that corresponds to the fragment
     * @param {String} urlFragment a fragment of the url (fragments = url.split('/'))
     * @param {Object<string, any>} params
     */
    constructor(route, node, urlFragment, params) {
        this.route = route
        this.node = node
        /** @type {Partial<RoutifyLoadReturn>} */
        this.load = undefined
        this.urlFragment = urlFragment
        this.params = params

        Object.defineProperty(this, 'route', { enumerable: false })
    }

    /**
     * @private
     * @type {Object.<string, string|string[]>}
     **/
    _params = {}

    get params() {
        return URIDecodeObject(this._params)
    }

    set params(params) {
        this._params = params
    }
}
