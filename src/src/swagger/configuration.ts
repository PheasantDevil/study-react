export interface ConfigurationParameters {
  apiKeys?: {[ key: string ]: string};
  username?: string;
  password?: string;
  accessToken?: string | (() => string);
  basePath?: string;
  withCredentials?: boolean;
}

const jsonMime: RegExp = /^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$/i

export class Configuration {
  apiKeys?: {[ key: string ]: string};
  username?: string;
  password?: string;
  accessToken?: string | (() => string);
  basePath?: string;
  withCredentials?: boolean;

  constructor(configurationParameters: ConfigurationParameters = {}) {
    this.apiKeys = configurationParameters.apiKeys;
    this.username = configurationParameters.username;
    this.password = configurationParameters.password;
    this.accessToken = configurationParameters.accessToken;
    this.basePath = configurationParameters.basePath;
    this.withCredentials = configurationParameters.withCredentials;
  }

  /**
   * Select the correct content-type to use for a request.
   * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
   * If no content type is found return the first found type if the contentTypes is not empty
   * @param contentTypes - the array of content types that are available for selection
   * @returns the selected content-type or <code>undefined</code> if no selection could be made.
   */
  public selectHeaderContentType (contentTypes: string[]): string {
    if (contentTypes.length === 0) {
      return '';
    }
    const type = contentTypes.find(x => this.isJsonMime(x));
    return type ? type : contentTypes[0];
  }

  /**
   * Select the correct accept content-type to use for a request.
   * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
   * If no content type is found return the first found type if the contentTypes is not empty
   * @param accepts - the array of content types that are available for selection.
   * @returns the selected content-type or <code>undefined</code> if no selection could be made.
   */
  public selectHeaderAccept(accepts: string[]): string {
    if (accepts.length === 0) {
      return '';
    }
    const type = accepts.find(x => this.isJsonMime(x));
    return type ? type : accepts[0];
  }

  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  public isJsonMime(mime: string): boolean {
    return !!mime && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
  }
}
