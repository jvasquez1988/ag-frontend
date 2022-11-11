
export default class ServiceHelper {


  static getErrorMessageFromGraphql(error) {
    const { graphQLErrors, message: alternativeError } = error || {};
    const { firstError } = graphQLErrors || {};
    const { message } = firstError || {};
    return message || alternativeError;
  }
}