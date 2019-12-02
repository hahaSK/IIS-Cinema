import Axios from "axios";
import qs from "qs";
import {getCookie} from "../Utils/Cookies";
import InstantActions from "../Utils/InstantAction";
import {getTokenFromStorage} from "../Utils/JWT";
//import {setLoggingInProgress} from "../Aurora/Aurora.actions";

/**
 * AuroraRequest
 * @param method
 * @param actionURL
 * @param data
 * @param onSuccess
 * @param onActionError
 * @param onServerError
 */
export default function BackendRequest(method: string, actionURL: string, data: Object, onSuccess: Function = () => {
}, onActionError: Function = () => {
}, onServerError: Function = () => {
}) {
    /**
     * Api URL BASE
     * @type {string}
     */
    const ApiUrlBase = process.env.REACT_APP_BACKEND_SERVER;
    let formData = null;
    let contentType = null;
    // Assign Action Name
    data = {...data};

    // Assign Action Name
    if (data !== null) {
        if (data.file !== undefined) {
            /**
             * It's Dropzone upload
             */
            formData = new FormData();
            formData.append("data", data);
            formData.append("file", data.file);
            contentType = {"Content-Type": "multipart/form-data"};

        } else {
            /**
             * It's classic form
             */
            formData = qs.stringify({
                ...data
            });

        }
    }

    Axios.defaults.xsrfCookieName = "csrftoken"; // default
    Axios.defaults.xsrfHeaderName = "X-CSRFToken";
    let csrftoken = getCookie("csrftoken");

    Axios({
        method: method,
        url: ApiUrlBase + actionURL,
        data: formData,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "XMLHttpRequest",
            "Authorization": "JWT " + getTokenFromStorage(),
            "X-CSRFToken": csrftoken,
            ...contentType
        },
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFToken",
    })
        .then(function (response) {
                /**
                 * Logging DEVELOPMENT
                 */
                if (process.env.NODE_ENV === "development") {
                    console.log(response);
                }
                /**
                 * On Action Error
                 */
                if (response.data.error !== undefined) {
                    onActionError(response.data);
                }
                /**
                 * On Success Action
                 */
                else {
                    onSuccess(response);
                }
            }
        )
        .catch(function (error) {
            /**
             * Logging DEVELOPMENT
             */
            if (process.env.NODE_ENV === "development") {
                console.log(error);
            }
            /**
             * JWT Session Expired or damaged token
             */
            if (error.response !== undefined) {
                if (error.response.status === 401) {
                    /**
                     * Remove JWT
                     */

                    localStorage.removeItem("JWT");
                    /**
                     * Redirect to Landing Page / Login
                     */
                    console.log("401");
                    //InstantActions.redirect("/login");

                    InstantActions.resetStore();
                    // InstantActions.dispatch(setAppLoaded(true));
                    //InstantActions.dispatch(setLoggingInProgress(false));

                }

                if (error.response.status === 503) {
                    console.log("503");
                    //InstantActions.openPopupModule("service-error", error.response.data);
                }
            }

            if (error.response !== undefined) {
                console.log(error, error.response, error.response.data);

                onServerError(error.response);
            }
        });

}