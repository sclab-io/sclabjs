import { Sclab } from '../src';

type ErrorWithMessage = {
  message: string;
};

describe('index', () => {
  afterEach(() => {
    Sclab.kill();
  });

  describe('init', () => {
    it('siteURL', () => {
      try {
        // @ts-ignore
        Sclab.init();
      } catch (e) {
        expect((e as ErrorWithMessage).message).toMatch('siteURL is required');
      }
    });

    it('check server running', () => {
      try {
        Sclab.init('http://sclab.io/');
      } catch (e) {
        expect(Sclab.siteURL).toMatch('http://sclab.io');
        expect((e as ErrorWithMessage).message).toMatch(
          'This library only available on client side.'
        );
      }
    });
  });

  describe('login', () => {
    it('not initialized', () => {
      try {
        Sclab.login('abc@sclab.io', '1234');
      } catch (e) {
        expect((e as ErrorWithMessage).message).toMatch('not initialized');
      }
    });

    it('client check', () => {
      try {
        Sclab.siteURL = 'http://sclab.io';
        Sclab.login('abc@sclab.io', '1234');
      } catch (e) {
        expect((e as ErrorWithMessage).message).toMatch(
          'This library only available on client side.'
        );
      }
    });
  });

  describe('loginWithToken', () => {
    it('not initialized', () => {
      try {
        Sclab.loginWithToken('loginToken');
      } catch (e) {
        expect((e as ErrorWithMessage).message).toMatch('not initialized');
      }
    });

    it('client check', () => {
      try {
        Sclab.siteURL = 'http://sclab.io';
        Sclab.loginWithToken('loginToken');
      } catch (e) {
        expect((e as ErrorWithMessage).message).toMatch(
          'This library only available on client side.'
        );
      }
    });
  });

  describe('loginWithToken', () => {
    it('not initialized', () => {
      try {
        Sclab.logout();
      } catch (e) {
        expect((e as ErrorWithMessage).message).toMatch('not initialized');
      }
    });

    it('client check', () => {
      try {
        Sclab.siteURL = 'http://sclab.io';
        Sclab.logout();
      } catch (e) {
        expect((e as ErrorWithMessage).message).toMatch(
          'This library only available on client side.'
        );
      }
    });
  });
});
