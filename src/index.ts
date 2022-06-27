// created by SungYong Jang
// created at 2022.06.27

// eslint-disable-next-line @typescript-eslint/no-implied-eval
const isBrowser = new Function(
  'try {return this===window;}catch(e){ return false;}'
);

type Callback = (result: boolean) => void;
type PostMessageData = { type: string; result: boolean };

export class Sclab {
  static EVENT_TYPE: { LOGIN_COMPLETE: string; INIT_COMPLETE: string } = {
    LOGIN_COMPLETE: 'SCLAB_API.EVENT_TYPE.LOGIN_COMPLETE',
    INIT_COMPLETE: 'SCLAB_API.EVENT_TYPE.INIT_COMPLETE',
  };

  static siteURL?: string;
  static apiToken?: string;
  static iframe?: HTMLIFrameElement;
  static loginCallback?: Callback;
  static initCallback?: Callback;

  static init(
    siteURL: string,
    apiToken?: string,
    callback?: Callback
  ): boolean {
    if (!siteURL) {
      throw new Error('siteURL is required');
    }

    if (siteURL.endsWith('/')) {
      siteURL = siteURL.substring(0, siteURL.length - 1);
    }

    Sclab.siteURL = siteURL;
    Sclab.initCallback = callback;

    if (isBrowser()) {
      // create iframe dom
      if (!Sclab.iframe) {
        const check: HTMLIFrameElement = document.getElementById(
          'sclabjsiframe'
        ) as HTMLIFrameElement;
        if (check === null) {
          window.addEventListener('message', event => {
            if (!event.data) {
              return;
            }

            try {
              const data: PostMessageData = event.data;
              switch (data.type) {
                case Sclab.EVENT_TYPE.LOGIN_COMPLETE: {
                  if (Sclab.loginCallback) {
                    Sclab.loginCallback(data.result);
                  }
                  break;
                }

                case Sclab.EVENT_TYPE.INIT_COMPLETE: {
                  if (Sclab.initCallback) {
                    Sclab.initCallback(data.result);
                  }
                  break;
                }
              }
            } catch (e) {
              console.error(e);
            }
          });

          Sclab.iframe = document.createElement('iframe');
          Sclab.iframe.setAttribute('id', 'sclabjsiframe');
          Sclab.iframe.setAttribute('width', '0');
          Sclab.iframe.setAttribute('height', '0');
          Sclab.iframe.setAttribute('frameborder', '0');
          document.body.appendChild(Sclab.iframe);
          Sclab.iframe.setAttribute('src', Sclab.siteURL + '/jslanding');
        } else {
          Sclab.iframe = check;
        }
      }
    } else {
      if (!apiToken) {
        throw new Error('apiToken is required');
      }
      Sclab.apiToken = apiToken;
    }

    return true;
  }

  static login(email: string, password: string, callback?: Callback): void {
    if (!Sclab.siteURL) {
      throw new Error('not initialized');
    }

    if (isBrowser()) {
      Sclab.loginCallback = callback;

      if (Sclab.iframe && Sclab.iframe.contentWindow) {
        Sclab.iframe.contentWindow.postMessage(
          { type: 'LOGIN_WITH_PASSWORD', email, password },
          Sclab.siteURL
        );
      }
    } else {
      throw new Error('This function only available on client side.');
    }
  }

  static loginWithToken(token: string, callback?: Callback): void {
    if (!Sclab.siteURL) {
      throw new Error('not initialized');
    }

    if (isBrowser()) {
      Sclab.loginCallback = callback;

      if (Sclab.iframe && Sclab.iframe.contentWindow) {
        Sclab.iframe.contentWindow.postMessage(
          { type: 'LOGIN_WITH_TOKEN', token },
          Sclab.siteURL
        );
      }
    } else {
      throw new Error('This function only available on client side.');
    }
  }

  static kill(): void {
    if (Sclab.iframe) {
      Sclab.iframe.remove();
    }

    Sclab.iframe = undefined;
    Sclab.siteURL = undefined;
    Sclab.apiToken = undefined;
    Sclab.loginCallback = undefined;
  }
}
