import { KilometrowkaPage } from './app.po';

describe('kilometrowka App', () => {
  let page: KilometrowkaPage;

  beforeEach(() => {
    page = new KilometrowkaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
