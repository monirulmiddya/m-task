class Resp {
  /**
   * Object containing HTTP status codes, their corresponding numerical values, and messages.
   *
   * @typedef {Object} StatusCodes
   * @property {number} CONTINUE - The server has received the request headers and the client should proceed to send the request body (if any). Message: Continue.
   * @property {number} SWITCHING_PROTOCOLS - The requester has asked the server to switch protocols and the server has agreed to do so. Message: Switching Protocols.
   * @property {number} OK - Standard response for successful HTTP requests. Message: OK.
   * @property {number} CREATED - The request has been fulfilled, resulting in the creation of a new resource. Message: Created.
   * @property {number} NO_CONTENT - The server successfully processed the request and is not returning any content. Message: No Content.
   * @property {number} MOVED_PERMANENTLY - This and all future requests should be directed to the given URI. Message: Moved Permanently.
   * @property {number} FOUND - The requested resource resides temporarily under a different URI. Message: Found.
   * @property {number} NOT_MODIFIED - Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match. Message: Not Modified.
   * @property {number} BAD_REQUEST - The server cannot or will not process the request due to an apparent client error. Message: Bad Request.
   * @property {number} UNAUTHORIZED - Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. Message: Unauthorized.
   * @property {number} NOT_FOUND - The server cannot find the requested resource. Message: Not Found.
   * @property {number} INTERNAL_SERVER_ERROR - A generic error message, given when an unexpected condition was encountered and no more specific message is suitable. Message: Internal Server Error.
   * @property {number} BAD_GATEWAY - The server was acting as a gateway or proxy and received an invalid response from the upstream server. Message: Bad Gateway.
   * @property {number} SERVICE_UNAVAILABLE - The server is currently unavailable (overloaded or down). Message: Service Unavailable.
   */
  statusCodes = {
    CONTINUE: { code: 100, message: "Continue" },
    SWITCHING_PROTOCOLS: { code: 101, message: "Switching Protocols" },
    PROCESSING: { code: 102, message: "Processing" },
    EARLY_HINTS: { code: 103, message: "Early Hints" },
    OK: { code: 200, message: "OK" },
    CREATED: { code: 201, message: "Created" },
    ACCEPTED: { code: 202, message: "Accepted" },
    NON_AUTHORITATIVE_INFORMATION: {
      code: 203,
      message: "Non-Authoritative Information",
    },
    NO_CONTENT: { code: 204, message: "No Content" },
    RESET_CONTENT: { code: 205, message: "Reset Content" },
    PARTIAL_CONTENT: { code: 206, message: "Partial Content" },
    MULTI_STATUS: { code: 207, message: "Multi-Status" },
    ALREADY_REPORTED: { code: 208, message: "Already Reported" },
    IM_USED: { code: 226, message: "IM Used" },
    MULTIPLE_CHOICES: { code: 300, message: "Multiple Choices" },
    MOVED_PERMANENTLY: { code: 301, message: "Moved Permanently" },
    FOUND: { code: 302, message: "Found" },
    SEE_OTHER: { code: 303, message: "See Other" },
    NOT_MODIFIED: { code: 304, message: "Not Modified" },
    USE_PROXY: { code: 305, message: "Use Proxy" },
    TEMPORARY_REDIRECT: { code: 307, message: "Temporary Redirect" },
    PERMANENT_REDIRECT: { code: 308, message: "Permanent Redirect" },
    BAD_REQUEST: { code: 400, message: "Bad Request" },
    UNAUTHORIZED: { code: 401, message: "Unauthorized" },
    PAYMENT_REQUIRED: { code: 402, message: "Payment Required" },
    FORBIDDEN: { code: 403, message: "Forbidden" },
    NOT_FOUND: { code: 404, message: "Not Found" },
    METHOD_NOT_ALLOWED: { code: 405, message: "Method Not Allowed" },
    NOT_ACCEPTABLE: { code: 406, message: "Not Acceptable" },
    PROXY_AUTHENTICATION_REQUIRED: {
      code: 407,
      message: "Proxy Authentication Required",
    },
    REQUEST_TIMEOUT: { code: 408, message: "Request Timeout" },
    CONFLICT: { code: 409, message: "Conflict" },
    GONE: { code: 410, message: "Gone" },
    LENGTH_REQUIRED: { code: 411, message: "Length Required" },
    PRECONDITION_FAILED: { code: 412, message: "Precondition Failed" },
    PAYLOAD_TOO_LARGE: { code: 413, message: "Payload Too Large" },
    URI_TOO_LONG: { code: 414, message: "URI Too Long" },
    UNSUPPORTED_MEDIA_TYPE: { code: 415, message: "Unsupported Media Type" },
    RANGE_NOT_SATISFIABLE: { code: 416, message: "Range Not Satisfiable" },
    EXPECTATION_FAILED: { code: 417, message: "Expectation Failed" },
    IM_A_TEAPOT: { code: 418, message: "I'm a teapot" },
    MISDIRECTED_REQUEST: { code: 421, message: "Misdirected Request" },
    UNPROCESSABLE_ENTITY: { code: 422, message: "Unprocessable Entity" },
    LOCKED: { code: 423, message: "Locked" },
    FAILED_DEPENDENCY: { code: 424, message: "Failed Dependency" },
    TOO_EARLY: { code: 425, message: "Too Early" },
    UPGRADE_REQUIRED: { code: 426, message: "Upgrade Required" },
    PRECONDITION_REQUIRED: { code: 428, message: "Precondition Required" },
    TOO_MANY_REQUESTS: { code: 429, message: "Too Many Requests" },
    REQUEST_HEADER_FIELDS_TOO_LARGE: {
      code: 431,
      message: "Request Header Fields Too Large",
    },
    UNAVAILABLE_FOR_LEGAL_REASONS: {
      code: 451,
      message: "Unavailable For Legal Reasons",
    },
    INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
    NOT_IMPLEMENTED: { code: 501, message: "Not Implemented" },
    BAD_GATEWAY: { code: 502, message: "Bad Gateway" },
    SERVICE_UNAVAILABLE: { code: 503, message: "Service Unavailable" },
    GATEWAY_TIMEOUT: { code: 504, message: "Gateway Timeout" },
    HTTP_VERSION_NOT_SUPPORTED: {
      code: 505,
      message: "HTTP Version Not Supported",
    },
    VARIANT_ALSO_NEGOTIATES: { code: 506, message: "Variant Also Negotiates" },
    INSUFFICIENT_STORAGE: { code: 507, message: "Insufficient Storage" },
    LOOP_DETECTED: { code: 508, message: "Loop Detected" },
    NOT_EXTENDED: { code: 510, message: "Not Extended" },
    NETWORK_AUTHENTICATION_REQUIRED: {
      code: 511,
      message: "Network Authentication Required",
    },
  };

  constructor(res) {
    this.res = res;
    // default HTTP status code
    this.statusCode = this.statusCodes.OK.code;
  }

  /**
   * A proxy object to retrieve status codes.
   *
   * @typedef {Object} StatusCodesProxy
   * @property {Function} get - A function to retrieve the status code for a given property.
   */

  /**
   * Proxy object to retrieve status codes based on property names.
   *
   * @type {StatusCodesProxy}
   */
  __getCode = new Proxy(
    {},
    /**
     * Proxy handler to retrieve status codes.
     *
     * @type {Object}
     * @property {Function} get - A function to retrieve the status code for a given property.
     */
    {
      /**
       * Retrieves the status code for a given property.
       *
       * @param {Object} _ - The target object (ignored).
       * @param {string} prop - The property name.
       * @returns {number|undefined} The status code if found, otherwise undefined.
       */
      get: (_, prop) => {
        return this.statusCodes[prop]?.code;
      },
    }
  );

  __getMessage = new Proxy(
    {},
    /**
     * Proxy handler to retrieve status codes.
     *
     * @type {Object}
     * @property {Function} get - A function to retrieve the status code for a given property.
     */
    {
      /**
       * Retrieves the status code for a given property.
       *
       * @param {Object} _ - The target object (ignored).
       * @param {string} prop - The property name.
       * @returns {number|undefined} The status code if found, otherwise undefined.
       */
      get: (_, prop) => {
        return this.statusCodes[prop]?.message;
      },
    }
  );

  /**
   * Sets the HTTP status code.
   *
   * @param {number} statusCode - The HTTP status code to set.
   * @returns {Object} This object instance for method chaining.
   */
  status(statusCode) {
    this.statusCode = statusCode;
    return this;
  }

  /**
   * Sends a JSON response with the provided status code, message, data, and errors.
   *
   * @param {number} status_code - The status code set to json.
   * @param {string} message - The message to include in the response.
   * @param {any} [data=null] - Optional. The data to include in the response.
   * @param {any} [errors=null] - Optional. Any errors to include in the response.
   * @returns {Object} The Express response object.
   */
  json(status_code, message, data = null, errors = null) {
    return this.res.status(this.statusCode).json({
      status_code,
      message: message,
      data: data,
      errors: errors,
    });
  }

  /**
   * Sends a JSON response with the provided , message, data, and errors.
   *
   * @param {string} message - The message to include in the response.
   * @param {any} [data=null] - Optional. The data to include in the response.
   * @param {any} [errors=null] - Optional. Any errors to include in the response.
   * @returns {Object} The Express response object.
   */
  create(message, data = null, errors = null) {
    return this.res.status(this.statusCode).json({
      status_code: this.statusCode,
      message: message,
      data: data,
      errors: errors,
    });
  }

  /**
   * Sends a JSON response with the provided data, message, and errors.
   *
   * @param {any} [data=null] - Optional. The data to include in the response.
   * @param {string} message - The message to include in the response.
   * @param {any} [errors=null] - Optional. Any errors to include in the response.
   * @returns {Object} The Express response object.
   */
  Success(
    data = null,
    message = "Resources created successfully",
    errors = null
  ) {
    this.statusCode = this.statusCodes.CREATED.code;
    return this.create(message, data, errors);
  }

  /**
   * Sends a JSON response with the provided data, message, and errors.
   *
   * @param {any} [data=null] - Optional. The data to include in the response.
   * @param {string} message - The message to include in the response.
   * @param {any} [errors=null] - Optional. Any errors to include in the response.
   * @returns {Object} The Express response object.
   */
  NotFound(message = "Resources not found", errors = null) {
    this.statusCode = this.statusCodes.NOT_FOUND.code;
    return this.create(message, null, errors);
  }

  /**
   * Sends a JSON response with the provided data, message, and errors.
   *
   * @param {any} [data=null] - Optional. The data to include in the response.
   * @param {string} message - The message to include in the response.
   * @param {any} [errors=null] - Optional. Any errors to include in the response.
   * @returns {Object} The Express response object.
   */
  Forbidden(message = "Forbidden given resources", errors = null) {
    this.statusCode = this.statusCodes.FORBIDDEN.code;
    return this.create(message, null, errors);
  }

  Failed(message = "This Request operation failed", errors = null) {
    this.statusCode = this.statusCodes.PRECONDITION_FAILED.code;
    return this.create(message, null, errors);
  }

  /**
   * Sends a JSON response with the provided data, message, and errors.
   *
   * @param {any} [data=null] - Optional. The data to include in the response.
   * @param {string} message - The message to include in the response.
   * @param {any} [errors=null] - Optional. Any errors to include in the response.
   * @returns {Object} The Express response object.
   */
  Error(message = this.__getMessage.INTERNAL_SERVER_ERROR, errors = null) {
    this.statusCode = this.statusCodes.INTERNAL_SERVER_ERROR.code;
    return this.create(message, null, errors);
  }

  /**
   * Sends a JSON response with the provided data, message, and errors.
   *
   * @param {any} [data=null] - Optional. The data to include in the response.
   * @param {string} message - The message to include in the response.
   * @param {any} [errors=null] - Optional. Any errors to include in the response.
   * @returns {Object} The Express response object.
   */
  Unauthorized(message = "Authorization required", errors = null) {
    this.statusCode = this.statusCodes.UNAUTHORIZED.code;
    return this.create(message, null, errors);
  }

  error(message = this.__getMessage.INTERNAL_SERVER_ERROR, data = null) {
    let _errCode = this.__getCode.INTERNAL_SERVER_ERROR;
    return this.res.status(_errCode).json({
      status_code: _errCode,
      message: message,
      data: data,
      errors: null,
    });
  }
}

module.exports = function (req, res, next) {
  // Extend the response object with Resp
  res.Resp = new Resp(res);

  next();
};
