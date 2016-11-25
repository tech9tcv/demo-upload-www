import { DemoUploadHtmlPage } from './app.po';

describe('demo-upload-html App', function() {
  let page: DemoUploadHtmlPage;

  beforeEach(() => {
    page = new DemoUploadHtmlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
