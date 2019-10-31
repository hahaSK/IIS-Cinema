import Axios from "axios";
import qs from "qs";
import {getCookie} from "../../System/Cookies";
// import {getCookie} from "./Cookies";
import InstantAction from "../Utils/InstantAction";
import localStorageProxy from "../Utils/localStorage";
import localStorage from "../Utils/localStorage";
import MasterDispatcher from "../Utils/MasterDispatcher";

/**
 * BackendRequest
 * @param configuration
 * @constructor
 */
export default function BackendRequest(configuration: Object) {

    // Initiate Backend request
    new BackendRequestProto({
        ...configuration,
        customHeaders: {
            "Authorization": "JWT " + localStorage.getItem("JWT"),
            ...configuration.customHeaders
        }
    });

}

class BackendRequestProto {

    /**
     * Method
     * Available methods: GET, POST, DELETE, PUT
     * @type {string}
     */
    method = "get";
    /**
     * Payload
     * @type {null|Object}
     */
    payload = {};
    /**
     * REST API endpoint
     * @type {string}
     */
    endpoint = "";

    /**
     *
     * @type {null|Object}
     */
    self = null;
    /**
     * Custom headers
     * @type {{}}
     */
    customHeaders = {};
    /**
     * Custom server if not default
     * default from .env
     * @type {null}
     */
    customServer = null;
    /**
     * Default Headers
     * @type {{"Access-Control-Allow-Origin": string, "X-Requested-With": string, Authorization: string}}
     */
    defaultHeaders = {
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "XMLHttpRequest",
    };

    /**
     * Constructor
     * @param configuration
     */
    constructor(configuration: Object) {

        // this.method = BackendRequestProto.method;
        // this.payload = BackendRequestProto.payload;
        // this.endpoint = BackendRequestProto.endpoint;
        // this.customServer = BackendRequestProto.customServer;
        // this.afterSuccess = BackendRequestProto.afterSuccess;
        // this.afterError = BackendRequestProto.afterError;
        // this.beforeRequest = BackendRequestProto.beforeRequest;
        // this.customHeaders = BackendRequestProto.customHeaders;
        // this.self = BackendRequestProto.self;

        Object.keys(configuration).forEach((keyProperty) => {
            this[keyProperty] = configuration[keyProperty];
        });

        this.execute();
    }

    /**
     * After Success
     * @param response
     */
    afterSuccess = (response) => {
    };

    /**
     * Before request
     */
    beforeRequest = () => {
    };

    /**
     * After error data
     * @param response
     */
    afterError = (response) => {

    };

    /**
     * On Success
     * @param response
     */
    onSuccess = (response) => {

        if (process.env.NODE_ENV === "development") {
            console.log(response);
        }

        MasterDispatcher.dispatch(response.data);

        /**
         * Response parent
         */
        if (this.self !== null) {
            this.self.setState({
                expectingResponse: false,
            });
        }

        // Do custom after success stuff
        this.afterSuccess(response);
    };

    /**
     * On Error default behaviour
     * @param error
     */
    onError = (error) => {

        if (process.env.NODE_ENV === "development") {
            console.log(error.response);
        }

        /**
         * Response parent
         */
        if (this.self !== null) {
            this.self.setState({
                expectingResponse: false,
                error: error.response
            });
        }

        /**
         * Default Behaviour
         */
        if (error.response !== undefined) {
            if (error.response.status === 401) {
                // Remove Authorization From
                localStorageProxy.removeItem("JWT");

                // Redirect URL
                InstantAction.redirect(process.env.REACT_APP_LOGIN_URL);

                // Reset Store
                InstantAction.resetStore();
            }
        }

        this.afterError(error.response);
    };

    /**
     *
     */
    prepareData = () => {

        let formData = null;

        console.log(this.payload);

        if (this.payload.file !== undefined) {
            /**
             * It's Dropzone upload
             */
            formData = new FormData();
            formData.append("data", this.payload);

            console.log(this.payload);

            Object.keys(this.payload).forEach(key => {

                if (key === "file") {
                    return;
                }

                formData.append(key, this.payload[key]);
            });

            formData.append("file", this.payload.file);
            this.customHeaders = {...this.customHeaders, "Content-Type": "multipart/form-data"};

        } else {
            /**
             * It's classic form
             */
            formData = qs.stringify({
                ...this.payload
            });
        }
        return formData;
    };

    /**
     * Execute
     */
    execute = () => {

        let self = this;

        this.beforeRequest();

        /**
         * Response parent
         */
        if (this.self !== null) {
            this.self.setState({
                expectingResponse: true,
            });
        }

        let csrftoken = getCookie("csrftoken");

        Axios({
            method: this.method,
            url: ((this.customServer === null) ? process.env.REACT_APP_BACKEND_SERVER : this.customServer) + this.endpoint,
            data: this.prepareData(),
            headers: {
                ...this.defaultHeaders,
                ...this.customHeaders,
                "X-CSRFToken": csrftoken,
            },
            xsrfCookieName: "csrftoken",
            xsrfHeaderName: "X-CSRFToken",
        }).then(function (response) {
                // Do on success
                self.onSuccess(response);
            }
        ).catch(function (error) {
            self.onError(error);
        });
    };

}
