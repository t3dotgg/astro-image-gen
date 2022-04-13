import chromium from "chrome-aws-lambda";
import * as puppeteer from "puppeteer-core";

export async function get() {
  // Start the browser with the AWS Lambda wrapper (chrome-aws-lambda)

  const browser = await puppeteer.launch(
    process.env.AWS_EXECUTION_ENV
      ? {
          args: chromium.args,
          executablePath: await chromium.executablePath,
          headless: chromium.headless,
        }
      : {
          args: [],
          executablePath:
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        }
  );
  // Create a page with the Open Graph image size best practise
  const page = await browser.newPage();

  await page.setViewport({
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
  });
  // Generate the full URL out of the given path (GET parameter)
  await page.goto("https://google.com", {
    timeout: 15 * 1000,
  });

  // Generate image
  const data = await page.screenshot({
    type: "png",
  });
  await browser.close();

  if (!data || typeof data === "string") {
    return null;
  }

  return new Response(data, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
    },
  });
}
