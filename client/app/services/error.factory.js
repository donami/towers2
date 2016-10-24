let ErrorFactory = function($rootScope) {
  'ngInject';

  let errors = [];

  let addErrorMessage = (message) => {
    errors.push(message);
  };

  let getErrorMessages = () => {
    let response = errors;
    errors = [];
    return response;
  };

  return { addErrorMessage };
};

export default ErrorFactory;
