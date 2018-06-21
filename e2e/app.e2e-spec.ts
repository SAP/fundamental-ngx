import { NgxFundamentalPage } from './app.po';

describe('ngx-fundamental App', () => {
  let page: NgxFundamentalPage;

  beforeEach(() => {
    page = new NgxFundamentalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
