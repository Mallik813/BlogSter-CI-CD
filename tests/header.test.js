const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:3000');
})


afterEach(async () => {
  await page.close();
})


test("Header text test", async () => {
  // const text = await page.$eval('a.brand-logo', el => el.innerHTML);
  const text = await page.getContentsOf('a.brand-logo');
  expect(text).toEqual('Blogster');
})


test("OAuth test", async () => {
  await page.click('.right a');
  const url = await page.url();
  expect(url).toMatch('/accounts\.google\.com/');
})


test("Shows Logout button when signed in", async () => {

  await page.login();

  const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

  expect(text).toEqual('Logout');
})
