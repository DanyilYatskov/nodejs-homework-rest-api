class restApi extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends restApi {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends restApi {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends restApi {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class ServiceUnavalaibleError extends restApi {
  constructor(message) {
    super(message);
    this.status = 503;
  }
}

module.exports = {
  restApi,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  ServiceUnavalaibleError,
};
