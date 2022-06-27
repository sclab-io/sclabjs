// created by SungYong Jang
// created at 2022.06.27

// eslint-disable-next-line @typescript-eslint/no-implied-eval
const isBrowser = new Function(
  'try {return this===window;}catch(e){ return false;}'
);

type Callback = (result: boolean) => void;
type PostMessageData = { type: string; result: boolean };

export class Sclab {
  static EVENT_TYPE: { LOGIN_COMPLETE: string } = {
    LOGIN_COMPLETE: 'SCLAB_API.EVENT_TYPE.LOGIN_COMPLETE',
  };

  static siteURL?: string;
  static apiToken?: string;
  static iframe?: HTMLIFrameElement;
  static loginCallback?: Callback;

  static init(siteURL: string, apiToken?: string): boolean {
    if (!siteURL) {
      throw new Error('siteURL is required');
    }

    if (siteURL.endsWith('/')) {
      siteURL = siteURL.substring(0, siteURL.length - 1);
    }

    Sclab.siteURL = siteURL;

    if (isBrowser()) {
      // create iframe dom
      if (!Sclab.iframe) {
        const check: HTMLIFrameElement = document.getElementById(
          'sclabjsiframe'
        ) as HTMLIFrameElement;
        if (check === null) {
          Sclab.iframe = document.createElement('iframe');
          Sclab.iframe.setAttribute('id', 'sclabjsiframe');
          document.body.appendChild(Sclab.iframe);
          Sclab.iframe.setAttribute('src', Sclab.siteURL + '/jslanding');

          window.addEventListener('message', event => {
            if (!event.data) {
              return;
            }

            try {
              const data: PostMessageData = JSON.parse(event.data);
              switch (data.type) {
                default: {
                  console.error('undefined type');
                  break;
                }

                case Sclab.EVENT_TYPE.LOGIN_COMPLETE: {
                  if (Sclab.loginCallback) {
                    Sclab.loginCallback(data.result);
                  }
                  break;
                }
              }
            } catch (e) {
              console.error(e);
            }
          });
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
          `login,${email},${password}`,
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
          `loginWithToken,${token}`,
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
